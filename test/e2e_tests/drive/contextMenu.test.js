const config = require('../testConfig.json');
const { initPage } = require('../utils');
require('dotenv').config();

describe('contextMenu', () => {
    describe('file options', () => {
        test('should be able to create a new file with right click', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="drive"]');
            await page.click('[data-test-id="drive"]', {
                button: 'right',
            });
            await page.waitForSelector(
                '[data-test-id="contextmenu-Create-File"]'
            );
            await page.click('[data-test-id="contextmenu-Create-File"]');
            await page.waitForSelector('[data-test-id="window-Create-File"]');
            await page.waitForSelector(
                '[data-test-id="create-resource-input"]'
            );
            await page.type(
                '[data-test-id="create-resource-input"]',
                'test2.txt'
            );
            await page.waitForSelector(
                '[data-test-id="create-resource-submit"]'
            );
            await page.click('[data-test-id="create-resource-submit"]');
            const newFile = await page.waitForSelector(
                '[data-test-id="file-test2.txt"]'
            );
            expect(newFile).not.toBe(undefined);
        });

        test('should be able to rename a file with right click', async () => {
            expect.assertions(2);
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="file-test2.txt"]');
            await page.click('[data-test-id="file-test2.txt"]', {
                button: 'right',
            });
            await page.waitForSelector('[data-test-id="contextmenu-Rename"]');
            await page.click('[data-test-id="contextmenu-Rename"]');
            await page.waitForSelector('[data-test-id="window-Rename-File"]');
            await page.waitForSelector(
                '[data-test-id="rename-resource-input"]'
            );
            await page.type(
                '[data-test-id="rename-resource-input"]',
                'test3.txt'
            );
            await page.waitForSelector(
                '[data-test-id="rename-resource-submit"]'
            );
            await page.click('[data-test-id="rename-resource-submit"]');
            const newFile = await page.waitForSelector(
                '[data-test-id="file-test3.txt"]'
            );
            expect(newFile).not.toBe(undefined);
            const files = await page.evaluate(() =>
                Array.from(
                    document.querySelectorAll('[data-test-id="file-label"]'),
                    (el) => el.innerText
                )
            );
            expect(files.find((file) => file === 'test2.txt')).toBe(undefined);
        });

        test('should be able to copy a file with right click', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="file-test3.txt"]');
            await page.click('[data-test-id="file-test3.txt"]', {
                button: 'right',
            });
            await page.waitForSelector('[data-test-id="contextmenu-Copy"]');
            await page.click('[data-test-id="contextmenu-Copy"]');
            await page.waitForSelector('[data-test-id="item-test"]');
            await page.click('[data-test-id="item-test"]');
            await page.waitForSelector('[data-test-id="drive"]');
            await page.click('[data-test-id="drive"]', { button: 'right' });
            await page.waitForSelector('[data-test-id="contextmenu-Paste"]');
            await page.click('[data-test-id="contextmenu-Paste"]');
            const newFile = await page.waitForSelector(
                '[data-test-id="file-test3.txt"]'
            );
            expect(newFile).not.toBe(undefined);
        });

        test('should be able to delete a file with right click', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="file-test3.txt"]');
            await page.click('[data-test-id="file-test3.txt"]', {
                button: 'right',
            });
            await page.waitForSelector('[data-test-id="contextmenu-Delete"]');
            await page.click('[data-test-id="contextmenu-Delete"]');
            await page.waitForSelector('[data-test-id="window-Delete-Item"]');
            await page.waitForSelector(
                '[data-test-id="delete-resource-submit"]'
            );
            await page.click('[data-test-id="delete-resource-submit"]');
            await page.waitForSelector('[data-test-id="header"]');
            const files = await page.evaluate(() =>
                Array.from(
                    document.querySelectorAll('[data-test-id="file-label"]'),
                    (el) => el.innerText
                )
            );
            expect(files.find((file) => file === 'test3.txt')).toBe(undefined);
        });
    });

    describe('folder options', () => {
        test('should be able to create a new folder with right click', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="drive"]');
            await page.click('[data-test-id="drive"]', {
                button: 'right',
            });
            await page.waitForSelector(
                '[data-test-id="contextmenu-Create-Folder"]'
            );
            await page.click('[data-test-id="contextmenu-Create-Folder"]');
            await page.waitForSelector('[data-test-id="window-Create-Folder"]');
            await page.waitForSelector(
                '[data-test-id="create-resource-input"]'
            );
            await page.type('[data-test-id="create-resource-input"]', 'test2');
            await page.waitForSelector(
                '[data-test-id="create-resource-submit"]'
            );
            await page.click('[data-test-id="create-resource-submit"]');
            const newFolder = await page.waitForSelector(
                '[data-test-id="item-test2"]'
            );
            expect(newFolder).not.toBe(undefined);
        });

        test('should be able to rename a folder with right click', async () => {
            expect.assertions(2);
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="item-test2"]');
            await page.click('[data-test-id="item-test2"]', {
                button: 'right',
            });
            await page.waitForSelector('[data-test-id="contextmenu-Rename"]');
            await page.click('[data-test-id="contextmenu-Rename"]');
            await page.waitForSelector('[data-test-id="window-Rename-File"]');
            await page.waitForSelector(
                '[data-test-id="rename-resource-input"]'
            );
            await page.type('[data-test-id="rename-resource-input"]', 'test3');
            await page.waitForSelector(
                '[data-test-id="rename-resource-submit"]'
            );
            await page.click('[data-test-id="rename-resource-submit"]');
            const newFile = await page.waitForSelector(
                '[data-test-id="item-test3"]'
            );
            expect(newFile).not.toBe(undefined);
            const files = await page.evaluate(() =>
                Array.from(
                    document.querySelectorAll('[data-test-id="file-label"]'),
                    (el) => el.innerText
                )
            );
            expect(files.find((file) => file === 'test2')).toBe(undefined);
        });

        test('should be able to copy a folder with right click', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="item-test3"]');
            await page.click('[data-test-id="item-test3"]', {
                button: 'right',
            });
            await page.waitForSelector('[data-test-id="contextmenu-Copy"]');
            await page.click('[data-test-id="contextmenu-Copy"]');
            await page.waitForSelector('[data-test-id="item-test"]');
            await page.click('[data-test-id="item-test"]');
            await page.waitForSelector('[data-test-id="drive"]');
            await page.click('[data-test-id="drive"]', { button: 'right' });
            await page.waitForSelector('[data-test-id="contextmenu-Paste"]');
            await page.click('[data-test-id="contextmenu-Paste"]');
            const newFile = await page.waitForSelector(
                '[data-test-id="item-test3"]'
            );
            expect(newFile).not.toBe(undefined);
        });

        test('should be able to delete a folder with right click', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="item-test3"]');
            await page.click('[data-test-id="item-test3"]', {
                button: 'right',
            });
            await page.waitForSelector('[data-test-id="contextmenu-Delete"]');
            await page.click('[data-test-id="contextmenu-Delete"]');
            await page.waitForSelector('[data-test-id="window-Delete-Item"]');
            await page.waitForSelector(
                '[data-test-id="delete-resource-submit"]'
            );
            await page.click('[data-test-id="delete-resource-submit"]');
            await page.waitForSelector('[data-test-id="header"]');
            const files = await page.evaluate(() =>
                Array.from(
                    document.querySelectorAll('[data-test-id="file-label"]'),
                    (el) => el.innerText
                )
            );
            expect(files.find((file) => file === 'test3')).toBe(undefined);
        });
    });
});
