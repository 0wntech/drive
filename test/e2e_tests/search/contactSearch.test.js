const config = require('../testConfig.json');
const { initPage } = require('../utils');

describe('e2e contact search', () => {
    it('should let a user search for contacts by username', async () => {
        expect.assertions(2);
        const page = await initPage(browser, config);
        await page.goto(config.baseUrl + 'home');
        await page.waitForSelector('[data-test-id="search-input"]');
        const searchInput = await page.$('[data-test-id="search-input"]');
        await searchInput.click();
        await page.type('[data-test-id="search-input"]', 'timbl');
        await page.waitFor(700);
        await page.waitForSelector('[data-test-id="contact-timbl"]');
        await page.click('[data-test-id="contact-timbl"]');
        await page.waitFor(1500);
        await page.waitForSelector('[data-test-id="header"]');
        const header = await page.$eval(
            '[data-test-id="header"]',
            (e) => e.innerHTML
        );
        expect(header).toBe('Tim (at OU) BL');
        expect(page.url()).toBe(
            'http://localhost:3001/profile/timbl.solid.open.ac.uk'
        );
    });
    it('should let a user search for contacts by webId', async () => {
        expect.assertions(2);
        const page = await initPage(browser, config);
        await page.goto(config.baseUrl + 'home');
        await page.waitForSelector('[data-test-id="search-input"]');
        const searchInput = await page.$('[data-test-id="search-input"]');
        await searchInput.click();
        await page.type(
            '[data-test-id="search-input"]',
            'timbl.inrupt.net/profile/card'
        );
        await page.waitForSelector('[data-test-id="contact-timbl"]');
        await page.click('[data-test-id="contact-timbl"]');
        await page.waitFor(1500);
        await page.waitForSelector('[data-test-id="header"]');
        const header = await page.$eval(
            '[data-test-id="header"]',
            (e) => e.innerHTML
        );
        expect(header).toBe('Tim BL on Inrupt.net');
        expect(page.url()).toBe(
            'http://localhost:3001/profile/timbl.inrupt.net'
        );
    });
});
