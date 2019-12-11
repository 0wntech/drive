jest.setTimeout(15000);
describe('drive', () => {
    it('should click folders and files', async () => {
        await page.goto('http://localhost:3000/home');
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
    });
});
