const fs = require('fs').promises;
const path = require('path');

const { useJsxTemplateSnippet } = require('../snipets.js');

const updateSvgFile = async (filePath) => {
    console.log('filePath ---', filePath);
    const svgString = await fs.readFile(filePath, 'utf8');
    const fileName = path.parse(filePath).name;
    const newSvgString = svgString.replace(/<svg/g, `<svg className={classes}`);

    try {
        await fs.writeFile(
            filePath,
            useJsxTemplateSnippet(fileName, newSvgString)
        );
        console.log(`File ${filePath} updated successfully`);
    } catch (err) {
        console.error(`Failed to update ${filePath}: ${err}`);
    }
};

module.exports = updateSvgFile;
