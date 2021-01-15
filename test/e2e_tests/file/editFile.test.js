const config = require('../testConfig.json');
const { initPage } = require('../utils');

describe('e2e edit test file', () => {
    test('should open and edit test file', async () => {
        expect.assertions(2);

        // init and navigate
        const page = await initPage(browser, config);
        await page.goto(config.baseUrl + 'home');
        await page.waitForSelector('[data-test-id="file-testFile.txt"]');
        await page.click('[data-test-id="file-testFile.txt"]');
        await page.waitForSelector('[data-test-id="header"]');
        const header = await page.$eval(
            '[data-test-id="header"]',
            (e) => e.innerHTML
        );
        expect(header).toBe('testFile.txt');

        // edit
        await page.waitForSelector('[data-test-id="edit-file"]');
        await page.click('[data-test-id="edit-file"]');
        await page.waitForSelector('[class="CodeMirror-code"]');

        // clear editor
        const nameInput = await page.$('[class="CodeMirror-code"]');
        await nameInput.click({ clickCount: 3 });

        // type
        await page.type('[class="CodeMirror-code"]', 'Test');

        // save
        await page.waitForSelector('[data-test-id="save-file"]');
        await page.click('[data-test-id="save-file"]');

        await page.waitForSelector('[data-test-id="edit-file"]');
        await page.waitForSelector('[class="CodeMirror-line"]');
        const body = await page.$eval(
            '[class="CodeMirror-line"]',
            (e) => e.innerHTML
        );
        expect(body).toBe('Test');
    });
});
