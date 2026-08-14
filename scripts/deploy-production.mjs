import { spawn } from 'node:child_process';

function executable(name) {
	return process.platform === 'win32' ? `${name}.cmd` : name;
}

function run(command, args) {
	return new Promise((resolve, reject) => {
		const child = spawn(executable(command), args, {
			stdio: 'inherit',
			env: process.env,
		});
		child.once('error', reject);
		child.once('exit', (code, signal) => {
			if (signal) reject(new Error(`${command} terminated by signal ${signal}`));
			else resolve(code ?? 1);
		});
	});
}

let deployStatus;
try {
	deployStatus = await run('npx', ['wrangler', 'deploy']);
} catch (error) {
	console.error(`Cloudflare deployment failed to start: ${error.message}`);
	process.exit(1);
}

if (deployStatus !== 0) process.exit(deployStatus);

const isWorkersBuild = process.env.WORKERS_CI === '1';
const branch = process.env.WORKERS_CI_BRANCH;
if (!isWorkersBuild || branch !== 'main') {
	console.log('Skipping Baidu push: this is not a production Workers Build for main.');
	process.exit(0);
}

let pushStatus;
try {
	pushStatus = await run('npm', ['run', 'baidu:push']);
} catch (error) {
	console.warn(`Warning: deployment succeeded, but Baidu push could not start: ${error.message}`);
	process.exit(0);
}

if (pushStatus !== 0) {
	console.warn(`Warning: deployment succeeded, but Baidu push failed with exit code ${pushStatus}.`);
}
