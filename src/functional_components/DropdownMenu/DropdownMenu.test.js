import React from 'react';
import DropdownMenu from './DropdownMenu';
import TestRenderer from 'react-test-renderer';

describe('DropdownMenu', () => {
    const DROPDOWN_OPTIONS = [
        { onClick: () => console.info('/profile'), label: 'Profile' },
        { onClick: () => console.info('test2'), label: 'Settings*' },
        { onClick: () => console.info('test2'), label: 'Notifications*' },
        { onClick: () => console.info('test2'), label: 'Contacts*' },
        { onClick: () => console.info('test2'), label: 'Logout' },
    ];

    it('should render correctly expanded', () => {
        const mockFunction = jest.fn();
        const menuHead = <p>Test</p>;
        const tree = TestRenderer.create(
            <DropdownMenu
                options={DROPDOWN_OPTIONS}
                isExpanded={true}
                setExpanded={mockFunction}
                menuHead={menuHead}
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render correctly not expanded', () => {
        const mockFunction = jest.fn();
        const tree = TestRenderer.create(
            <DropdownMenu
                options={DROPDOWN_OPTIONS}
                isExpanded={false}
                setExpanded={mockFunction}
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
