import React from 'react';
import Window from './Window';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';

describe('Window', () => {
    it('should render correctly', () => {
        const mockFunction = jest.fn();
        const tree = TestRenderer.create(
            <Window
                windowName="Test Window"
                className="chicken"
                onClose={mockFunction}
                visible
            >
                <div>I'm a child</div>
                <button>child button</button>
            </Window>
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should handle the click event', () => {
        const mockFunction = jest.fn();
        const wrapper = shallow(
            <Window
                windowName="Test Window"
                visible
                className="chicken"
                onClose={mockFunction}
            />
        );
        wrapper.find('.close').simulate('click');
        expect(mockFunction.mock.calls.length).toEqual(1);
    });
});
