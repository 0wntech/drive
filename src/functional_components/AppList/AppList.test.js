import TestRenderer from 'react-test-renderer';
import AppList from './AppList';
import React from 'react';
import { apps } from '../../../test/fixtures/apps';

describe('AppList', () => {
    it('should render correct', () => {
        const wrapper = TestRenderer.create(
            <AppList apps={apps} className="testClass" />
        );
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});
