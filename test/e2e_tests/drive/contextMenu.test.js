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
                'contextMenu.txt'
            );
            await page.waitForSelector(
                '[data-test-id="create-resource-submit"]'
            );
            await page.click('[data-test-id="create-resource-submit"]');
            const newFile = await page.waitForSelector(
                '[data-test-id="file-contextMenu.txt"]'
            );
            expect(newFile).not.toBe(undefined);
        });

        test('should be able to rename a file with right click', async () => {
            expect.assertions(2);
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="file-contextMenu.txt"]');
            await page.click('[data-test-id="file-contextMenu.txt"]', {
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
                'contextMenu2.txt'
            );
            await page.waitForSelector(
                '[data-test-id="rename-resource-submit"]'
            );
            await page.click('[data-test-id="rename-resource-submit"]');
            const newFile = await page.waitForSelector(
                '[data-test-id="file-contextMenu2.txt"]'
            );
            expect(newFile).not.toBe(undefined);
            const files = await page.evaluate(() =>
                Array.from(
                    document.querySelectorAll('[data-test-id="file-label"]'),
                    (el) => el.innerText
                )
            );
            expect(files.find((file) => file === 'contextMenu.txt')).toBe(
                undefined
            );
        });

        test('should be able to copy a file with right click', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector(
                '[data-test-id="file-contextMenu2.txt"]'
            );
            await page.click('[data-test-id="file-contextMenu2.txt"]', {
                button: 'right',
            });
            await page.waitForSelector('[data-test-id="contextmenu-Copy"]');
            await page.click('[data-test-id="contextmenu-Copy"]');
            await page.waitForSelector('[data-test-id="item-contextMenu"]');
            await page.click('[data-test-id="item-contextMenu"]');
            await page.waitForSelector('[data-test-id="drive"]');
            await page.click('[data-test-id="drive"]', { button: 'right' });
            await page.waitForSelector('[data-test-id="contextmenu-Paste"]');
            await page.click('[data-test-id="contextmenu-Paste"]');
            const newFile = await page.waitForSelector(
                '[data-test-id="file-contextMenu2.txt"]'
            );
            expect(newFile).not.toBe(undefined);
        });

        test('should be able to copy an image with right click', async () => {
            expect.assertions(3);
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="file-favicon.ico"]');
            await page.click('[data-test-id="file-favicon.ico"]', {
                button: 'right',
            });
            await page.waitForSelector('[data-test-id="contextmenu-Copy"]');
            await page.click('[data-test-id="contextmenu-Copy"]');
            await page.waitForSelector('[data-test-id="item-contextMenu"]');
            await page.click('[data-test-id="item-contextMenu"]');
            await page.waitForSelector('[data-test-id="drive"]');
            await page.click('[data-test-id="drive"]', { button: 'right' });
            await page.waitForSelector('[data-test-id="contextmenu-Paste"]');
            await page.click('[data-test-id="contextmenu-Paste"]');
            const newFile = await page.waitForSelector(
                '[data-test-id="file-favicon.ico"]'
            );
            expect(newFile).not.toBe(undefined);
            await page.click('[data-test-id="file-favicon.ico"]');
            await page.waitForSelector('[data-test-id="header"]');
            const header = await page.$eval(
                '[data-test-id="header"]',
                (el) => el.innerHTML
            );
            expect(header).toBe('favicon.ico');

            // click image
            const img = await page.waitForSelector(
                'img[data-test-id="file-image"]'
            );
            expect(img).not.toBe(undefined);
        });

        test('should be able to delete a file with right click', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector(
                '[data-test-id="file-contextMenu2.txt"]'
            );
            await page.click('[data-test-id="file-contextMenu2.txt"]', {
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
            expect(files.find((file) => file === 'contextMenu.txt')).toBe(
                undefined
            );
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
            await page.type(
                '[data-test-id="create-resource-input"]',
                'contextMenuTest'
            );
            await page.waitForSelector(
                '[data-test-id="create-resource-submit"]'
            );
            await page.click('[data-test-id="create-resource-submit"]');
            const newFolder = await page.waitForSelector(
                '[data-test-id="item-contextMenu"]'
            );
            expect(newFolder).not.toBe(undefined);
        });

        test('should be able to rename a folder with right click', async () => {
            expect.assertions(2);
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="item-contextMenu"]');
            await page.click('[data-test-id="item-contextMenu"]', {
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
                'contextMenu2'
            );
            await page.waitForSelector(
                '[data-test-id="rename-resource-submit"]'
            );
            await page.click('[data-test-id="rename-resource-submit"]');
            const newFolder = await page.waitForSelector(
                '[data-test-id="item-contextMenu2"]'
            );
            expect(newFolder).not.toBe(undefined);
            const files = await page.evaluate(() =>
                Array.from(
                    document.querySelectorAll('[data-test-id="file-label"]'),
                    (el) => el.innerText
                )
            );
            expect(files.find((file) => file === 'contextMenu')).toBe(
                undefined
            );
        });

        test('should be able to copy a folder with its contents by using the context menu', async () => {
            expect.assertions(3);
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="item-contextMenu2"]');
            await page.click('[data-test-id="item-contextMenu2"]', {
                button: 'right',
            });
            await page.waitForSelector('[data-test-id="contextmenu-Copy"]');
            await page.click('[data-test-id="contextmenu-Copy"]');
            await page.waitForSelector('[data-test-id="item-contextMenu2"]');
            await page.click('[data-test-id="item-contextMenu2"]');
            await page.waitForSelector('[data-test-id="drive"]');
            await page.click('[data-test-id="drive"]', { button: 'right' });
            await page.waitForSelector('[data-test-id="contextmenu-Paste"]');
            await page.click('[data-test-id="contextmenu-Paste"]');
            const newFolder = await page.waitForSelector(
                '[data-test-id="item-contextMenu2"]'
            );
            expect(newFolder).not.toBe(undefined);
            await newFolder.click();
            const containedNestedFolder = await page.waitForSelector(
                '[data-test-id="item-contextMenu"]'
            );
            expect(containedNestedFolder).not.toBe(undefined);
            await containedNestedFolder.click();
            const containedNestedFile = await page.waitForSelector(
                '[data-test-id="file-contextMenu.txt"]'
            );
            expect(containedNestedFile).not.toBe(undefined);
        });

        test('should be able to delete a folder with right click', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="item-contextMenu2"]');
            await page.click('[data-test-id="item-contextMenu2"]', {
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
                    document.querySelectorAll('[data-test-id="item-label"]'),
                    (el) => el.innerText
                )
            );
            expect(files.find((file) => file === 'contextMenu2')).toBe(
                undefined
            );
        });
    });
});
