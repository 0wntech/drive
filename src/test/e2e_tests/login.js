require('dotenv').config();
const puppeteer = require('puppeteer');
import { launchConfig, testServerUrl } from './config';

jest.setTimeout(16000);
console.log(launchConfig);
describe('login', () => {
    test('should go through login process', async () => {
        const browser = await puppeteer.launch(launchConfig);
        const page = await browser.newPage();
        await page.goto(testServerUrl);
        await page.waitForSelector('[data-test-id=login_btn]');
        await page.click('[data-test-id=login_btn]');
        await page.waitForSelector('[data-test-id="solid.community"');
        await page.click('[data-test-id="solid.community"]');
        await page.waitForSelector('form');
        await page.click('#username');
        await page.type('#username', process.env.DRIVE_USER);
        await page.click('#password');
        await page.type('#password', process.env.DRIVE_PASSWORD);
        await page.click('#login');
        await page.waitForSelector('[data-test-id="header"]');
        const header = await page.$eval(
            '[data-test-id="header"]',
            (e) => e.innerHTML
        );
        expect(header).toBe('Drive');
        browser.close();
    });
});