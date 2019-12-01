import React from 'react';
import { ProfilePage } from './ProfilePage.js';
import { FETCH_USER_SUCCESS } from '../../actions/types';
import userReducer from '../../reducers/userReducer';
import TestRenderer from 'react-test-renderer';
describe('ProfilePage', () => {
    const user = {
        webId: 'https://bejow.owntech.de/profile/card#me',
        name: 'Ben',
        bio: 'This is bens Bio!',
        picture:
            'https://images-na.ssl-images-amazon.com/images/I/81-yKbVND-L._SY355_.png',
        emails: ['ben.test@owntech.de'],
        job: 'Software Engineer',
        telephones: ['0177313131'],
    };
    describe('ProfilePage Redux', () => {
        // passing undefined to get initial state
        const initialState = userReducer(undefined, {});
        it('receives user', () => {
            const result = userReducer(initialState, {
                type: FETCH_USER_SUCCESS,
                payload: user,
            });

            expect(result).toEqual({
                ...initialState,
                user: user,
            });
        });
    });
    describe('ProfilePage Snapshot', () => {
        it('matches the snapshot', () => {
            const tree = TestRenderer.create(<ProfilePage user={user} />);
            expect(tree.toJSON()).toMatchSnapshot();
        });
    });

    describe('ProfilePage UnitTest', () => {});
});
