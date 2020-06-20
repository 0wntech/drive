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

describe('e2e edit profile', () => {
    it('should change profile data', async () => {
        const page = await initPage(browser);

        await page.goto(config.baseUrl + 'home');
        await page.waitForSelector(
            '[data-test-id="navigation-profile-picture"]'
        );
        await page.click('[data-test-id="navigation-profile-picture"]');
        await page.waitForSelector('[data-test-id="edit"]');
        await page.click('[data-test-id="edit"]');
        await page.waitForSelector('[data-test-id="name-input"]');
        const nameInput = await page.$('[data-test-id="name-input"]');
        nameInput.click();
        nameInput.click({ clickCount: 3 });
        await page.type('[data-test-id="name-input"]', 'Tester');
        await page.click('[data-test-id="edit-submit"]');
        await page.waitForSelector('[data-test-id="name-input"][readonly]');
        const name = await page.$eval(
            '[data-test-id="name-input"]',
            (e) => e.value
        );
        expect(name).toBe('Tester');
    });
});
