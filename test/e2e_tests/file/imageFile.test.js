const config = require('../testConfig.json');
const { initPage } = require('../utils');

describe('e2e open image file', () => {
    test('should open image file', async () => {
        expect.assertions(2);

        // init & navigate
        const page = await initPage(browser, config);
        await page.goto(config.baseUrl + 'home');
        await page.waitForSelector('[data-test-id="file-favicon.ico"]');
        await page.click('[data-test-id="file-favicon.ico"]');
        await page.waitForSelector('[data-test-id="header"]');
        const header = await page.$eval(
            '[data-test-id="header"]',
            (el) => el.innerHTML
        );
        expect(header).toBe('favicon.ico');

        // click image
        const img = await page.waitForSelector(
            'img[data-test-id="file-image"]'
        );
        expect(img).not.toBe(undefined);
    });
});
