import { getErrorsFromErrorState, convertArrayToString } from './helper';

describe('Helper Tests', () => {
    describe('getErrorsFromErrorState', () => {
        it('Should return an error array', () => {
            const errorObject = {
                networkError: '404 cannot fetch',
                javascriptError: false,
                brainError: 'Refill coffee',
            };
            const expected = ['404 cannot fetch', 'Refill coffee'];
            expect(JSON.stringify(getErrorsFromErrorState(errorObject))).toBe(
                JSON.stringify(expected)
            );
        });
        it('Should return an empty array if no erros', () => {
            const errorObject = {
                networkError: false,
                javascriptError: false,
                brainError: false,
            };
            const expected = [];
            expect(JSON.stringify(getErrorsFromErrorState(errorObject))).toBe(
                JSON.stringify(expected)
            );
        });
        it('Should return an empty array if undefined', () => {
            const errorObject = undefined;
            const expected = [];
            expect(JSON.stringify(getErrorsFromErrorState(errorObject))).toBe(
                JSON.stringify(expected)
            );
        });
    });
    describe('convertArrayToString', () => {
        it('converts an array to a string', () => {
            const array = ['Put', 'Me', 'Together'];
            const expected = 'Put\nMe\nTogether';
            expect(convertArrayToString(array)).toBe(expected);
        });
        it('converts an empty array to an empty string', () => {
            const array = [];
            const expected = '';
            expect(convertArrayToString(array)).toBe(expected);
        });
        it('returns undefined if object is passed', () => {
            const array = { 1: 'Put', 2: 'Me', 3: 'Together' };
            expect(convertArrayToString(array)).toBeUndefined();
        });
    });
});
