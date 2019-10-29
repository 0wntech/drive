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
    describe('Testing url utils', () => {
        const folderUrl = 'https://www.heise.de/newsticker/it/';
        const fileUrl = 'https://www.heise.de/favicon.ico';
        const emptyUrl = '';
        const invalidUrl = 'ich bin keine url';

        test('getBreadcrumbsfromURL(url) should return Breadcrumbs as array', () => {
            expect(JSON.stringify(getBreadcrumbsFromUrl(folderUrl))).toBe(
                JSON.stringify(['/', '/newsticker', '/it'])
            );
        });

        test('test getBreadcrumbsfromURL(url="") should throw', () => {
            expect(() => getBreadcrumbsFromUrl(emptyUrl)).toThrow();
        });

        test('test getBreadcrumbsfromURL(url=invalidUrl) should throw', () => {
            expect(() => getBreadcrumbsFromUrl(invalidUrl)).toThrow();
        });

        test('getSuffixAndPlaceholder(url) should return a placeholder for rename input + fileSuffix if present', () => {
            expect(fileUtils.getSuffixAndPlaceholder(fileUrl)).toStrictEqual({
                fileSuffix: 'ico',
                placeholder: 'favicon',
            });
        });
    });
    describe('Testing file utils', () => {
        const types = [
            { file: 'file.py', mimeType: 'application/x-python-code' },
            { file: 'test.jpeg', mimeType: 'image' },
            { file: 'test.jpg', mimeType: 'image' },
            { file: 'filewithNumber.ico', mimeType: 'image' },
            { file: 'file.mp3', mimeType: 'audio' },
            { file: 'file.html', mimeType: 'text/html' },
            { file: 'file.xml', mimeType: 'text/xml' },
            { file: 'file.ttl', mimeType: 'text/turtle' },
            { file: 'file.css', mimeType: 'text/css' },
            { file: 'file.txt', mimeType: 'text/plain' },
            { file: 'foldername', mimeType: 'folder' },
        ];
        const files = ['test.lol', 'broken.', 'noDot'];
        const folders = ['doge', 'muchTest'];
        it('getContentType() returns the correct mime type', () => {
            types.map((test) => {
                expect(fileUtils.getContentType(test.file)).toEqual(
                    test.mimeType
                );
            });
        });

        test('test getFileType(regularFileName) should return file type', () => {
            expect(fileUtils.getFileType('fav.ico')).toBe('ico');
        });
        test('test getFileType(fileNameWithoutDot) should return null', () => {
            expect(fileUtils.getFileType('fav')).toBeNull();
        });

        test('test getFileType(fileNameWithDotAtTheEnd.) should return null', () => {
            expect(fileUtils.getFileType('fav.')).toBeNull();
        });

        test('test convertFilesAndFoldersToArray(files, folder) should return arrayOfObjects', () => {
            const converted = fileUtils.convertFilesAndFoldersToArray(
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

        it('getContentType() handles multiple dots', () => {
            expect(fileUtils.getContentType('test.exe.png')).toEqual('image');
        });

        test('namingConflict(name, folder) should return false if the there is no folder or file with name in the specified folder', () => {
            expect(
                fileUtils.namingConflict('hehe', {
                    files: files,
                    folders: folders,
                })
            ).toBe(false);
        });

        test('namingConflict(name, folder) should return true if the there is a folder or file with name in the specified folder', () => {
            expect(
                fileUtils.namingConflict('doge', {
                    files: files,
                    folders: folders,
                })
            ).toBe(true);
        });
    });
});
