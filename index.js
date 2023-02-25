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
const svgFolderPath = argv.path;

async function main() {
    const files = await fs.readdir(svgFolderPath);
    const svgFiles = files.filter((file) => path.extname(file) === '.svg');
    const jsxFiles = files.filter((file) => path.extname(file) === '.jsx');

    await Promise.all(
        svgFiles.map((file) => updateSvgFile(path.join(svgFolderPath, file)))
    );

    const newJsxFiles = await renameSvgFiles(svgFolderPath, svgFiles);
    generateIndexFile(svgFolderPath, [...jsxFiles, ...newJsxFiles]);

    console.log('Updated!');
}

main().catch(console.error);
