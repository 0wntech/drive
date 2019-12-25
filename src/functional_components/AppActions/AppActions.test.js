import TestRenderer from 'react-test-renderer';
import AppActions from './AppActions';
import React from 'react';

describe('AppActions', () => {
    it('should render correct', () => {
        const wrapper = TestRenderer.create(
            <AppActions
                onArrowClick={jest.fn()}
                onSettingsClick={jest.fn()}
                onFolderClick={jest.fn()}
            />
        );
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});
