import { setSelection, setCurrentPath } from './appActions';
import {
    SET_SELECTION,
    SET_CURRENT_PATH,
    FETCH_CURRENT_ITEM_SUCCESS,
} from './types';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

    describe('setCurrentPath', () => {
        it('should set the path and currentItem without fetching when receiving an image path', () => {
            const path = 'https://bejow.owntech.de/favicon.ico';
            const expectedActions = [
                {
                    payload: 'https://bejow.owntech.de/favicon.ico',
                    type: SET_CURRENT_PATH,
                },
                { payload: [], type: SET_SELECTION },
                {
                    payload: {
                        body: '',
                        url: 'https://bejow.owntech.de/favicon.ico',
                    },
                    type: FETCH_CURRENT_ITEM_SUCCESS,
                },
            ];

            const store = mockStore({ currentItem: null, currentPath: null });
            store.dispatch(setCurrentPath(path, { noFetch: true }));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
