jest.mock('ownuser', () => jest.fn());

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import User from 'ownuser';
import {
    SET_WEBID,
    SET_CURRENT_CONTACT,
    SET_SELECTION,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
} from './types';
import {
    setWebId,
    setCurrentContact,
    setSelection,
    fetchUser,
} from './UserActions';

import { user } from '../test/fixtures/user';
import { card } from '../test/fixtures/card';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const sampleError = 'test error';

const getProfileSuccess = {
    getProfile: () => {
        return new Promise((resolve, reject) => {
            resolve(card.data);
        });
    },
};

const getProfileFail = {
    getProfile: () => {
        return new Promise((resolve, reject) => {
            reject(sampleError);
        });
    },
};

describe('redux actions', () => {
    describe('sync actions', () => {
        describe('setWebId', () => {
            it('should create action to set webId', () => {
                const webId = 'https://bejow.owntech.de/profile/card#me';
                const expectedAction = {
                    type: SET_WEBID,
                    payload: webId,
                };
                expect(
                    setWebId('https://bejow.owntech.de/profile/card#me')
                ).toEqual(expectedAction);
            });
        });
        describe('setCurrentContact', () => {
            it('should create action to set currentContact', () => {
                const expectedAction = {
                    type: SET_CURRENT_CONTACT,
                    payload: user,
                };
                expect(setCurrentContact(user)).toEqual(expectedAction);
            });
        });
        describe('setSelection', () => {
            it('should create action to set currentContact', () => {
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
    describe('async actions', () => {
        afterEach(() => {
            fetchMock.restore();
        });

        describe('fetchUser', () => {
            it('should create actions when fetching success', () => {
                User.mockImplementation(() => getProfileSuccess);
                const webId = 'https://bejow.owntech.de/profile/card';
                const expextedActions = [
                    { type: FETCH_USER },
                    { type: FETCH_USER_SUCCESS, payload: card.data },
                ];
                const store = mockStore({ user: null });
                return store.dispatch(fetchUser(webId)).then(() => {
                    expect(store.getActions()).toEqual(expextedActions);
                });
            });
            it('should create actions when fetching fail', () => {
                User.mockImplementation(() => getProfileFail);
                const webId = 'https://bejow.owntech.de/profile/card';

                const expextedActions = [
                    { type: FETCH_USER },
                    { type: FETCH_USER_FAIL, payload: sampleError },
                ];
                const store = mockStore({ user: null });
                return store.dispatch(fetchUser(webId)).then(() => {
                    expect(store.getActions()).toEqual(expextedActions);
                });
            });
        });
    });
});
