const config = require('../testConfig.json');
const { initPage } = require('../utils');

describe('e2e contacts', () => {
    describe('logged in user profile', () => {
        it('should see Contacts and Contact Recommendations', async () => {
            expect.assertions(4);
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector(
                '[data-test-id="navigation-profile-picture"]'
            );
            await page.click('[data-test-id="navigation-profile-picture"]');
            await page.waitForSelector('[data-test-id="contact-bejow"]');
            await page.waitForSelector('[data-test-id="contact-ludwig"]');
            await page.click('[data-test-id="contact-bejow"]');
            await page.waitFor(500);
            await page.waitForSelector('[data-test-id="header"]');
            const header = await page.$eval(
                '[data-test-id="header"]',
                (e) => e.innerHTML
            );
            expect(header).not.toBe('Tester');
            await page.waitForSelector('[data-test-id="name"]');
            const name = await page.$eval(
                '[data-test-id="name"]',
                (e) => e.innerHTML
            );
            expect(name).not.toBe(undefined);
            await page.waitForSelector('[data-test-id="bio"]');
            const bio = await page.$eval(
                '[data-test-id="bio"]',
                (e) => e.innerHTML
            );
            expect(bio).not.toBe(undefined);
            await page.waitForSelector('[data-test-id="job"]');
            const job = await page.$eval(
                '[data-test-id="job"]',
                (e) => e.innerHTML
            );
            expect(job).not.toBe(undefined);
        });
        it('should be able to add and remove contact from contact recommendations or contacts', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'profile');
            await page.waitForSelector('[data-test-id="add-contact-ludwig"]');
            await page.click('[data-test-id="add-contact-ludwig"]');
            await page.waitFor(500);
            await page.waitForSelector(
                '[data-test-id="delete-contact-ludwig"]'
            );
            await page.click('[data-test-id="delete-contact-ludwig"]');
            await page.waitFor(500);
            await page.waitForSelector('[data-test-id="add-contact-ludwig"]');
            const isNotContact = await page.$(
                '[data-test-id="add-contact-ludwig"]'
            );
            expect(isNotContact).not.toBe(undefined);
        });
        it('should be able to remove or add contact from profile page', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'profile');
            await page.waitForSelector('[data-test-id="contact-ludwig"]');
            await page.click('[data-test-id="contact-ludwig"]');
            await page.waitFor(500);
            await page.waitForSelector('[data-test-id="add-contact"]');
            await page.click('[data-test-id="add-contact"]');
            await page.waitFor(1500);
            await page.waitForSelector('[data-test-id="delete-contact"]');
            await page.click('[data-test-id="delete-contact"]');
            await page.waitFor(1500);
            const isNotContact = await page.$(
                '[data-test-id="delete-contact"]'
            );
            expect(isNotContact).not.toBe(undefined);
        });
    });

    describe('a contact profile', () => {
        it('should see Contacts and Contact Recommendations', async () => {
            expect.assertions(4);
            const page = await initPage(browser, config);
            await page.goto(
                config.baseUrl +
                    'profile/' +
                    process.env.SOLID_USERNAME +
                    '.solidcommunity.net'
            );
            await page.waitForSelector('[data-test-id="contact-bejow"]');
            await page.waitForSelector('[data-test-id="contact-ludwig"]');
            await page.click('[data-test-id="contact-bejow"]');
            await page.waitFor(500);
            await page.waitForSelector('[data-test-id="header"]');
            const header = await page.$eval(
                '[data-test-id="header"]',
                (e) => e.innerHTML
            );
            expect(header).not.toBe('Tester');
            await page.waitForSelector('[data-test-id="name"]');
            const name = await page.$eval(
                '[data-test-id="name"]',
                (e) => e.innerHTML
            );
            expect(name).not.toBe(undefined);
            await page.waitForSelector('[data-test-id="bio"]');
            const bio = await page.$eval(
                '[data-test-id="bio"]',
                (e) => e.innerHTML
            );
            expect(bio).not.toBe(undefined);
            await page.waitForSelector('[data-test-id="job"]');
            const job = await page.$eval(
                '[data-test-id="job"]',
                (e) => e.innerHTML
            );
            expect(job).not.toBe(undefined);
        });
    });
});
