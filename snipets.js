const { transformFileName } = require('./helpers.js');

const useImportTemplateSnippet = (fileName) => {
    return `import ${fileName} from './${fileName}.jsx';\n`;
};

const useSvgPreviewSnippet = (fileName) => {
    return `            <p>${fileName}:</p> <br/><${fileName}/> <br/> <br/> <br/> <br/>\n`;
};

const useExportTemplateSnippet = (fileName) => {
    return `    ${fileName},\n`;
};

const useJsxTemplateSnippet = (fileName, newSvgString) => {
    return `const ${fileName} = (props) => {\n    const { color = '', className } = props;\n\n    const classes = \`${transformFileName(
        fileName
    )}\${className ? ' ' + className : ''}\`;\n\n    return (\n        ${newSvgString}\n    );\n};\n\nexport default ${fileName};`;
};

const useAllSvgPreviewsSnippet = (previews) => {
    return `\nconst SVGPreview = () => {\n    return (\n        <div style={{padding: '60px', backgroundColor: "#afafaf"}}>\n${previews.join(
        ''
    )}        </div>\n    )\n}\n`;
};

const useExportAllSvgSnippet = (JSXFiles) => {
    return `\nexport {\n    SVGPreview,\n${JSXFiles.join('')}};\n`;
};

module.exports = {
    useImportTemplateSnippet,
    useSvgPreviewSnippet,
    useExportTemplateSnippet,
    useJsxTemplateSnippet,
    useAllSvgPreviewsSnippet,
    useExportAllSvgSnippet,
};
