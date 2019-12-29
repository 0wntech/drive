import { setCurrentContact } from './contactActions';
import { user } from '../test/fixtures/user';
import { SET_CURRENT_CONTACT } from './types';

describe('Contact Actions', () => {
    describe('setCurrentContact', () => {
        it('should create action to set currentContact', () => {
            const expectedAction = {
                type: SET_CURRENT_CONTACT,
                payload: user,
            };
            expect(setCurrentContact(user)).toEqual(expectedAction);
        });
    });
});
