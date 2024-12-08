const findJsonMimeType = (header) => {
    if (header.name === undefined) {
        return false;
    }
    return (
        header.name.toLowerCase() === 'content-type' &&
        header.value.includes('json')
    );
};

const overrideJsonHeader = (request) =>
    new Promise((resolve) => {
        if (request.responseHeaders.find(findJsonMimeType)) {
            const jsonHeader = {
                name: 'Content-Type',
                value: 'application/json',
            };
            request.responseHeaders.push(jsonHeader);
        }

        resolve({ responseHeaders: request.responseHeaders });
    });

browser.webRequest.onHeadersReceived.addListener(
    overrideJsonHeader,
    {
        urls: ['<all_urls>'],
    },
    ['blocking', 'responseHeaders'],
);

exports.findJsonMimeType = findJsonMimeType;
exports.overrideJsonHeader = overrideJsonHeader;
