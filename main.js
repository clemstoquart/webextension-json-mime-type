const isVendorContentType = (header) => {
    if (header.name === undefined) {
        return false;
    }
    return (
        header.name.toLowerCase() === 'content-type' &&
        header.value.startsWith('application/vnd.') &&
        header.value.includes('+')
    );
};

// Checks if the response has a vendor 'Content-Type' header and removes the "vendor part".
// E.g. "application/vnd.custom+xml" becomes "application/xml" and
// "application/vnd.smth+json" is changed to "application/json".
const overrideVendorContentType = (request) =>
    new Promise((resolve) => {
        const vendorCTH = request.responseHeaders.find(isVendorContentType);
        if (vendorCTH) {
            const genericCTH = {
                name: 'Content-Type',
                value: 'application/' + vendorCTH.value.substring(vendorCTH.value.indexOf('+') + 1),
            };
            request.responseHeaders.push(genericCTH);
        }

        resolve({ responseHeaders: request.responseHeaders });
    });

browser.webRequest.onHeadersReceived.addListener(
    overrideVendorContentType,
    {
        urls: ['<all_urls>'],
    },
    ['blocking', 'responseHeaders'],
);

exports.isVendorContentType = isVendorContentType;
exports.overrideVendorContentType = overrideVendorContentType;
