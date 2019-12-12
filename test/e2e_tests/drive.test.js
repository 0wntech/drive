jest.setTimeout(30000);
describe('e2e drive', () => {
    xit('should click folders and files', async () => {
        await page.goto('http://localhost:3000/home');
        await page.waitForSelector('[data-test-id="profile"]');
        await page.click('[data-test-id="profile"]');
        await page.waitForSelector('[data-test-id="card"]');
        await page.click('[data-test-id="card"]');
        const header = await page.$eval(
            '[data-test-id=header]',
            (e) => e.innerHTML
        );
        expect(header).toBe('card');
    });
});
