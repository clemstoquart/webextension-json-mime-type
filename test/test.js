const { describe, it } = require('node:test');
const assert = require('node:assert').strict;
const sinon = require('sinon');
global.browser = require('sinon-chrome/webextensions');

const main = require('../main');

describe('Unit tests', () => {
    describe('global behaviour', () => {
        it('should register a listener for all HTTP requests', () => {
            sinon.assert.calledOnce(
                browser.webRequest.onHeadersReceived.addListener,
            );
        });
    });

    describe('should recognise vendor Content-Type', () => {
        it('should not consider application/json as vendor Content-Type', () => {
            const headers = {
                name: 'Content-Type',
                value: 'application/json',
            };

            const result = main.isVendorContentType(headers);

            assert.strictEqual(result, false);
        });

        it('should consider application/vnd.spring-boot.actuator.v1+json as vendor Content-Type', () => {
            const headers = {
                name: 'Content-Type',
                value: 'application/vnd.spring-boot.actuator.v1+json',
            };

            const result = main.isVendorContentType(headers);

            assert.strictEqual(result, true);
        });

        it('should consider application/vnd.custom+xml as vendor Content-Type', () => {
            const headers = {
                name: 'Content-Type',
                value: 'application/vnd.custom+xml',
            };

            const result = main.isVendorContentType(headers);

            assert.strictEqual(result, true);
        });

        it('should not consider application/atom+xml as vendor Content-Type', () => {
            const headers = {
                name: 'Content-Type',
                value: 'application/atom+xml',
            };

            const result = main.isVendorContentType(headers);

            assert.strictEqual(result, false);
        });

        it('should not consider empty value as vendor Content-Type', () => {
            const headers = {
                name: 'Content-Type',
                value: '',
            };

            const result = main.isVendorContentType(headers);

            assert.strictEqual(result, false);
        });

        it('should not consider text/html;charset=utf-8 as vendor Content-Type', () => {
            const headers = {
                name: 'Content-Type',
                value: 'text/html; charset=utf-8',
            };

            const result = main.isVendorContentType(headers);

            assert.strictEqual(result, false);
        });
    });

    describe('should override vendor Content-Type', () => {
        it('should override application/vnd.spring-boot.actuator.v1+json to application/json', async () => {
            const request = {
                responseHeaders: [
                    {
                        name: 'Content-Type',
                        value: 'application/vnd.spring-boot.actuator.v1+json',
                    },
                    { name: 'Status', value: '200 OK' },
                ],
            };

            const result = main.overrideVendorContentType(request);

            const value = await result;
            assert.strictEqual(value.responseHeaders.length, 3);
            assert.deepStrictEqual(value.responseHeaders[2], {
                name: 'Content-Type',
                value: 'application/json',
            });
        });

        it('should override application/vnd.custom+xml to application/xml', async () => {
            const request = {
                responseHeaders: [
                    {
                        name: 'Content-Type',
                        value: 'application/vnd.custom+xml',
                    },
                    { name: 'Status', value: '200 OK' },
                ],
            };

            const result = main.overrideVendorContentType(request);

            const value = await result;
            assert.strictEqual(value.responseHeaders.length, 3);
            assert.deepStrictEqual(value.responseHeaders[2], {
                name: 'Content-Type',
                value: 'application/xml',
            });
        });

        it('should do nothing if headers list is empty', async () => {
            const request = {
                responseHeaders: [],
            };

            const result = main.overrideVendorContentType(request);

            const value = await result;
            assert.strictEqual(value.responseHeaders.length, 0);
        });

        it('should do nothing if there is no Content-Type', async () => {
            const request = {
                responseHeaders: [{ name: 'Status', value: '200 OK' }],
            };

            const result = main.overrideVendorContentType(request);

            const value = await result;
            assert.strictEqual(value.responseHeaders.length, 1);
        });
    });
});
