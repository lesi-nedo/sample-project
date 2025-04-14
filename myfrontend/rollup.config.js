import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';


// the variable `production` is set to true if the environment variable `ROLLUP_WATCH` is not defined
const production = !process.env.ROLLUP_WATCH;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FLASK_DIR = path.join(path.resolve(__dirname, '../flask_back'), 'static', 'frontend', 'js');
const DJANGO_DIR = path.join(path.resolve(__dirname, '../django_back'),'static', 'frontend', 'js');

console.log('FLASK_DIR', FLASK_DIR);
console.log('DJANGO_DIR', DJANGO_DIR);
// the variable DIR_TO_BACKEND indicates the path for the bundle files to be completed to
const DIR_TO_BACKEND = process.env.BACKEND === 'flask' ? FLASK_DIR : DJANGO_DIR;
console.log('DIR_TO_BACKEND', DIR_TO_BACKEND);


/*
    * This function is used to clean the destination directories. Is defined as a plugin in the rollup config
    * @param {string} dirs - The directories to clean
*/
function cleanDirs(dirs) {
    return {
        name: 'clean-dirs',
        buildStart() {
            const cleanDir = (dirPath) => {
                if (fs.existsSync(dirPath)) {
                    fs.readdirSync(dirPath).forEach((file) => {
                        const curPath = path.join(dirPath, file);
                        if (fs.lstatSync(curPath).isDirectory()) {
                            cleanDir(curPath);
                        } else {
                            fs.unlinkSync(curPath);
                        }
                    });
                }
            };

            // Clean the directories
            dirs.forEach((dir) => {
                if (fs.existsSync(dir)) {
                    cleanDir(dir);
                } else {
                    fs.mkdirSync(dir, {recursive: true});
                }
            });
        }
    }

} 


/*
    * This function is used to create plugins for rollup
    * @return {Array} - The plugins to be used in the rollup config
*/
function createPlugins() {
    return [
        replace({
            preventAssignment: true,
            __IS_PROD: JSON.stringify(production),
        }),
        typescript({
            sourceMap: !production,
            inlineSources: !production,
        }),
        svelte({
            compilerOptions: {
                dev: !production,
            },
            emitCss: true
        }),
        resolve({
            browser: true,
            dedupe: ['svelte'],
            exportConditions: ['svelte', 'browser'],
        }),
        production && terser()
    ]
}


export default [
    {
        input: "src/main.ts",
        output: {
            sourcemap: !production,
            format: 'iife',
            name: 'app',
            dir: DIR_TO_BACKEND,
            entryFileNames: 'bundle.js',
            chunkFileNames: '[name].js',
            assetFileNames: '[name][extname]',
        },
        external: [/\.css$/],
        plugins: [
            cleanDirs([DIR_TO_BACKEND]),
            ...createPlugins(),
        ],
        onwarn(warning, handler) {
            // Ignore circular dependency warnings from svelte internals
            if (warning.code === 'CIRCULAR_DEPENDENCY') {
                // Check if the warning involves paths inside node_modules/svelte
                const involvesSvelteInternal = warning.ids?.some(id => id.includes('node_modules/svelte/'));
                if (involvesSvelteInternal) {
                    return; // Suppress the warning
                }
            }
            // Let Rollup handle other warnings normally
            handler(warning);
        },
        watch: {
            clearScreen: false,
            include: 'src/**',
        },

    }
]
