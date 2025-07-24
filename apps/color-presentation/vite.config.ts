import tailwindcss from '@tailwindcss/vite';
import {sveltekit} from '@sveltejs/kit/vite';
import {defineConfig} from 'vite';
import generateCSSPlugin from "./vite-css-gen-plugin";

export default defineConfig({
    plugins: [generateCSSPlugin(), tailwindcss(), sveltekit()]
});
