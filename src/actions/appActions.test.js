import { setSelection, setCurrentPath, fetchCurrentItem } from './appActions';
import {
    SET_SELECTION,
    SET_CURRENT_PATH,
    FETCH_CURRENT_ITEM,
    FETCH_CURRENT_ITEM_SUCCESS,
} from './types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const folderFiles = {
    files: ['favicon.ico', 'robots.txt', 'test.txt'],
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
        it('should create actions to set current path, empty selection, fetch items', () => {
            const path = 'https://bejow.inrupt.net/.well-known/';
            const store = mockStore({ currentPath: null });
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
                    type: FETCH_CURRENT_ITEM_SUCCESS,
                    payload: folderFiles,
                },
            ];

            return store.dispatch(setCurrentPath(path)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
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
