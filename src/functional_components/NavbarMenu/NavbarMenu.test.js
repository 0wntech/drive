import React from 'react';

import { NavbarMenu } from './NavbarMenu';
import TestRenderer from 'react-test-renderer';

describe('NavbarMenu', () => {
    test('Should render correctly', () => {
        const className = 'test';
        const webId = 'https://bejow.solid.community/profile/card#me';
        const picture =
            'https://bejow.solid.community/profile/meme_ben_gang.jpg';
        const username = 'Ben';
        const onLogout = jest.fn();
        const wrapper = TestRenderer.create(
            <NavbarMenu
                className={className}
                webId={webId}
                picture={picture}
                username={username}
                onLogout={onLogout}
            />
        );
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
    test('Should render login if no webId', () => {
        const className = 'test';
        const webId = null;
        const picture =
            'https://bejow.solid.community/profile/meme_ben_gang.jpg';
        const username = 'Ben';
        const onLogout = jest.fn();
        const wrapper = TestRenderer.create(
            <NavbarMenu
                className={className}
                webId={webId}
                picture={picture}
                username={username}
                onLogout={onLogout}
            />
        );
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
});
