const argv = require('minimist')(process.argv.slice(2));
console.log(argv.p);
const svgFolder = argv.p;
const fs = require('fs').promises;
const path = require('path');

const useImportTemplateSnippet = (fileName) => {
    return `import ${fileName} from './${fileName}.jsx';\n`;
};

const useExportTemplateSnippet = (fileName) => {
    return `    ${fileName},\n`;
};

const useSvgPreviewSnipet = (fileName) => {
    return `            <p>${fileName}:</p> <br/><${fileName}/> <br/> <br/> <br/> <br/>\n`;
};

fs.readdir(svgFolder)
    .then((files) => {
        const JSXFiles = [];
        let imports = '';
        let previews = [];

        files.forEach((file) => {
            if (path.extname(file) === '.jsx') {
                const fileName = path.parse(file).name;

                imports += useImportTemplateSnippet(fileName);
                JSXFiles.push(useExportTemplateSnippet(fileName));
                previews.push(useSvgPreviewSnipet(fileName));
            }
        });

        const previewsSnipet = `\nconst SVGPreview = () => {\n    return (\n        <div style={{padding: '60px'}}>\n${previews.join(
            ''
        )}\n        </div>\n    )\n}\n`;
        const exportSnippet = `\nexport {\n    SVGPreview,\n${JSXFiles.join(
            ''
        )}};\n`;

        return fs.writeFile(
            './src/svg/index.js',
            imports + previewsSnipet + exportSnippet
        );
    })
    .then(() => {
        console.log('Updated!');
    })
    .catch((err) => {
        console.error(err);
    });
