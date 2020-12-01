import { getErrorsFromErrorState } from './helper';

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
});
