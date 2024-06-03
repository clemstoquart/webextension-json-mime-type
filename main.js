'use strict';

export const findJsonMimeType = function (header) {
    if (header.name === undefined) {
        return false;
    }
    return header.name.toLowerCase() === 'content-type' && header.value.includes('json');
};

export const overrideJsonHeader = function (request) {
    return new Promise((resolve) => {
        if (request.responseHeaders.find(findJsonMimeType)) {
            const jsonHeader = {
                name: 'Content-Type',
                value: 'application/json'
            };
            request.responseHeaders.push(jsonHeader);
        }

        resolve({responseHeaders: request.responseHeaders});
    });
};

browser.webRequest.onHeadersReceived.addListener(
    overrideJsonHeader,
    {
        urls: [ '<all_urls>' ]
    },
    [
        'blocking',
        'responseHeaders'
    ]
);
