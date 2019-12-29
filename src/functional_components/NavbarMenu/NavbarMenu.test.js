/* eslint-disable quotes */
import React from 'react';
import { NavbarMenu } from './NavbarMenu';
import TestRenderer from 'react-test-renderer';
import { user } from '../../test/fixtures/user';

describe('NavbarMenu', () => {
    test('Should render correctly', () => {
        const className = 'test';
        const wrapper = TestRenderer.create(
            <NavbarMenu className={className} user={user} />
        );
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
    test('Should render login if no webId', () => {
        const className = 'test';

        const wrapper = TestRenderer.create(
            <NavbarMenu className={className} user={null} />
        );
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});
