import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDirectory = resolve(fileURLToPath(new URL('..', import.meta.url)));
const catalogPath = resolve(rootDirectory, 'src/data/catalog.ts');
const detailsPath = resolve(rootDirectory, 'src/data/project-details.ts');
const [catalogSource, detailsSource] = await Promise.all([
	readFile(catalogPath, 'utf8'),
	readFile(detailsPath, 'utf8'),
]);

const errors = [];

const findMatching = (source, start, opening, closing) => {
	let depth = 0;
	let quote = null;
	let escaped = false;
	let lineComment = false;
	let blockComment = false;

	for (let index = start; index < source.length; index += 1) {
		const character = source[index];
		const nextCharacter = source[index + 1];

		if (lineComment) {
			if (character === '\n') lineComment = false;
			continue;
		}
		if (blockComment) {
			if (character === '*' && nextCharacter === '/') {
				blockComment = false;
				index += 1;
			}
			continue;
		}
		if (quote) {
			if (escaped) {
				escaped = false;
			} else if (character === '\\') {
				escaped = true;
			} else if (character === quote) {
				quote = null;
			}
			continue;
		}
		if (character === '/' && nextCharacter === '/') {
			lineComment = true;
			index += 1;
			continue;
		}
		if (character === '/' && nextCharacter === '*') {
			blockComment = true;
			index += 1;
			continue;
		}
		if (character === "'" || character === '"' || character === '`') {
			quote = character;
			continue;
		}
		if (character === opening) depth += 1;
		if (character === closing) {
			depth -= 1;
			if (depth === 0) return index;
		}
	}

	throw new Error(`Unclosed ${opening}${closing} pair near offset ${start}`);
};

const readArray = (source, marker) => {
	const markerIndex = source.indexOf(marker);
	if (markerIndex < 0) throw new Error(`Cannot find ${marker}`);
	const assignmentIndex = source.indexOf('=', markerIndex);
	const openingIndex = source.indexOf('[', assignmentIndex);
	if (openingIndex < 0) throw new Error(`Cannot find array for ${marker}`);
	const closingIndex = findMatching(source, openingIndex, '[', ']');
	return { body: source.slice(openingIndex + 1, closingIndex), start: openingIndex, end: closingIndex };
};

const readArrayProperty = (source, property) => {
	const propertyMatch = new RegExp(`\\b${property}\\s*:\\s*\\[`).exec(source);
	if (!propertyMatch) return null;
	const openingIndex = source.indexOf('[', propertyMatch.index);
	const closingIndex = findMatching(source, openingIndex, '[', ']');
	return { body: source.slice(openingIndex + 1, closingIndex), start: openingIndex, end: closingIndex };
};

const readAllArrayProperties = (source, property) => {
	const properties = [];
	const propertyPattern = new RegExp(`\\b${property}\\s*:\\s*\\[`, 'g');
	for (const match of source.matchAll(propertyPattern)) {
		const openingIndex = source.indexOf('[', match.index);
		const closingIndex = findMatching(source, openingIndex, '[', ']');
		properties.push({ body: source.slice(openingIndex + 1, closingIndex), start: openingIndex, end: closingIndex });
	}
	return properties;
};

const readObjectProperty = (source, property) => {
	const propertyMatch = new RegExp(`\\b${property}\\s*:\\s*\\{`).exec(source);
	if (!propertyMatch) return null;
	const openingIndex = source.indexOf('{', propertyMatch.index);
	const closingIndex = findMatching(source, openingIndex, '{', '}');
	return source.slice(openingIndex, closingIndex + 1);
};

const readStringProperty = (source, property) => {
	const match = new RegExp(`\\b${property}\\s*:\\s*(['"])(.*?)\\1`).exec(source);
	return match?.[2];
};

const readHref = (source) => readStringProperty(source, 'href');

const readTopLevelObjects = (source) => {
	const objects = [];
	let objectStart = -1;
	let depth = 0;
	let quote = null;
	let escaped = false;
	let lineComment = false;
	let blockComment = false;

	for (let index = 0; index < source.length; index += 1) {
		const character = source[index];
		const nextCharacter = source[index + 1];

		if (lineComment) {
			if (character === '\n') lineComment = false;
			continue;
		}
		if (blockComment) {
			if (character === '*' && nextCharacter === '/') {
				blockComment = false;
				index += 1;
			}
			continue;
		}
		if (quote) {
			if (escaped) {
				escaped = false;
			} else if (character === '\\') {
				escaped = true;
			} else if (character === quote) {
				quote = null;
			}
			continue;
		}
		if (character === '/' && nextCharacter === '/') {
			lineComment = true;
			index += 1;
			continue;
		}
		if (character === '/' && nextCharacter === '*') {
			blockComment = true;
			index += 1;
			continue;
		}
		if (character === "'" || character === '"' || character === '`') {
			quote = character;
			continue;
		}
		if (character === '{') {
			if (depth === 0) objectStart = index;
			depth += 1;
			continue;
		}
		if (character === '}') {
			depth -= 1;
			if (depth === 0 && objectStart >= 0) {
				objects.push(source.slice(objectStart, index + 1));
				objectStart = -1;
			}
		}
	}

	if (depth !== 0) throw new Error('Unclosed object in array');
	return objects;
};

const readStringLiterals = (source) => [...source.matchAll(/(['"])(.*?)\1/g)].map((match) => match[2]);

const parseCatalogItems = (name) => {
		const array = readArray(catalogSource, `export const ${name}: CatalogItem[] = [`);
		return readTopLevelObjects(array.body).map((source, index) => {
			const id = readStringProperty(source, 'id');
			if (!id) throw new Error(`${name}[${index}] has no id`);
			const categories = readArrayProperty(source, 'categories');
			const primaryAction = readObjectProperty(source, 'primaryAction');
			if (!categories || !primaryAction) throw new Error(`${name}.${id} is missing categories or primaryAction`);
			const screenshots = readArrayProperty(source, 'screenshots');
			return {
				id,
				kind: readStringProperty(source, 'kind'),
				categories: readStringLiterals(categories.body),
				detailsPath: readStringProperty(source, 'detailsPath'),
				primaryHref: readHref(primaryAction),
				screenshotCount: screenshots ? readTopLevelObjects(screenshots.body).length : /\bscreenshot\s*:/.test(source) ? 1 : 0,
				source,
			};
		});
};

const parseCatalogCategories = () => {
	const array = readArray(catalogSource, 'export const catalogCategories: CatalogCategory[] = [');
	return readTopLevelObjects(array.body).map((source, index) => {
		const id = readStringProperty(source, 'id');
		if (!id) throw new Error(`catalogCategories[${index}] has no id`);
		return id;
	});
};

const parseProjectDetails = () => {
	const array = readArray(detailsSource, 'export const projectDetails: ProjectDetail[] = [');
	return readTopLevelObjects(array.body).map((source, index) => {
		const slug = readStringProperty(source, 'slug');
		const itemMatch = /\bitem\s*:\s*getCatalogItem\s*\(\s*(['"])(.*?)\1\s*\)/.exec(source);
		const sections = readArrayProperty(source, 'sections');
		if (!slug || !itemMatch || !sections) throw new Error(`projectDetails[${index}] is missing slug, item, or sections`);

		const sectionObjects = readTopLevelObjects(sections.body).map((sectionSource, sectionIndex) => {
			const type = readStringProperty(sectionSource, 'type');
			const id = readStringProperty(sectionSource, 'id');
			if (!type || !id) throw new Error(`${slug} section ${sectionIndex} is missing type or id`);
			const indexes = readAllArrayProperties(sectionSource, 'indexes').flatMap((property) =>
				property.body.trim() === '' ? [] : property.body.split(',').map((value) => value.trim()),
			);
			return { type, id, indexes };
		});

		return { slug, itemId: itemMatch[2], sections: sectionObjects };
	});
};

const parseOrReport = (label, parser) => {
	try {
		return parser();
	} catch (error) {
		errors.push(`${label}: ${error instanceof Error ? error.message : String(error)}`);
		return [];
	}
};

const categoryIds = parseOrReport('catalog categories', parseCatalogCategories);
const projects = parseOrReport('projects', () => parseCatalogItems('projects'));
const gameTools = parseOrReport('gameTools', () => parseCatalogItems('gameTools'));
const projectDetails = parseOrReport('project details', parseProjectDetails);
const catalogItems = [...projects, ...gameTools];

const duplicates = (values) => {
	const seen = new Set();
	const repeated = new Set();
	for (const value of values) {
		if (seen.has(value)) repeated.add(value);
		seen.add(value);
	}
	return [...repeated];
};

const duplicateCatalogIds = duplicates(catalogItems.map((item) => item.id));
if (duplicateCatalogIds.length > 0) errors.push(`duplicate catalog ids: ${duplicateCatalogIds.join(', ')}`);

const duplicateCategoryIds = duplicates(categoryIds);
if (duplicateCategoryIds.length > 0) errors.push(`duplicate category ids: ${duplicateCategoryIds.join(', ')}`);

const invalidCategoryReferences = catalogItems.flatMap((item) =>
	item.categories.filter((categoryId) => !categoryIds.includes(categoryId)).map((categoryId) => `${item.id}:${categoryId}`),
);
if (invalidCategoryReferences.length > 0) errors.push(`invalid catalog categories: ${invalidCategoryReferences.join(', ')}`);

const itemsWithDetails = catalogItems.filter((item) => item.detailsPath);
const duplicateDetailsPaths = duplicates(itemsWithDetails.map((item) => item.detailsPath));
if (duplicateDetailsPaths.length > 0) errors.push(`duplicate detailsPath values: ${duplicateDetailsPaths.join(', ')}`);

const detailSlugs = projectDetails.map((detail) => detail.slug);
const duplicateDetailSlugs = duplicates(detailSlugs);
if (duplicateDetailSlugs.length > 0) errors.push(`duplicate project detail slugs: ${duplicateDetailSlugs.join(', ')}`);

const catalogById = new Map(catalogItems.map((item) => [item.id, item]));
const missingDetails = itemsWithDetails.filter((item) => !detailSlugs.includes(item.id)).map((item) => item.id);
if (missingDetails.length > 0) errors.push(`projects without ProjectDetail: ${missingDetails.join(', ')}`);

const orphanDetails = projectDetails.filter((detail) => !catalogById.has(detail.itemId)).map((detail) => `${detail.slug}:${detail.itemId}`);
if (orphanDetails.length > 0) errors.push(`ProjectDetail without catalog project: ${orphanDetails.join(', ')}`);

for (const detail of projectDetails) {
	const item = catalogById.get(detail.itemId);
	if (detail.itemId !== detail.slug) errors.push(`ProjectDetail item does not match slug: ${detail.slug} -> ${detail.itemId}`);
	if (item?.detailsPath !== `/projects/${detail.slug}/`) errors.push(`detailsPath does not match ProjectDetail: ${detail.slug}`);

	const sectionIds = detail.sections.map((section) => section.id);
	const duplicateSectionIds = duplicates(sectionIds);
	if (duplicateSectionIds.length > 0) errors.push(`duplicate section ids in ${detail.slug}: ${duplicateSectionIds.join(', ')}`);

	const screenshotCount = item?.screenshotCount ?? 0;
	for (const section of detail.sections.filter((entry) => entry.type === 'screenshots')) {
		if (section.indexes.length === 0) {
			errors.push(`screenshot section has no indexes: ${detail.slug}:${section.id}`);
			continue;
		}
		for (const rawIndex of section.indexes) {
			if (!/^-?\d+$/.test(rawIndex)) {
				errors.push(`invalid screenshot index in ${detail.slug}:${section.id}: ${rawIndex}`);
				continue;
			}
			const index = Number(rawIndex);
			if (index < 0 || index >= screenshotCount) errors.push(`screenshot index out of range in ${detail.slug}:${section.id}: ${index} (count ${screenshotCount})`);
		}
	}
}

const extractHrefs = (source) => [...source.matchAll(/\bhref\s*:\s*(['"])(.*?)\1/g)].map((match) => match[2]);
const hrefs = [...extractHrefs(catalogSource), ...extractHrefs(detailsSource)];
const forbiddenGithubOwner = /https?:\/\/(?:www\.)?github\.com\/yundan125(?:\/|$)/i;
for (const href of hrefs) {
	if (forbiddenGithubOwner.test(href)) errors.push(`disallowed GitHub owner yundan125: ${href}`);
}

const isGitHubUrl = (href) => {
	try {
		return new URL(href).hostname.toLowerCase() === 'github.com';
	} catch {
		return false;
	}
};
const isGitHubReleasesPage = (href) => {
	try {
		const url = new URL(href);
		return url.hostname.toLowerCase() === 'github.com' && /^\/[^/]+\/[^/]+\/releases\/?$/i.test(url.pathname);
	} catch {
		return false;
	}
};

for (const item of projects) {
	if (item.kind === 'desktop' && isGitHubUrl(item.primaryHref) && !isGitHubReleasesPage(item.primaryHref)) {
		errors.push(`desktop GitHub primaryAction must use /releases: ${item.id}`);
	}
}

const ownDownloadCta = /github\.com\/Cloud-Light125\/[^'"\s]+\/releases\/(?:latest|download\/|tag\/)/i;
for (const href of hrefs) {
	if (ownDownloadCta.test(href)) errors.push(`forbidden own download CTA URL: ${href}`);
}

if (errors.length > 0) {
	console.error('Site data validation failed:');
	for (const error of errors) console.error(`- ${error}`);
	process.exitCode = 1;
} else {
	console.log(`[validate] ok: ${catalogItems.length} catalog items, ${projects.length} projects, ${gameTools.length} game tools, ${projectDetails.length} details`);
}
