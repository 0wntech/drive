import React from 'react';
import ProfilePage from './ProfilePage.js';
import { FETCH_USER_SUCCESS } from '../../actions/types';
import userReducer from '../../reducers/userReducer';
import ShallowRenderer from 'react-test-renderer/shallow';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn().mockReturnValue({}),
}));

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
            const result = new ShallowRenderer().render(
                <ProfilePage.WrappedComponent
                    user={user}
                    updatingProfile={false}
                />
            );
            expect(result).toMatchSnapshot();
        });
    });

    describe('ProfilePage UnitTest', () => {});
});
