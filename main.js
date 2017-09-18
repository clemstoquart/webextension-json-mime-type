'use strict';

function findJsonMimeType(header) {
    return header.value.includes('json');
}

function overrideJsonHeader(request) {
    return new Promise((resolve, reject) => {
        if (request.responseHeaders.find(findJsonMimeType)) {
            const jsonHeader = {
                name: "Content-Type",
                value: "application/json"
            };
            request.responseHeaders.push(jsonHeader);
        }

        resolve({responseHeaders: request.responseHeaders});
    });
}

browser.webRequest.onHeadersReceived.addListener(
    overrideJsonHeader,
    {
        urls: [ "<all_urls>" ]
    },
    [
        "blocking",
        "responseHeaders"
    ]
);
