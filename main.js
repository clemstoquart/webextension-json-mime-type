'use strict';

const findJsonMimeType = function (header) {
    return header.value.includes('json');
};

const overrideJsonHeader = function (request) {
    return new Promise((resolve, reject) => {
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

exports.findJsonMimeType = findJsonMimeType;
exports.overrideJsonHeader = overrideJsonHeader;
