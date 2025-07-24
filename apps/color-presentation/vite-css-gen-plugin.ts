import fs from 'node:fs';
import path from 'node:path';

export default function generateCSSPlugin() {
    return {
        name: 'generate-css',
        buildStart() {
            const color1 = createReactiveHuedColor('reactive-1', '--reactive-color-1')
            const color2 = createReactiveHuedColor('reactive-2', '--reactive-color-2');
            const cssContent = `${color1}\n${color2}`;

            const outputPath = path.resolve('build/generated-theme.css');
            fs.mkdirSync(path.dirname(outputPath), {recursive: true});
            fs.writeFileSync(outputPath, unindent(cssContent));
        }
    };
}
const TAILWIND_LIGHTNESS_INDICES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const TAILWIND_LIGHTNESS_STEPS = [97.7206622236114, 95.04731356824277, 90.56018156455355, 84.04318784419276, 76.11837587906905, 68.26031987906848, 59.777332466015054, 51.49571935899158, 44.61247059531527, 39.45339024365322, 27.79151446895131] as const;
//TODO
const MAX_CONTINUOUS_CHROMA = [] as const;

function createReactiveHuedColor(reactiveColorName: string, hueVarName: string) {
    return `
		:root{
			${hueVarName}: 0;
		}
		@theme inline{
			${TAILWIND_LIGHTNESS_INDICES.map((index, i) => '--color-' + reactiveColorName + '-' + index + ': oklch(' + TAILWIND_LIGHTNESS_STEPS[i] + '% 20% var(' + hueVarName +'));').join('\n\t')}
		}
	`;
}

function unindent(code: string) {
    let indent: string | undefined;
    let lines = code.split(/\r\n|[\r\n]/);
    for (let i = 0, len = lines.length; i < len; ++i) {
        let line = lines[i];

        if (!line) continue;

        if (!indent) {
            let indentMatch = /^\s+/.exec(line);
            // if first non empty line has no indent -> no need to unindent rest lines
            if (!indentMatch) break;
            indent = indentMatch[0];
        }

        if (line.substring(0, indent.length) === indent) {
            line = line.substring(indent.length);
        }

        lines[i] = line;
    }

    code = lines.join('\n');

    return code.trim();
}
