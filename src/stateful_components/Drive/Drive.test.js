import React from 'react';
import Drive from './Drive.js';
import TestRenderer from 'react-test-renderer';
import { withRouter } from 'react-router-dom';
import appReducer from '../../reducers/AppReducer.js';
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

        describe('Drive Snapshot', () => {
            it('matches the snapshot', () => {
                const tree = TestRenderer.create(withRouter(<Drive />));
                expect(tree.toJSON()).toMatchSnapshot();
            });
        });
    });
});
