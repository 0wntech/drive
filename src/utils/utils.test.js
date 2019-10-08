import { getBreadcrumbsFromUrl } from './url';
import fileUtils from './fileUtils';
describe('Testing util functions', () => {
    describe('Testing url utils', () => {
        const url = 'https://www.heise.de/newsticker/it/';
        const emptyUrl = '';
        const invalidUrl = 'ich bin keine url';

        test('getBreadcrumbsfromURL(url) should return Breadcrumbs as array', () => {
            expect(JSON.stringify(getBreadcrumbsFromUrl(url))).toBe(
                JSON.stringify(['/', '/newsticker', '/it'])
            );
        });

        test('test getBreadcrumbsfromURL(url="") should throw', () => {
            expect(() => getBreadcrumbsFromUrl(emptyUrl)).toThrow();
        });

        test('test getBreadcrumbsfromURL(url=invalidUrl) should throw', () => {
            expect(() => getBreadcrumbsFromUrl(invalidUrl)).toThrow();
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
        it('getContentType() returns the correct mime type', () => {
            types.map((test) => {
                expect(fileUtils.getContentType(test.file)).toEqual(
                    test.mimeType
                );
            });
        });
        it('getContentType() handles multiple dots', () => {
            expect(fileUtils.getContentType('test.exe.png')).toEqual('image');
        });
    });
});
