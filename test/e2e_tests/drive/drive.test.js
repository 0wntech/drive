const config = require('../testConfig.json');
const { initPage } = require('../utils');
require('dotenv').config();

describe('drive', () => {
    test('should click folders and files', async () => {
        const page = await initPage(browser, config);
        await page.goto(config.baseUrl + 'home');
        await page.waitForSelector('[data-test-id="item-profile"]');
        await page.click('[data-test-id="item-profile"]');
        await page.waitForSelector('[data-test-id="file-card"]');
        await page.click('[data-test-id="file-card"]');
        await page.waitForSelector('[data-test-id="header"]');
        const header = await page.$eval(
            '[data-test-id="header"]',
            (e) => e.innerHTML
        );
        expect(header).toBe('card');
    });
});
