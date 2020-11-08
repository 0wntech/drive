const config = require('../testConfig.json');
const { initPage } = require('../utils');

describe('e2e edit profile', () => {
    it('should change profile data', async () => {
        const page = await initPage(browser, config);

        await page.goto(config.baseUrl + 'home');
        await page.waitForSelector(
            '[data-test-id="navigation-profile-picture"]'
        );
        await page.click('[data-test-id="navigation-profile-picture"]');
        await page.waitForSelector('[data-test-id="edit"]');
        await page.click('[data-test-id="edit"]');
        await page.waitForSelector('[data-test-id="name-input"]');
        const nameInput = await page.$('[data-test-id="name-input"]');
        await nameInput.click({ clickCount: 3 });
        await page.type('[data-test-id="name-input"]', 'Tester');
        await page.click('[data-test-id="edit-submit"]');
        await page.waitFor(500);
        await page.waitForSelector('[data-test-id="name"]');
        const name = await page.$eval(
            '[data-test-id="name"]',
            (e) => e.innerHTML
        );
        expect(name).toBe('Tester');
    });
});
