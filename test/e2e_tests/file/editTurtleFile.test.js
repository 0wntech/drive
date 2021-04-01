const config = require('../testConfig.json');
const { initPage } = require('../utils');

describe('e2e edit turtle file', () => {
    test('should open and edit turtle file', async () => {
        expect.assertions(3);

        // init & navigate
        const page = await initPage(browser, config);
        await page.goto(config.baseUrl + 'home');
        await page.waitForSelector('[data-test-id="file-testFile.ttl"]');
        await page.click('[data-test-id="file-testFile.ttl"]');
        await page.waitForSelector('[data-test-id="header"]');
        const header = await page.$eval(
            '[data-test-id="header"]',
            (e) => e.innerHTML
        );
        expect(header).toBe('testFile.ttl');

        // enable edit
        await page.waitForSelector('[data-test-id="edit-file"]');
        await page.click('[data-test-id="edit-file"]');
        await page.waitForSelector('[class="CodeMirror-code"]');
        await page.click('[class="CodeMirror-code"]');

        // clear editor
        await page.evaluate(() => {
            const editor = document.querySelector('[class="CodeMirror-code"]');
            editor.value = '';
        });

        // type
        await page.type('[class="CodeMirror-code"]', '@prefix : <#>.');
        await page.keyboard.press('Enter');
        await page.type(
            '[class="CodeMirror-code"]',
            '@prefix foaf: <http://xmlns.com/foaf/0.1/>.'
        );
        await page.keyboard.press('Enter');
        await page.type('[class="CodeMirror-code"]', ':me foaf:name "Tester".');

        // save
        await page.waitForSelector('[data-test-id="save-file"]');
        await page.click('[data-test-id="save-file"]');

        await page.waitForSelector('[data-test-id="edit-file"]');
        await page.waitForSelector('[class=" CodeMirror-line "]');
        const body = await page.evaluate(() =>
            Array.from(document.querySelectorAll('span[role="presentation"]'))
                .map((el) => el.innerHTML)
                .join('\n')
        );
        expect(body).toBe(
            `@prefix : &lt;#&gt;.
@prefix foaf: &lt;http://xmlns.com/foaf/0.1/&gt;.
:me foaf:name "Tester".`
        );

        // enable edit
        await page.click('[data-test-id="edit-file"]');
        await page.click('[class="CodeMirror-code"]');

        // type wrong
        await page.type('[class="CodeMirror-code"]', 's');

        // save wrong
        await page.waitForSelector('[data-test-id="save-file"]');
        await page.click('[data-test-id="save-file"]');

        // expect error
        await page.waitForSelector('[data-test-id="file-error-message"]');
        const errorMessage = await page.$eval(
            '[data-test-id="file-error-message"]',
            (e) => e.innerHTML
        );
        expect(errorMessage.startsWith('SyntaxError')).toBe(true);
    });
});
