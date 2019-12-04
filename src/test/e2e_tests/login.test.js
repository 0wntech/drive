// import faker from 'faker';
import puppeteer from 'puppeteer';

// following this tutorial
// https://blog.logrocket.com/end-to-end-testing-react-apps-with-puppeteer-and-jest-ce2f414b4fd7/

jest.setTimeout(30000);
describe('login', () => {
    xit('should go through login process', async () => {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
        });
        const page = await browser.newPage();
        page.emulate({
            viewport: {
                width: 1920,
                height: 1024,
            },
            userAgent: '',
        });

        await page.goto('http://localhost:3000');
        await page.waitForSelector('[data-test-id=login_btn]');
        await page.click('[data-test-id=login_btn]');
        await page.waitForSelector('[data-test-id="owntech.de"]');
        await page.click('[data-test-id="owntech.de"]');
        await page.waitForSelector('form');
        await page.click('#username');
        await page.type('#username', 'test');
        await page.click('#password');
        await page.type('#password', 'testpassword');
        await page.waitForSelector('.alert');
        const html = await page.$eval('.provider', (e) => e.innerHTML);
        expect(html).toBe('?!?!?');
    });
});
