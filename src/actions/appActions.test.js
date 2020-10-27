import { setSelection, setCurrentPath, fetchCurrentItem } from './appActions';
import {
    SET_SELECTION,
    SET_CURRENT_PATH,
    FETCH_CURRENT_ITEM,
    FETCH_CURRENT_ITEM_SUCCESS,
    FETCH_CURRENT_ACCESS_CONTROL,
    FETCH_CURRENT_ACCESS_CONTROL_FAILURE,
} from './types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

jest.setTimeout(20000);

const folderFiles = {
    files: [
        { name: 'favicon.ico', type: 'image/vnd.microsoft.icon' },
        { name: 'robots.txt', type: 'text/plain' },
        { name: 'test.txt', type: 'text/plain' },
    ],
    folders: ['.well-known', 'public', 'settings'],
};

const readSuccess = {
    read: () => {
        return new Promise((resolve) => {
            resolve(folderFiles);
        });
    },
};

jest.mock('ownfiles', () => jest.fn());
import PodClient from 'ownfiles';
PodClient.mockImplementation(() => readSuccess);

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
        it('should create actions to set current path, empty selection, fetch items', async () => {
            const path = 'https://bejow.inrupt.net/.well-known/';
            const store = mockStore({
                currentPath: null,
                currentAccessControl: null,
            });
            const expectedActions = [
                {
                    type: SET_CURRENT_PATH,
                    payload: path,
                },
                {
                    type: SET_SELECTION,
                    payload: [],
                },
                {
                    type: FETCH_CURRENT_ITEM,
                },
                {
                    type: FETCH_CURRENT_ACCESS_CONTROL,
                },
                {
                    type: FETCH_CURRENT_ITEM_SUCCESS,
                    payload: folderFiles,
                },
                {
                    type: FETCH_CURRENT_ACCESS_CONTROL_FAILURE,
                },
            ];

            await store.dispatch(setCurrentPath(path));
            expect(store.getActions()).toEqual(expectedActions);
        });
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
                {
                    type: FETCH_CURRENT_ACCESS_CONTROL,
                },
            ];

            const store = mockStore({ currentItem: null, currentPath: null });
            store.dispatch(setCurrentPath(path, { noFetch: true }));
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    describe('fetchCurrentItem', () => {
        it('should set folders and files if fetch succeed', () => {
            const url = 'https://bejow.inrupt.net/.well-known/';
            const store = mockStore({ currentPath: null });

            const expectedActions = [
                {
                    type: FETCH_CURRENT_ITEM,
                },
                {
                    type: FETCH_CURRENT_ITEM_SUCCESS,
                    payload: folderFiles,
                },
            ];
            return store.dispatch(fetchCurrentItem(url)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });
});
