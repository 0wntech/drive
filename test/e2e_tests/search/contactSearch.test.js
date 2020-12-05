const config = require('../testConfig.json');
const { initPage } = require('../utils');

describe('e2e contact search', () => {
    it('should let a user search for contacts by username', async () => {
        expect.assertions(2);
        const page = await initPage(browser, config);
        await page.goto(config.baseUrl + 'home');
        await page.waitForSelector('[data-test-id="search-dropdown"]');
        const searchDropdown = await page.$('[data-test-id="search-dropdown"]');
        await searchDropdown.click();
        await page.type('.search__input', 'timbl');
        await page.waitForSelector(
            '[data-test-id="contact-search-timbl.solidcommunity.net"]'
        );
        await page.click(
            '[data-test-id="contact-search-timbl.solidcommunity.net"]'
        );
        await page.waitFor(1500);
        await page.waitForSelector('[data-test-id="header"]');
        const header = await page.$eval(
            '[data-test-id="header"]',
            (e) => e.innerHTML
        );
        expect(header).toBe('Tim Berners-Lee (solid.community)');
        expect(page.url()).toBe(
            'http://localhost:3001/profile/timbl.solidcommunity.net'
        );
    });
    it('should let a user search for contacts by webId', async () => {
        expect.assertions(2);
        const page = await initPage(browser, config);
        await page.goto(config.baseUrl + 'home');
        await page.waitForSelector('[data-test-id="search-dropdown"]');
        const searchDropdown = await page.$('[data-test-id="search-dropdown"]');
        await searchDropdown.click();
        await page.type('.search__input', 'timbl.solid.community/profile/card');
        await page.waitForSelector(
            '[data-test-id="contact-search-timbl.solidcommunity.net"]'
        );
        await page.click(
            '[data-test-id="contact-search-timbl.solidcommunity.net"]'
        );
        await page.waitFor(1500);
        await page.waitForSelector('[data-test-id="header"]');
        const header = await page.$eval(
            '[data-test-id="header"]',
            (e) => e.innerHTML
        );
        expect(header).toBe('Tim Berners-Lee (solid.community)');
        expect(page.url()).toBe(
            'http://localhost:3001/profile/timbl.solidcommunity.net'
        );
    });
});
