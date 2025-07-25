# JSON mime type override

A simple web-extension that rewrites vendor specific content-type value to the standard one.

For example : `application/vnd.spring-boot.actuator.v1+json` will be modified into `application/json`.

**If you don't want to develop a new feature/fix a bug, I recommend you to download the extension from here** https://addons.mozilla.org/firefox/addon/json-content-type-override/.

## Requirements

Node 22 and npm 11.

## Set up the project

Like any other npm based project just run :

    npm install

## Build

Simply run :

    npm run build

First, this will check `manifest.json` is correct. Then, it will build a zip containing all the webextension files in the `web-ext-artifacts` folder.

## Lint

You can also run the following command if you only want to to check that your `manifest.json` is correct :

    npm run lint
