import { setCurrentContact } from './contactActions';
import { user } from '../../test/fixtures/user';
import { SET_CURRENT_CONTACT } from './types';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Contact Actions', () => {
    describe('setCurrentContact', () => {
        it('should create action to set currentContact', async () => {
            const store = mockStore({});
            const expectedActions = [
                {
                    type: SET_CURRENT_CONTACT,
                    payload: user,
                },
                {
                    type: 'fetch_contacts',
                },
            ];
            await store.dispatch(setCurrentContact(user));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
