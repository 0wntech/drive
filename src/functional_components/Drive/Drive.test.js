jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn().mockReturnValue({}),
}));

import React from 'react';
import Drive from './Drive.js';
import ShallowRenderer from 'react-test-renderer/shallow';
import appReducer from '../../reducers/appReducer.js';
import { FETCH_CURRENT_ITEM_SUCCESS } from '../../actions/types';

describe('Drive', () => {
    const currentItem = {
        files: ['haha.jpg'],
        folders: ['hehe', 'hihi'],
    };

    describe('Drive Redux', () => {
        const initialState = appReducer(undefined, {});
        it('receives current folder', () => {
            const result = appReducer(initialState, {
                type: FETCH_CURRENT_ITEM_SUCCESS,
                payload: currentItem,
            });

            expect(result).toStrictEqual({
                ...initialState,
                loadCurrentItem: false,
                currentItem: currentItem,
            });
        });
    });

    describe('Drive Snapshot', () => {
        it('matches the snapshot', () => {
            const result = new ShallowRenderer().render(
                <Drive.WrappedComponent
                    currentItem={currentItem}
                    rootUrl={'https://tester.owntech.de/'}
                    currentPath={'https://tester.owntech.de/'}
                    webId={'https://tester.owntech.de/profile/card#me'}
                />
            );
            expect(result).toMatchSnapshot();
        });
    });
});
