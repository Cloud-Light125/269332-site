import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const SITE_ORIGIN = 'https://269332.xyz';
const SITEMAP_INDEX_PATH = path.resolve('dist/sitemap-index.xml');

function decodeXmlText(value) {
	return value
		.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
		.replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&apos;/g, "'")
		.replace(/&amp;/g, '&');
}

function extractLocValues(xml) {
	return [...xml.matchAll(/<loc(?:\s[^>]*)?>([\s\S]*?)<\/loc\s*>/gi)]
		.map((match) => decodeXmlText(match[1].trim()))
		.filter(Boolean);
}

async function readXml(filePath, expectedRoot) {
	let xml;
	try {
		xml = await readFile(filePath, 'utf8');
	} catch (error) {
		if (error?.code === 'ENOENT') {
			throw new Error(`Sitemap file not found: ${filePath}`);
		}
		throw new Error(`Unable to read sitemap XML ${filePath}: ${error.message}`);
	}

	if (!new RegExp(`<${expectedRoot}(?:\\s|>)`, 'i').test(xml)) {
		throw new Error(`Unexpected sitemap XML in ${filePath}: missing <${expectedRoot}>`);
	}

	return xml;
}

function getLocalSitemapPath(location, indexDirectory) {
	let url;
	try {
		url = new URL(location, `${SITE_ORIGIN}/`);
	} catch {
		throw new Error(`Invalid sitemap URL in sitemap index: ${location}`);
	}

	if (url.origin !== SITE_ORIGIN) {
		throw new Error(`Sitemap index references a different site: ${url.origin}`);
	}

	let fileName;
	try {
		fileName = path.posix.basename(decodeURIComponent(url.pathname));
	} catch {
		throw new Error(`Invalid sitemap URL encoding in sitemap index: ${location}`);
	}
	if (!/^sitemap-[\w.-]+\.xml$/i.test(fileName) || fileName === 'sitemap-index.xml') {
		throw new Error(`Unexpected sitemap file in sitemap index: ${location}`);
	}

	return path.join(indexDirectory, fileName);
}

function normalizePageUrl(location) {
	let url;
	try {
		url = new URL(location);
	} catch {
		return null;
	}

	if (url.origin !== SITE_ORIGIN || url.username || url.password) return null;
	if (/\/sitemap(?:-index|-[^/]+)?\.xml$/i.test(url.pathname)) return null;

	url.hash = '';
	return url.href;
}

export function selectPageUrls(locations) {
	const pageUrls = new Set();
	for (const location of locations) {
		const pageUrl = normalizePageUrl(location);
		if (pageUrl) pageUrls.add(pageUrl);
	}
	return [...pageUrls];
}

export async function collectSitemapUrls(indexPath = SITEMAP_INDEX_PATH) {
	const indexXml = await readXml(indexPath, 'sitemapindex');
	const sitemapLocations = [...new Set(extractLocValues(indexXml))];
	if (sitemapLocations.length === 0) {
		throw new Error(`No sitemap files found in ${indexPath}`);
	}

	const pageLocations = [];
	const indexDirectory = path.dirname(indexPath);
	for (const location of sitemapLocations) {
		const sitemapPath = getLocalSitemapPath(location, indexDirectory);
		const sitemapXml = await readXml(sitemapPath, 'urlset');
		pageLocations.push(...extractLocValues(sitemapXml));
	}
	const pageUrls = selectPageUrls(pageLocations);

	if (pageUrls.length === 0) {
		throw new Error('No valid page URLs found in sitemap files');
	}

	return pageUrls;
}

function sanitizeMessage(message, token) {
	if (!token) return String(message);
	return String(message)
		.split(token).join('[redacted]')
		.split(encodeURIComponent(token)).join('[redacted]');
}

async function submitUrls(urls, token) {
	let response;
	try {
		response = await fetch(
			`http://data.zz.baidu.com/urls?site=${SITE_ORIGIN}&token=${encodeURIComponent(token)}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'text/plain' },
				body: urls.join('\n'),
			},
		);
	} catch (error) {
		throw new Error(`Baidu API request failed: ${sanitizeMessage(error.message, token)}`);
	}

	if (!response.ok) {
		throw new Error(`Baidu API HTTP request failed with status ${response.status}`);
	}

	let result;
	try {
		result = await response.json();
	} catch {
		throw new Error('Baidu API returned an unexpected non-JSON response');
	}

	if (
		!result
		|| typeof result !== 'object'
		|| Array.isArray(result)
		|| typeof result.success !== 'number'
		|| typeof result.remain !== 'number'
	) {
		const apiError = typeof result?.message === 'string'
			? `: ${sanitizeMessage(result.message, token)}`
			: '';
		throw new Error(`Baidu API returned unexpected JSON${apiError}`);
	}

	const notSameSite = Array.isArray(result.not_same_site) ? result.not_same_site : [];
	const notValid = Array.isArray(result.not_valid) ? result.not_valid : [];

	console.log('Baidu push completed');
	console.log(`Submitted: ${result.success}`);
	console.log(`Remaining quota: ${result.remain}`);
	console.log(`success: ${result.success}`);
	console.log(`remain: ${result.remain}`);
	console.log(`not_same_site: ${notSameSite.length}`);
	console.log(`not_valid: ${notValid.length}`);

	if (notSameSite.length > 0) {
		console.warn(`Warning: Baidu rejected URLs from another site: ${notSameSite.join(', ')}`);
	}
	if (notValid.length > 0) {
		console.warn(`Warning: Baidu rejected invalid URLs: ${notValid.join(', ')}`);
	}

	return notSameSite.length === 0 && notValid.length === 0;
}

async function main() {
	const dryRun = process.argv.includes('--dry-run');
	const token = process.env.BAIDU_PUSH_TOKEN?.trim();

	if (!dryRun && !token) {
		console.warn('BAIDU_PUSH_TOKEN is not set; skipping Baidu URL submission.');
		return;
	}

	try {
		const urls = await collectSitemapUrls();
		if (dryRun) {
			console.log(`Baidu push dry run: ${urls.length} unique page URLs`);
			console.log(urls.join('\n'));
			return;
		}

		const accepted = await submitUrls(urls, token);
		if (!accepted) process.exitCode = 1;
	} catch (error) {
		console.error(`Baidu push failed: ${sanitizeMessage(error.message, token)}`);
		process.exitCode = 1;
	}
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
	await main();
}
