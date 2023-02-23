#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
var argv = require('minimist')(process.argv.slice(2));
const svgFolder = argv.p;

const useImportTemplate = (fileName) => {
    return `import ${fileName} from './${fileName}.jsx';\n`;
};

const useExportTemplateSnippet = (fileName) => {
    return `    ${fileName},\n`;
};

fs.readdir(svgFolder)
    .then((files) => {
        const JSXFiles = [];
        let imports = '';

        files.forEach((file) => {
            if (path.extname(file) === '.jsx') {
                imports += useImportTemplate(path.parse(file).name);
                JSXFiles.push(useExportTemplateSnippet(path.parse(file).name));
            }
        });

        const exportSnippet = `export {\n${JSXFiles.join('')}};\n`;

        return fs.writeFile('mynewfile.js', imports + exportSnippet);
    })
    .then(() => {
        console.log('Updated!');
    })
    .catch((err) => {
        console.error(err);
    });
