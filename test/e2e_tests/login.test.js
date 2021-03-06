const config = require('./testConfig.json');
require('dotenv').config();

// config
const timeout = process.env.DRIVE_TIMEOUT || config.timeout;
jest.setTimeout(timeout);
Promise.resolve(page.setDefaultNavigationTimeout(timeout));

describe('login', () => {
    test('should go through login process', async () => {
        await page.goto(config.baseUrl);
        await page.waitForSelector('[data-test-id=login_btn]');
        await page.click('[data-test-id=login_btn]');
        await page.waitForSelector('[data-test-id="solidcommunity.net"');
        await page.click('[data-test-id="solidcommunity.net"]');
        await page.waitForSelector('form');
        await page.click('#username');
        await page.type('#username', process.env.SOLID_USERNAME);
        await page.click('#password');
        await page.type('#password', process.env.SOLID_PASSWORD);
        await page.click('#login');
        await page.waitForSelector('[data-test-id="header"]');
        await page.waitForSelector('[data-test-id="item-profile"]');
        expect(
            await page.$eval('[data-test-id="header"]', (e) => e.innerHTML)
        ).toBe('Drive');
    });
});
