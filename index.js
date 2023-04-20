function format() {
    const value = document.querySelector('.formatter-input').value;
    const fileName = document.querySelector('.file-name-input').value;
    const json = mapValueToJson(value);

    download(JSON.stringify(json), fileName || 'json-static-labels.txt', 'text/plain');
}

function reset() {
    document.querySelector('.formatter-input').value = '';
    document.querySelector('.file-name-input').value = '';
}

function mapValueToJson(value) {
    value = fixNestedQuotes(value)
    value = adaptToJsonFormat(value)
    value = removeExtraCommas(value)
    console.log(value)

    return JSON.parse(value);
}

function adaptToJsonFormat(value) {
    return value.replace(/(\w+)\s*=\s*'([^']+)'/g, '"$1":"$2",');
}

function removeExtraCommas(value) {
    value = value.replaceAll(',,', ',');

    let lastCommaIndex = value.lastIndexOf(',');
    if (lastCommaIndex !== -1) {
        value = value.slice(0, lastCommaIndex) + value.slice(lastCommaIndex + 1);
    }

    return value;
}

function download(content, fileName, contentType) {
    let a = document.createElement("a");
    let file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function fixNestedQuotes(value) {
    return value.replace(/"(?=[^:]*")|"(?=[^:]*$)/g, '\\"');
}