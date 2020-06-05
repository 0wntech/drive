import React from 'react';
import TestRenderer from 'react-test-renderer';
import File from './File';
import { shallow } from 'enzyme';

describe('File', () => {
    test('should render correctly (no image)', () => {
        const currPath = 'https://bejow.solid.community/1234/';
        const onClick = jest.fn();
        const image = 'https://owntech.de/favicon.ico';
        const file = { name: 'Test.png', type: 'image/png' };
        const selectedItem = false;
        const contextMenuOptions = [
            {
                label: 'test',
                onClick: () => {},
                disabled: false,
            },
            {
                label: 'test disabled',
                onClick: () => {},
                disabled: true,
            },
        ];
        const tree = TestRenderer.create(
            <File
                currPath={currPath}
                onClick={onClick}
                image={image}
                file={file}
                selectedItem={selectedItem}
                contextMenuOptions={contextMenuOptions}
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });
    test('should render correctly (image)', () => {
        const currPath = 'https://bejow.solid.community/1234/';
        const onClick = jest.fn();
        const image = 'https://owntech.de/favicon.ico';
        const file = { name: 'Test.png', type: 'image/png' };
        const selectedItem = false;
        const contextMenuOptions = [
            {
                label: 'test',
                onClick: () => {},
                disabled: false,
            },
            {
                label: 'test disabled',
                onClick: () => {},
                disabled: true,
            },
        ];
        const tree = TestRenderer.create(
            <File
                currPath={currPath}
                onClick={onClick}
                image={image}
                file={file}
                selectedItem={selectedItem}
                contextMenuOptions={contextMenuOptions}
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });
    test('Should have slected class if File is selected', () => {
        const currPath = 'https://bejow.solid.community/1234/';
        const onClick = jest.fn();
        const image = 'https://owntech.de/favicon.ico';
        const file = { name: 'Test.png', type: 'image/png' };
        const selectedItem = true;
        const contextMenuOptions = [
            {
                label: 'test',
                onClick: () => {},
                disabled: false,
            },
            {
                label: 'test disabled',
                onClick: () => {},
                disabled: true,
            },
        ];
        const wrapper = shallow(
            <File
                currPath={currPath}
                onClick={onClick}
                image={image}
                file={file}
                selectedItem={selectedItem}
                contextMenuOptions={contextMenuOptions}
            />
        );
        expect(wrapper.find('.selected').length).toBe(1);
    });
});
