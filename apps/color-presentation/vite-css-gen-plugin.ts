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
const TAILWIND_LIGHTNESS_INDICES = [
    50, 100, 200,
    300, 400, 500,
    600, 700, 800,
    900, 950
] as const;
const TAILWIND_LIGHTNESS_STEPS = [
    97.72, 95.05, 90.56,
    84.04, 76.12, 68.26,
    59.78, 51.49, 44.61,
    39.45, 27.79
] as const;
const MAX_CONTINUOUS_CHROMA = [
    0.0147, 0.0258, 0.0505,
    0.0872, 0.1339, 0.1645,
    0.144, 0.1241, 0.1075,
    0.095, 0.0669
] as const;

function chromaForIndex(index: number) {
    return (MAX_CONTINUOUS_CHROMA[index]! * 100 * 1.2).toFixed(2);
}

function createReactiveHuedColor(reactiveColorName: string, hueVarName: string) {
    return `
		:root{
			${hueVarName}: 0;
		}
		@theme inline{
			${TAILWIND_LIGHTNESS_INDICES.map((index, i) => '--color-' + reactiveColorName + '-' + index + ': oklch(' + TAILWIND_LIGHTNESS_STEPS[i] + '% ' + chromaForIndex(i) + '% var(' + hueVarName + '));').join('\n\t')}
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
