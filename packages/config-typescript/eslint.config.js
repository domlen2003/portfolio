import base from '@repo/eslint-config/index.js';
import ts from 'typescript-eslint';

export default ts.config(...base, {
	ignores: [
		'.DS_Store/*',
		'node_modules/*',
		'build/*',
		'.turbo/*',
		'.svelte-kit/*',
		'.env',
		'.env.*',
		'!.env.example'
	]
});
