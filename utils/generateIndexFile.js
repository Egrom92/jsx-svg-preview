const fs = require('fs').promises;
const path = require('path');

const {
    useImportTemplateSnippet,
    useSvgPreviewSnippet,
    useExportTemplateSnippet,
    useExportAllSvgSnippet,
    useAllSvgPreviewsSnippet,
} = require('../snipets.js');

const generateIndexFile = async (svgFolderPath, files) => {
    try {
        const jsxFiles = [];
        let imports = '';
        let previews = [];

        for (const file of files) {
            const fileName = path.parse(file).name;

            imports += useImportTemplateSnippet(fileName);
            jsxFiles.push(useExportTemplateSnippet(fileName));
            previews.push(useSvgPreviewSnippet(fileName));
        }

        await fs.writeFile(
            path.join(svgFolderPath, 'index.js'),
            imports +
                useAllSvgPreviewsSnippet(previews) +
                useExportAllSvgSnippet(jsxFiles)
        );

        console.log(`Index file generated for ${svgFolderPath}`);
    } catch (err) {
        console.error(`Failed to generate index file: ${err}`);
    }
};

module.exports = generateIndexFile;
