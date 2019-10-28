import React from 'react';
import Drive from './Drive.js';
import TestRenderer from 'react-test-renderer';
import { withRouter } from 'react-router-dom';
import appReducer from '../../reducers/AppReducer.js';
import { FETCH_CURRENT_ITEMS_SUCCESS } from '../../actions/types';

describe('Drive', () => {
    const currentItems = {
        files: ['haha.jpg'],
        folders: ['hehe', 'hihi'],
    };

    describe('Drive Redux', () => {
        const initialState = appReducer(undefined, {});
        it('receives current folder', () => {
            const result = appReducer(initialState, {
                type: FETCH_CURRENT_ITEMS_SUCCESS,
                payload: currentItems,
            });

            expect(result).toStrictEqual({
                ...initialState,
                loadFolder: false,
                currentItems: currentItems,
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
