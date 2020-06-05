import React from 'react';
import EditButtons from './EditButtons';
import TestRenderer from 'react-test-renderer';

describe('EditButtons', () => {
    describe('EditButtons Snapshot', () => {
        it('matches the snapshot', () => {
            const tree = TestRenderer.create(<EditButtons />);
            expect(tree.toJSON()).toMatchSnapshot();
        });
    });
});
