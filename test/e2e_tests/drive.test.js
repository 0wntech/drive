const config = require('./testConfig.json');
require('dotenv').config();

// config
const initPage = async (browser) => {
    const timeout = process.env.DRIVE_TIMEOUT || config.timeout;
    jest.setTimeout(timeout);
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(timeout);
    return page;
};

describe('drive', () => {
    it('should click folders and files', async () => {
        const page = await initPage(browser);
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
