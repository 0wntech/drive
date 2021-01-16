const config = require('../testConfig.json');
const { initPage } = require('../utils');

describe('e2e open contact file', () => {
    test('should open contact file', async () => {
        expect.assertions(3);

        // init and navigate
        const page = await initPage(browser, config);
        await page.goto(
            config.baseUrl + 'contact/ludwig.aws.owntech.de/file/%2Frobots.txt'
        );
        await page.waitForSelector('[data-test-id="header"]');
        const header = await page.$eval(
            '[data-test-id="header"]',
            (e) => e.innerHTML
        );
        expect(header).toBe('robots.txt');

        // read
        await page.waitForSelector('span[role="presentation"]');
        const body = await page.evaluate(() =>
            Array.from(document.querySelectorAll('span[role="presentation"]'))
                .map((el) => el.innerHTML)
                .join('\n')
        );
        expect(body).toBe(`User-agent: *
# Allow all crawling (subject to ACLs as usual, of course)
Disallow:`);

        // check breadcrumb
        const host = 'ludwig.aws.owntech.de';
        await page.waitForSelector(`[data-test-id="breadcrumb-${host}"]`);
        const breadcrumb = await page.$eval(
            `[data-test-id="breadcrumb-${host}"]`,
            (e) => e.innerHTML
        );
        expect(breadcrumb).toBe(host);
    });

    test('should open parent folder from breadcrumbs', async () => {
        expect.assertions(3);

        // init and navigate
        const page = await initPage(browser, config);
        await page.goto(
            config.baseUrl +
                'contact/ludwig.aws.owntech.de/file/%2Fprofile%2Fcard'
        );
        await page.waitForSelector('[data-test-id="header"]');
        const header = await page.$eval(
            '[data-test-id="header"]',
            (e) => e.innerHTML
        );
        expect(header).toBe('card');

        // check breadcrumb
        const folder = 'profile';
        await page.waitForSelector(`[data-test-id="breadcrumb-${folder}"]`);
        const breadcrumb = await page.$eval(
            `[data-test-id="breadcrumb-${folder}"]`,
            (e) => e.innerHTML
        );
        expect(breadcrumb).toBe(folder);

        // navigate with breadcrumb to folder
        await page.click(`[data-test-id="breadcrumb-${folder}"]`);
        await page.waitForSelector('[data-test-id="header"]');
        const profileFolder = await page.$eval(
            '[data-test-id="header"]',
            (e) => e.innerHTML
        );
        expect(profileFolder).toBe('Drive');
    });
});
