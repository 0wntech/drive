import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import File from './File';
import { shallow } from 'enzyme';

describe('File', () => {
    test('should render correctly (no image)', () => {
        const currentPath = 'https://bejow.solid.community/1234/';
        const onClick = jest.fn();
        const image = 'https://owntech.de/favicon.ico';
        const file = {
            name: 'Test.png',
            url: 'https://test.example.org/Test.png',
            type: 'image/png',
        };
        const selectedItem = false;

        const tree = new ShallowRenderer().render(
            <File
                currentPath={currentPath}
                onClick={onClick}
                image={image}
                file={file}
                selectedItem={selectedItem}
            />
        );
        expect(tree).toMatchSnapshot();
    });
    test('should render correctly (image)', () => {
        const currentPath = 'https://bejow.solid.community/1234/';
        const onClick = jest.fn();
        const image = 'https://owntech.de/favicon.ico';
        const file = {
            name: 'Test.png',
            url: 'https://test.example.org/Test.png',
            type: 'image/png',
        };
        const selectedItem = false;

        const tree = new ShallowRenderer().render(
            <File
                currentPath={currentPath}
                onClick={onClick}
                image={image}
                file={file}
                selectedItem={selectedItem}
            />
        );
        expect(tree).toMatchSnapshot();
    });
    test('Should have slected class if File is selected', () => {
        const currentPath = 'https://bejow.solid.community/1234/';
        const onClick = jest.fn();
        const image = 'https://owntech.de/favicon.ico';
        const file = {
            name: 'Test.png',
            url: 'https://test.example.org/Test.png',
            type: 'image/png',
        };
        const selectedItem = true;

        const wrapper = shallow(
            <File
                currentPath={currentPath}
                onClick={onClick}
                image={image}
                file={file}
                selectedItem={selectedItem}
            />
        );
        expect(wrapper.find('.selected').length).toBe(1);
    });
});
