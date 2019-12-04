// import faker from 'faker';
import puppeteer from 'puppeteer';

// following this tutorial
// https://blog.logrocket.com/end-to-end-testing-react-apps-with-puppeteer-and-jest-ce2f414b4fd7/

jest.setTimeout(30000);
describe('login', () => {
    it('should go through login process', async () => {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 100,
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
        await page.waitForSelector('[data-test-id="solid.community"]');
        await page.click('[data-test-id="solid.community"]');
        await page.waitForSelector('form');
        await page.click('#username');
        await page.type('#username', process.env.USERNAME);
        await page.click('#password');
        await page.type('#password', process.env.PASSWORD);
        await page.click('#login');
        await page.waitForSelector('[data-test-id=header]');
        const header = await page.$eval(
            '[data-test-id=header]',
            (e) => e.innerHTML
        );
        expect(header).toBe('Drive');
        await browser.close();
    });
});
