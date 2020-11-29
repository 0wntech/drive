const config = require('../testConfig.json');
const { initPage } = require('../utils');
require('dotenv').config();

describe('driveMenu', () => {
    describe('file options', () => {
        test('should be able to create a new file with drive menu', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="toolbar-buttons-more"]');
            await page.click('[data-test-id="toolbar-buttons-more"]');
            await page.waitForSelector(
                '[data-test-id="drivemenu-Create-File"]'
            );
            await page.click('[data-test-id="drivemenu-Create-File"]');
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

        test('should be able to rename a file with drive menu', async () => {
            expect.assertions(2);
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="file-test2.txt"]');
            await page.click('[data-test-id="file-test2.txt"]', {
                delay: 1000,
            });
            await page.waitForSelector('[data-test-id="toolbar-buttons-more"]');
            await page.click('[data-test-id="toolbar-buttons-more"]');
            await page.waitForSelector('[data-test-id="drivemenu-Rename"]');
            await page.click('[data-test-id="drivemenu-Rename"]');
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

        test('should be able to copy a file with drive menu', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="file-test3.txt"]');
            await page.click('[data-test-id="file-test3.txt"]', {
                delay: 1000,
            });
            await page.waitForSelector('[data-test-id="toolbar-buttons-more"]');
            await page.click('[data-test-id="toolbar-buttons-more"]');
            await page.waitForSelector('[data-test-id="drivemenu-Copy"]');
            await page.click('[data-test-id="drivemenu-Copy"]');
            await page.waitForSelector('[data-test-id="item-test"]');
            await page.click('[data-test-id="item-test"]');
            await page.waitForSelector('[data-test-id="toolbar-buttons-more"]');
            await page.click('[data-test-id="toolbar-buttons-more"]');
            await page.waitForSelector('[data-test-id="drivemenu-Paste"]');
            await page.click('[data-test-id="drivemenu-Paste"]');
            const newFile = await page.waitForSelector(
                '[data-test-id="file-test3.txt"]'
            );
            expect(newFile).not.toBe(undefined);
        });

        test('should be able to copy an image with drive menu', async () => {
            expect.assertions(3);
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="file-favicon.ico"]');
            await page.click('[data-test-id="file-favicon.ico"]', {
                delay: 1000,
            });
            await page.waitForSelector('[data-test-id="toolbar-buttons-more"]');
            await page.click('[data-test-id="toolbar-buttons-more"]');
            await page.waitForSelector('[data-test-id="drivemenu-Copy"]');
            await page.click('[data-test-id="drivemenu-Copy"]');
            await page.waitForSelector('[data-test-id="item-test"]');
            await page.click('[data-test-id="item-test"]');
            await page.waitForSelector('[data-test-id="toolbar-buttons-more"]');
            await page.click('[data-test-id="toolbar-buttons-more"]');
            await page.waitForSelector('[data-test-id="drivemenu-Paste"]');
            await page.click('[data-test-id="drivemenu-Paste"]');
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

        test('should be able to delete a file with drive menu', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="file-test3.txt"]');
            await page.click('[data-test-id="file-test3.txt"]', {
                delay: 1000,
            });
            await page.waitForSelector('[data-test-id="toolbar-buttons-more"]');
            await page.click('[data-test-id="toolbar-buttons-more"]');
            await page.waitForSelector('[data-test-id="drivemenu-Delete"]');
            await page.click('[data-test-id="drivemenu-Delete"]');
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
        test('should be able to create a new folder with drive menu', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="drive"]');
            await page.click('[data-test-id="drive"]', {
                delay: 1000,
            });
            await page.waitForSelector('[data-test-id="toolbar-buttons-more"]');
            await page.click('[data-test-id="toolbar-buttons-more"]');
            await page.waitForSelector(
                '[data-test-id="drivemenu-Create-Folder"]'
            );
            await page.click('[data-test-id="drivemenu-Create-Folder"]');
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

        test('should be able to rename a folder with drive menu', async () => {
            expect.assertions(2);
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="item-test2"]');
            await page.click('[data-test-id="item-test2"]', {
                delay: 1000,
            });
            await page.waitForSelector('[data-test-id="toolbar-buttons-more"]');
            await page.click('[data-test-id="toolbar-buttons-more"]');
            await page.waitForSelector('[data-test-id="drivemenu-Rename"]');
            await page.click('[data-test-id="drivemenu-Rename"]');
            await page.waitForSelector('[data-test-id="window-Rename-File"]');
            await page.waitForSelector(
                '[data-test-id="rename-resource-input"]'
            );
            await page.type('[data-test-id="rename-resource-input"]', 'test3');
            await page.waitForSelector(
                '[data-test-id="rename-resource-submit"]'
            );
            await page.click('[data-test-id="rename-resource-submit"]');
            const newFolder = await page.waitForSelector(
                '[data-test-id="item-test3"]'
            );
            expect(newFolder).not.toBe(undefined);
            const files = await page.evaluate(() =>
                Array.from(
                    document.querySelectorAll('[data-test-id="file-label"]'),
                    (el) => el.innerText
                )
            );
            expect(files.find((file) => file === 'test2')).toBe(undefined);
        });

        test('should be able to copy a folder with drive menu', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="item-test3"]');
            await page.click('[data-test-id="item-test3"]', {
                delay: 1000,
            });
            await page.waitForSelector('[data-test-id="toolbar-buttons-more"]');
            await page.click('[data-test-id="toolbar-buttons-more"]');
            await page.waitForSelector('[data-test-id="drivemenu-Copy"]');
            await page.click('[data-test-id="drivemenu-Copy"]');
            await page.waitForSelector('[data-test-id="item-test"]');
            await page.click('[data-test-id="item-test"]');
            await page.waitForSelector('[data-test-id="toolbar-buttons-more"]');
            await page.click('[data-test-id="toolbar-buttons-more"]');
            await page.waitForSelector('[data-test-id="drivemenu-Paste"]');
            await page.click('[data-test-id="drivemenu-Paste"]');
            const newFolder = await page.waitForSelector(
                '[data-test-id="item-test3"]'
            );
            expect(newFolder).not.toBe(undefined);
        });

        test('should be able to copy a folder with its contents by using the context menu', async () => {
            expect.assertions(2);
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="item-test3"]');
            await page.click('[data-test-id="item-test3"]');
            await page.waitForSelector('[data-test-id="drive"]');
            await page.click('[data-test-id="drive"]', {
                button: 'right',
            });

            // create nested file
            await page.waitForSelector('[data-test-id="toolbar-buttons-more"]');
            await page.click('[data-test-id="toolbar-buttons-more"]');
            await page.waitForSelector(
                '[data-test-id="drivemenu-Create-File"]'
            );
            await page.click('[data-test-id="drivemenu-Create-File"]');
            await page.waitForSelector('[data-test-id="window-Create-File"]');
            await page.waitForSelector(
                '[data-test-id="create-resource-input"]'
            );
            await page.type(
                '[data-test-id="create-resource-input"]',
                'test.txt'
            );
            await page.waitForSelector(
                '[data-test-id="create-resource-submit"]'
            );
            await page.click('[data-test-id="create-resource-submit"]');
            await page.waitForSelector('[data-test-id="file-test.txt"]');

            // navigate home
            await page.waitForSelector('[data-test-id="breadcrumb-Home"]');
            await page.click('[data-test-id="breadcrumb-Home"]');

            // copy
            await page.waitForSelector('[data-test-id="item-test3"]');
            await page.click('[data-test-id="item-test3"]', {
                delay: 1000,
            });
            await page.waitForSelector('[data-test-id="toolbar-buttons-more"]');
            await page.click('[data-test-id="toolbar-buttons-more"]');
            await page.waitForSelector('[data-test-id="drivemenu-Copy"]');
            await page.click('[data-test-id="drivemenu-Copy"]');
            await page.waitForSelector('[data-test-id="item-test"]');
            await page.click('[data-test-id="item-test"]');
            await page.waitForSelector('[data-test-id="item-test3"]');
            await page.click('[data-test-id="item-test3"]');
            await page.waitForSelector('[data-test-id="toolbar-buttons-more"]');
            await page.click('[data-test-id="toolbar-buttons-more"]');
            await page.waitForSelector('[data-test-id="drivemenu-Paste"]');
            await page.click('[data-test-id="drivemenu-Paste"]');
            const newFolder = await page.waitForSelector(
                '[data-test-id="item-test3"]'
            );
            expect(newFolder).not.toBe(undefined);
            await page.waitForSelector('[data-test-id="item-test3"]');
            await page.click('[data-test-id="item-test3"]');
            const containedFile = await page.waitForSelector(
                '[data-test-id="file-test.txt"]'
            );
            expect(containedFile).not.toBe(undefined);
        });

        test('should be able to delete a folder with drive menu', async () => {
            const page = await initPage(browser, config);
            await page.goto(config.baseUrl + 'home');
            await page.waitForSelector('[data-test-id="item-test3"]');
            await page.click('[data-test-id="item-test3"]', {
                delay: 1000,
            });
            await page.waitForSelector('[data-test-id="toolbar-buttons-more"]');
            await page.click('[data-test-id="toolbar-buttons-more"]');
            await page.waitForSelector('[data-test-id="drivemenu-Delete"]');
            await page.click('[data-test-id="drivemenu-Delete"]');
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
            expect(files.find((file) => file === 'test3')).toBe(undefined);
        });
    });
});
