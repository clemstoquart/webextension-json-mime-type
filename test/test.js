'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert').strict;
const sinon = require('sinon');
global.browser = require('sinon-chrome/webextensions');

const main = require('../main');

describe('Unit tests', () => {

    describe('global behaviour', () => {

        it('should register a listener for all http requests', () => {
            sinon.assert.calledOnce(browser.webRequest.onHeadersReceived.addListener);
        });

    });

    describe('should find json header', () => {

        it('should find json in application/json', () => {
            const headers = {
                name: 'Content-Type',
                value: 'application/json'
            };

            const result = main.findJsonMimeType(headers);

            assert.strictEqual(result, true);
        });

        it('should find json in application/vnd.spring-boot.actuator.v1+json', () => {
            const headers = {
                name: 'Content-Type',
                value: 'application/vnd.spring-boot.actuator.v1+json'
            };

            const result = main.findJsonMimeType(headers);

            assert.strictEqual(result, true);
        });

        it('should not find json for empty value', () => {
            const headers = {
                name: 'Content-Type',
                value: ''
            };

            const result = main.findJsonMimeType(headers);

            assert.strictEqual(result, false);
        });

        it('should not find json for text/html;charset=utf-8', () => {
            const headers = {
                name: 'Content-Type',
                value: 'text/html; charset=utf-8'
            };

            const result = main.findJsonMimeType(headers);

            assert.strictEqual(result, false);
        });

    });

    describe('should override json header', () => {

        it('should override json header application/vnd.spring-boot.actuator.v1+json', async () => {
            const request = {
                responseHeaders: [
                    {name: 'Content-Type', value: 'application/vnd.spring-boot.actuator.v1+json'},
                    {name: 'Status', value: '200 OK'}
                ]
            };

            const result = main.overrideJsonHeader(request);

            const value = await result;
            assert.strictEqual(value.responseHeaders.length, 3);
        });

        it('should do nothing if headers list is empty', async () => {
            const request = {
                responseHeaders: []
            };

            const result = main.overrideJsonHeader(request);

            const value = await result;
            assert.strictEqual(value.responseHeaders.length, 0);
        });
    });
});
