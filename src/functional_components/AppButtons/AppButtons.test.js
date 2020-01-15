import TestRenderer from 'react-test-renderer';
import AppButtons from './AppButtons';
import React from 'react';

describe('AppButtons', () => {
    it('should render correct', () => {
        const wrapper = TestRenderer.create(
            <AppButtons
                onArrowClick={jest.fn()}
                onSettingsClick={jest.fn()}
                onFolderClick={jest.fn()}
            />
        );
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});
