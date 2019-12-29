const puppeteer = require('puppeteer');
import { launchConfig, testServerUrl } from './config';

jest.setTimeout(30000);
describe('drive', () => {
    it('should click folders and files', async () => {
        const browser = await puppeteer.launch(launchConfig);
        const page = await browser.newPage();
        await page.goto(testServerUrl + '/home');
        await page.waitForSelector('[data-test-id="profile"]');
        await page.click('[data-test-id="profile"]');
        await page.waitForSelector('[data-test-id="card"]');
        await page.click('[data-test-id="card"]');
        await page.waitForSelector('[data-test-id="header"]');
        const header = await page.$eval(
            '[data-test-id="header"]',
            (e) => e.innerHTML
        );
        expect(header).toBe('card');
        browser.close();
    });
});
