import { setSelection } from './appActions';
import { SET_SELECTION } from './types';

describe('App Actions', () => {
    describe('setSelection', () => {
        it('should create action to set selection', () => {
            const selection = [
                'https://bejow.owntech.de/favicon.ico',
                'https://bejow.owntech.de/profile/',
                'https://bejow.owntech.de/Buttons.svg',
            ];
            const expectedAction = {
                type: SET_SELECTION,
                payload: selection,
            };
            expect(setSelection(selection)).toEqual(expectedAction);
        });
    });
});
