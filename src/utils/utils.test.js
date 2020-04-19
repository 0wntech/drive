import {
    getBreadcrumbsFromUrl,
    getWebIdFromRoot,
    isValidUrl,
    getUsernameFromWebId,
    sortContainments,
    getParentFolderUrl,
} from './url';
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

        test('test sortContainments(urls) should return sorted array', () => {
            const testArray = [
                { value: 'https://example.com/' },
                { value: 'https://example.com/favicon.ico' },
            ];

            expect(sortContainments(testArray)).toStrictEqual([
                ['favicon.ico'],
                ['example.com'],
            ]);
        });

        describe('getParentFolderUrl()', () => {
            test('should return the profile folder url for a webId', () => {
                const webId = 'https://ludwig.owntech.de/profile/card#me';
                expect(getParentFolderUrl(webId)).toBe(
                    'https://ludwig.owntech.de/profile/'
                );
            });
            test('should return a url with a trailing slash', () => {
                const url = 'https://ludwig.owntech.de';
                expect(getParentFolderUrl(url)).toBe(
                    'https://ludwig.owntech.de/'
                );
            });
            test('should only work for valid urls', () => {
                const url = 'ht://ludwig#asdf/';
                expect(() => getParentFolderUrl(url)).toThrow(
                    new Error('Received invalid url: ' + url)
                );
            });
        });

        describe('getWebIdFromRoot()', () => {
            test('Should return webId', () => {
                const rootUrl = 'https://ludwigschubert.solid.community/';
                const webId =
                    'https://ludwigschubert.solid.community/profile/card#me';
                expect(getWebIdFromRoot(rootUrl)).toBe(webId);
            });
            test('Should return webId when rootUrl has no slash in the end', () => {
                const rootUrl = 'https://ludwigschubert.solid.community';
                const webId =
                    'https://ludwigschubert.solid.community/profile/card#me';
                expect(getWebIdFromRoot(rootUrl)).toBe(webId);
            });
            test('Should throw if root is no url', () => {
                const rootUrl = 'ludwigschubert';
                expect(() => getWebIdFromRoot(rootUrl)).toThrow();
            });
        });

        describe('isValidUrl()', () => {
            test('Should return true if url is valid', () => {
                const url = 'https://react.statuscode.com/';
                expect(isValidUrl(url)).toBe(true);
            });
            test('Should return false if url is invalid', () => {
                const url = 'Im not valid';
                expect(isValidUrl(url)).toBe(false);
            });
        });
        describe('getUsernameFromWebId()', () => {
            test('should return username', () => {
                const webId = 'https://ludwigschubert.solid.community';
                expect(getUsernameFromWebId(webId)).toBe('ludwigschubert');
            });
        });

        describe('getSuffixAndPlaceholder(url)', () => {
            test('Should return a placeholder for rename input + fileSuffix if present', () => {
                expect(
                    fileUtils.getSuffixAndPlaceholder(fileUrl)
                ).toStrictEqual({
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

            test('getFileType(regularFileName) should return file type', () => {
                expect(fileUtils.getFileType('fav.ico')).toBe('ico');
            });
            test('getFileType(fileNameWithoutDot) should return null', () => {
                expect(fileUtils.getFileType('fav')).toBeNull();
            });

            test('getFileType(NameWithDotAtTheEnd.) should return null', () => {
                expect(fileUtils.getFileType('fav.')).toBeNull();
            });

            test('convertFilesAndFoldersToArray() should return arrayOfObjects', () => {
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
                expect(fileUtils.getContentType('test.exe.png')).toEqual(
                    'image'
                );
            });

            test('namingConflict() should return false if the there is no conflict', () => {
                expect(
                    fileUtils.namingConflict('hehe', {
                        files: files,
                        folders: folders,
                    })
                ).toBe(false);
            });

            test('namingConflict() should return true if the there is a conflict', () => {
                expect(
                    fileUtils.namingConflict('doge', {
                        files: files,
                        folders: folders,
                    })
                ).toBe(true);
            });
        });
    });
});
