// custom-environment.js
const PuppeteerEnvironment = require('jest-environment-puppeteer');

class CustomEnvironment extends PuppeteerEnvironment {
    async setup() {
        await super.setup();
    }

    async teardown() {
        await super.teardown();
    }
}

module.exports = CustomEnvironment;
