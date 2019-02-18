# JSON mime type override

[![Build Status](https://travis-ci.org/clemstoquart/webextension-json-mime-type.svg?branch=master)](https://travis-ci.org/clemstoquart/webextension-json-mime-type)
[![Known Vulnerabilities](https://snyk.io/test/github/clemstoquart/webextension-json-mime-type/badge.svg?targetFile=package.json)](https://snyk.io/test/github/clemstoquart/webextension-json-mime-type?targetFile=package.json)

A simple web-extension that rewrites vendor specific json content-type value to the standard `application/json`.

For example : `application/vnd.spring-boot.actuator.v1+json` will be modified into `application/json`.

**If you don't want to develop a new feature/fix a bug, I recommend you to download the extension from here** https://addons.mozilla.org/firefox/addon/json-content-type-override/.

## Setup the project

Like any other npm based project just run :

	npm install

## Build

Simply run :

	npm run build

First, this will check `manifest.json` is correct. Then, it will build a zip containing all the webextension files in the `web-ext-artifacts` folder.

## Lint

You can also run the following command if you only want to to check that your `manifest.json` is correct :

	npm run lint
