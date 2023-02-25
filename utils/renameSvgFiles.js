const fs = require('fs').promises;
const path = require('path');

const renameSvgFiles = async (folderPath, svgFiles) => {
    const jsxFiles = [];

    await Promise.all(
        svgFiles.map(async (svgFile) => {
            const oldPath = path.join(folderPath, svgFile);
            const fileName = path.parse(svgFile).name;
            const newPath = path.join(folderPath, `${fileName}.jsx`);

            try {
                await fs.rename(oldPath, newPath);
                console.log(`File ${svgFile} renamed successfully`);
                jsxFiles.push(`${fileName}.jsx`);
            } catch (err) {
                console.error(`Failed to rename ${svgFile}: ${err}`);
            }
        })
    );

    return jsxFiles;
};

module.exports = renameSvgFiles;
