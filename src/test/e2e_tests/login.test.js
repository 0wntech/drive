// import faker from 'faker';
import puppeteer from 'puppeteer';

// following this tutorial
// https://blog.logrocket.com/end-to-end-testing-react-apps-with-puppeteer-and-jest-ce2f414b4fd7/

describe('login', () => {
    xit('should go through login process', async () => {
        const browser = await puppeteer.launch({
            headless: false,
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
        await page.waitForSelector('#root');
        const html = await page.$eval('#root', (e) => e.innerHTML);
        expect(html).toBe('?!?!?');
    });
});
