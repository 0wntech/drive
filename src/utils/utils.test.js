import ns from 'solid-namespace';
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
            const items = [
                {
                    url: 'https://example.com/test.lol',
                    types: [ns().ldp('Resource')],
                },
                {
                    url: 'https://example.com/broken',
                    types: [ns().ldp('Resource')],
                },
                {
                    url: 'https://example.com/noDot',
                    types: [ns().ldp('Resource')],
                },
                {
                    url: 'https://example.com/doge',
                    types: [ns().ldp('Container')],
                },
                {
                    url: 'https://example.com/muchTest',
                    types: [ns().ldp('Container')],
                },
            ];

            const files = [
                {
                    name: 'test.lol',
                },
                {
                    name: 'broken',
                },
                {
                    name: 'noDot',
                },
            ];

            const folders = ['doge', 'muchTest'];

            test('getFileType(regularFileName) should return file type', () => {
                expect(fileUtils.getFileType('fav.ico')).toBe('ico');
            });
            test('getFileType(fileNameWithoutDot) should return null', () => {
                expect(fileUtils.getFileType('fav')).toBeNull();
            });

            test('getFileType(NameWithDotAtTheEnd.) should return null', () => {
                expect(fileUtils.getFileType('fav.')).toBeNull();
            });

            test('convertResourceListToSearchOptions() should return arrayOfObjects', () => {
                const converted = fileUtils.convertResourceListToSearchOptions({
                    items: [...items],
                });
                expect(converted.length).toBe(5);
                expect(converted).toContainObject({
                    name: 'test.lol',
                    fileType: 'lol',
                    type: 'file',
                });
                expect(converted).toContainObject({
                    fileType: null,
                    host: 'example.com',
                    name: 'broken',
                    path: 'https://example.com/broken',
                    type: 'file',
                });
                expect(converted).toContainObject({
                    fileType: null,
                    host: 'example.com',
                    name: 'noDot',
                    path: 'https://example.com/noDot',
                    type: 'file',
                });
                expect(converted).toContainObject({
                    host: 'example.com',
                    name: 'doge',
                    path: 'https://example.com/doge/',
                    type: 'folder',
                });
                expect(converted).toContainObject({
                    host: 'example.com',
                    name: 'muchTest',
                    path: 'https://example.com/muchTest/',
                    type: 'folder',
                });
            });

            test('namingConflict() should return false if the there is no conflict', () => {
                expect(
                    fileUtils.namingConflict('hehe', {
                        files: files,
                        folders: folders,
                    })
                ).toBe(false);
            });

            test.only('namingConflict() should return true if the there is a conflict', () => {
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
