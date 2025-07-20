import base from './index.js';
import ts from 'typescript-eslint';

export default ts.config(...base, {
	ignores: ['.DS_Store/*', 'node_modules/*', '.turbo/*', '.env', '.env.*', '!.env.example']
});
