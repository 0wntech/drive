/* eslint-disable quotes */
import React from 'react';
import { NavbarMenu } from './NavbarMenu';
import TestRenderer from 'react-test-renderer';

describe('NavbarMenu', () => {
    test('Should render correctly', () => {
        const className = 'test';

        const user = {
            webId: 'https://bejow.solid.community/profile/card#me',
            name: 'Ben',
            picture: 'https://bejow.solid.community/profile/illuminati.jpg',
            emails: [],
            job: 'Software Engineer',
            bio: "Let's build something great!",
            telephones: [],
        };
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
