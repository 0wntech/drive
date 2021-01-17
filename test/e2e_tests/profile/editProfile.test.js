const config = require('../testConfig.json');
const { initPage } = require('../utils');

describe.skip('e2e edit profile', () => {
    it('should change display name', async () => {
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

    it('should change bio', async () => {
        const page = await initPage(browser, config);
        await page.goto(config.baseUrl + 'profile');
        await page.waitForSelector('[data-test-id="edit"]');
        await page.click('[data-test-id="edit"]');
        await page.waitForSelector('[data-test-id="bio-input"]');
        const bioInput = await page.$('[data-test-id="bio-input"]');
        await bioInput.click({ clickCount: 3 });
        await page.type('[data-test-id="bio-input"]', 'Testing is life');
        await page.click('[data-test-id="edit-submit"]');
        await page.waitFor(500);
        await page.waitForSelector('[data-test-id="bio"]');
        const bio = await page.$eval(
            '[data-test-id="bio"]',
            (e) => e.innerHTML
        );
        expect(bio).toBe('Testing is life');
    });

    it('should change email, phone, number and job', async () => {
        const page = await initPage(browser, config);
        await page.goto(config.baseUrl + 'profile');
        await page.waitForSelector('[data-test-id="edit"]');
        await page.click('[data-test-id="edit"]');
        await page.waitForSelector('[data-test-id="emails-input"]');
        const emailInput = await page.$('[data-test-id="emails-input"]');
        await emailInput.click({ clickCount: 3 });
        await page.type('[data-test-id="emails-input"]', 'test@tester.de');
        await page.waitForSelector('[data-test-id="telephones-input"]');
        const telephoneInput = await page.$(
            '[data-test-id="telephones-input"]'
        );
        await telephoneInput.click({ clickCount: 3 });
        await page.type('[data-test-id="telephones-input"]', '012345678910');
        await page.waitForSelector('[data-test-id="job-input"]');
        const jobInput = await page.$('[data-test-id="job-input"]');
        await jobInput.click({ clickCount: 3 });
        await page.type('[data-test-id="job-input"]', 'Tester');
        await page.click('[data-test-id="edit-submit"]');
        await page.waitFor(500);
        await page.waitForSelector('[data-test-id="emails"]');
        const emails = await page.$eval(
            '[data-test-id="emails"]',
            (e) => e.innerHTML
        );
        expect(emails).toBe('test@tester.de');
        await page.waitForSelector('[data-test-id="telephones"]');
        const telephones = await page.$eval(
            '[data-test-id="telephones"]',
            (e) => e.innerHTML
        );
        expect(telephones).toBe('012345678910');
        await page.waitForSelector('[data-test-id="job"]');
        const job = await page.$eval(
            '[data-test-id="job"]',
            (e) => e.innerHTML
        );
        expect(job).toBe('Tester');
    });
});
