const transformFileName = (str) => {
    const parts = str.split(/(?=[A-Z])/);
    const newParts = parts.map((part) => part.toLowerCase());
    return newParts.join('-');
}

module.exports = {
    transformFileName
}