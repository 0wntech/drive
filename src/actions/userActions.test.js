jest.mock('webql-client', () => ({
    Graphs: jest.fn(),
}));

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Graphs } from 'webql-client';
import {
    SET_WEBID,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    FETCH_CONTACTS,
} from './types';
import { fetchUser, setWebId } from './userActions';

import { card } from '../../test/fixtures/card';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const sampleError = 'test error';

const getProfileSuccess = {
    load: () => {
        return new Promise((resolve, reject) => {
            resolve({ ['#me']: card.data });
        });
    },
};

const getProfileFail = {
    load: () => {
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
                expect(setWebId(webId)).toEqual(expectedAction);
            });
        });
    });
    describe('async actions', () => {
        describe('fetchUser', () => {
            it('should create actions when fetching success', () => {
                Graphs.mockImplementation(() => getProfileSuccess);
                const webId = 'https://bejow.owntech.de/profile/card#me';
                const expextedActions = [
                    { type: FETCH_USER },
                    { type: FETCH_USER_SUCCESS, payload: card.user },
                    { type: FETCH_CONTACTS },
                ];
                const store = mockStore({ user: null });
                return store.dispatch(fetchUser(webId)).then(() => {
                    expect(store.getActions()).toEqual(expextedActions);
                });
            });
            it('should create actions when fetching fail', () => {
                Graphs.mockImplementation(() => getProfileFail);
                const webId = 'https://bejow.owntech.de/profile/card#me';

                const expextedActions = [
                    { type: FETCH_USER },
                    { type: FETCH_USER_FAILURE, payload: sampleError },
                ];
                const store = mockStore({ user: null });
                return store.dispatch(fetchUser(webId)).then(() => {
                    expect(store.getActions()).toEqual(expextedActions);
                });
            });
        });
    });
});
