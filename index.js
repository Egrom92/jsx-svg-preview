// const argv = require('minimist')(process.argv.slice(2));
// console.log(argv.p)
// const svgFolder = argv.p;
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

function transformFileName(str) {
    const parts = str.split(/(?=[A-Z])/); // Split the string by capital letters
    const newParts = parts.map((part) => part.toLowerCase()); // Convert each part to lowercase
    return newParts.join('-'); // Join the parts with hyphens
}

fs.readdir('./src/svg')
    .then((files) => {
        const JSXFiles = [];
        let imports = '';
        let previews = [];

        files.forEach((file) => {
            const fileName = path.parse(file).name;

            if (path.extname(file) === '.jsx') {
                imports += useImportTemplateSnippet(fileName);
                JSXFiles.push(useExportTemplateSnippet(fileName));
                previews.push(useSvgPreviewSnipet(fileName));
            } else if (path.extname(file) === '.svg') {
                const oldPath = path.join('./src/svg', file);
                const newPath = path.join('./src/svg', `${fileName}.jsx`);

                try {
                    fs.rename(oldPath, newPath);
                    imports += useImportTemplateSnippet(fileName);
                    JSXFiles.push(useExportTemplateSnippet(fileName));
                    previews.push(useSvgPreviewSnipet(fileName));
                    console.log('File renamed successfully');

                    fs.readFile(newPath, 'utf8').then((data) => {
                        const svgString = data.toString();
                        const newSvgString = svgString.replace(
                            /<svg/g,
                            `<svg className={classes}`
                        );
                        fs.writeFile(
                            newPath,
                            `const ${fileName} = (props) => {\n    const { color = '', className } = props;\n\n    const classes = \`${transformFileName(
                                fileName
                            )}\${className ? ' ' + className : ''}\`;\n\n    return (\n        ${newSvgString}\n    );\n};\n\nexport default ${fileName};`
                        );
                    });
                } catch (err) {
                    console.error(err);
                }
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
