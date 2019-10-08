import React from 'react';
import ActionButton from './ActionButton';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';

describe('ActionButton', () => {
    const label = 'TestButton';

    it('should render default', () => {
        const mockFunction = jest.fn();

        const tree = TestRenderer.create(
            <ActionButton onClick={mockFunction} label={label} />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render blue small button', () => {
        const color = 'blue';
        const size = 'sm';
        const mockFunction = jest.fn();

        const tree = TestRenderer.create(
            <ActionButton
                label={label}
                onClick={mockFunction}
                size={size}
                color={color}
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render medium sized button', () => {
        const mockFunction = jest.fn();

        const size = 'md';
        const tree = TestRenderer.create(
            <ActionButton label={label} onClick={mockFunction} size={size} />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should trigger onClick function on click', () => {
        const mockFunction = jest.fn();
        const wrapper = shallow(
            <ActionButton label={label} onClick={mockFunction} />
        );
        wrapper.simulate('click');
        expect(mockFunction).toHaveBeenCalled();
    });
});
