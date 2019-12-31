const config = require('./testConfig.json');
require('dotenv').config();

// config
const timeout = process.env.DRIVE_TIMEOUT || config.timeout;
jest.setTimeout(timeout);
Promise.resolve(page.setDefaultNavigationTimeout(timeout));

describe('drive', () => {
    it('should click folders and files', async () => {
        await page.goto(config.baseUrl + 'home');
        await page.waitForSelector('[data-test-id="profile"]');
        await page.click('[data-test-id="profile"]');
        await page.waitForSelector('[data-test-id="card"]');
        await page.click('[data-test-id="card"]');
        await page.waitForSelector('[data-test-id="header"]');
        const header = await page.$eval(
            '[data-test-id="header"]',
            (e) => e.innerHTML
        );
        expect(header).toBe('card');
    });
});
