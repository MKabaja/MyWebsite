import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const hookInput = JSON.parse(readFileSync(0, 'utf8'));
const editedFilePath = hookInput.tool_input?.file_path;
const projectDirectory = process.env.CLAUDE_PROJECT_DIR ?? hookInput.cwd;

if (editedFilePath) {
	const biomeEntryPath = join(
		projectDirectory,
		'node_modules',
		'@biomejs',
		'biome',
		'bin',
		'biome',
	);
	const biomeResult = spawnSync(
		process.execPath,
		[
			biomeEntryPath,
			'check',
			'--write',
			'--no-errors-on-unmatched',
			'--files-ignore-unknown=true',
			editedFilePath,
		],
		{ cwd: projectDirectory, encoding: 'utf8' },
	);

	if (biomeResult.status !== 0) {
		process.stderr.write(`${biomeResult.stdout}${biomeResult.stderr}`);
		process.exit(2);
	}
}
