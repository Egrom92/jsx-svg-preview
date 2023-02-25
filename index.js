#!/usr/bin/env node

const {
    useImportTemplateSnippet,
    useSvgPreviewSnippet,
    useExportTemplateSnippet,
    useJsxTemplateSnippet,
    useAllSvgPreviewsSnipet,
    useExportAllSvgSnippet,
} = require('./snipets.js');

const yargs = require('yargs');

const argv = yargs.option('p', {
    alias: 'path',
    describe: 'The path to the SVG folder',
    demandOption: true, // make the option required
    type: 'string', // specify the type of the option
}).argv;
const svgFolderPath = argv.path;
const fs = require('fs').promises;
const path = require('path');

fs.readdir(svgFolderPath)
    .then((files) => {
        const JSXFiles = [];
        let imports = '';
        let previews = [];

        files.forEach((file) => {
            const fileName = path.parse(file).name;

            if (path.extname(file) === '.jsx') {
                imports += useImportTemplateSnippet(fileName);
                JSXFiles.push(useExportTemplateSnippet(fileName));
                previews.push(useSvgPreviewSnippet(fileName));
            } else if (path.extname(file) === '.svg') {
                const oldPath = path.join(svgFolderPath, file);
                const newPath = path.join(svgFolderPath, `${fileName}.jsx`);

                try {
                    fs.rename(oldPath, newPath);
                    imports += useImportTemplateSnippet(fileName);
                    JSXFiles.push(useExportTemplateSnippet(fileName));
                    previews.push(useSvgPreviewSnippet(fileName));
                    console.log('File renamed successfully');

                    fs.readFile(newPath, 'utf8').then((data) => {
                        const svgString = data.toString();
                        const newSvgString = svgString.replace(
                            /<svg/g,
                            `<svg className={classes}`
                        );
                        fs.writeFile(
                            newPath,
                            useJsxTemplateSnippet(fileName, newSvgString)
                        );
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        });

        return fs.writeFile(
            svgFolderPath + '/index.js',
            imports +
                useAllSvgPreviewsSnipet(previews) +
                useExportAllSvgSnippet(JSXFiles)
        );
    })
    .then(() => {
        console.log('Updated!');
    })
    .catch((err) => {
        console.error(err);
    });
