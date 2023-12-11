#!/usr/bin/env node

const yargs = require('yargs');
const fs = require('fs').promises;
const path = require('path');
const { generateIndexFile, renameSvgFiles, updateSvgFile } = require('./utils');

const argv = yargs.option('p', {
    alias: 'path',
    describe: 'The path to the SVG folder',
    demandOption: true,
    type: 'string',
}).argv;

async function main() {
    const svgFolderPath = argv.path;

    if (!svgFolderPath) {
        console.error(
            'The -p parameter is required. Please provide the path to the SVG folder.'
        );
        process.exit(1);
    }

    try {
        await fs.access(svgFolderPath, fs.constants.F_OK);
    } catch (err) {
        console.warn(`Warning: The folder ${svgFolderPath} does not exist.`);
        return;
    }

    const files = await fs.readdir(svgFolderPath);
    const [svgFiles, jsxFiles] = files.reduce(
        ([svgs, jsxs], file) => {
            const ext = path.extname(file);
            return ext === '.svg'
                ? [[...svgs, file], jsxs]
                : ext === '.js'
                ? [svgs, [...jsxs, file]]
                : [svgs, jsxs];
        },
        [[], []]
    );

    if (svgFiles.length === 0 && jsxFiles.length === 0) {
        console.log('No .svg and .jsx files found in the folder');
        return;
    }

    await Promise.all(
        svgFiles.map((file) => updateSvgFile(path.join(svgFolderPath, file)))
    );

    const newJsxFiles = await renameSvgFiles(svgFolderPath, svgFiles);
    generateIndexFile(svgFolderPath, [...jsxFiles, ...newJsxFiles]);

    console.log('Updated!');
}

main().catch(console.error);
