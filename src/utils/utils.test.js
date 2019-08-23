import { getBreadcrumbsFromUrl } from './url';
import fileUtils from './fileUtils';

expect.extend({
    toContainObject(received, argument) {
        const pass = this.equals(
            received,
            expect.arrayContaining([expect.objectContaining(argument)])
        );

        if (pass) {
            return {
                message: () =>
                    `expected ${this.utils.printReceived(
                        received
                    )} not to contain object ${this.utils.printExpected(
                        argument
                    )}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                    `expected ${this.utils.printReceived(
                        received
                    )} to contain object ${this.utils.printExpected(argument)}`,
                pass: false,
            };
        }
    },
});

describe('Testing util functions', () => {
    describe('Testing fileUtils', () => {
        const files = ['test.lol', 'broken.', 'noDot'];
        const folders = ['doge', 'muchTest'];
        test('test getFileType(regularFileName) should return file type', () => {
            expect(fileUtils.getFileType('fav.ico')).toBe('ico');
        });
        test('test getFileType(fileNameWithoutDot) should return null', () => {
            expect(fileUtils.getFileType('fav')).toBeNull();
        });

        test('test getFileType(fileNameWithDotAtTheEnd.) should return null', () => {
            expect(fileUtils.getFileType('fav.')).toBeNull();
        });

        test('test convertFilesAndFoldersToObject(files, folder) should return arrayOfObjects', () => {
            const converted = fileUtils.convertFilesAndFoldersToObject(
                files,
                folders
            );
            expect(converted.length).toBe(5);
            expect(converted).toContainObject({
                name: 'test.lol',
                fileType: 'lol',
                type: 'file',
            });
            expect(converted).toContainObject({
                name: 'broken.',
                fileType: null,
                type: 'file',
            });
            expect(converted).toContainObject({
                name: 'noDot',
                fileType: null,
                type: 'file',
            });
            expect(converted).toContainObject({
                name: 'doge',
                type: 'folder',
            });
            expect(converted).toContainObject({
                name: 'muchTest',
                type: 'folder',
            });
        });
    });
    describe('Testing urlUtils', () => {
        const url = 'https://www.heise.de/newsticker/it/';
        const emptyUrl = '';
        const invalidUrl = 'ich bin keine url';

        test('test getBreadcrumbsfromURL(url) should return Breadcrumbs as array', () => {
            expect(JSON.stringify(getBreadcrumbsFromUrl(url))).toBe(
                JSON.stringify(['/', '/newsticker', '/it'])
            );
        });

        test('test getBreadcrumbsfromURL(url="") should return empty array', () => {
            expect(() => getBreadcrumbsFromUrl(emptyUrl)).toThrow();
        });

        test('test getBreadcrumbsfromURL(url=invalidUrl) should return error', () => {
            expect(() => getBreadcrumbsFromUrl(invalidUrl)).toThrow();
        });
    });
});
