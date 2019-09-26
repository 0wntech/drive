import React from 'react';
import BreadcrumbItem from './BreadcrumbItem';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';

describe('BreadcrumbItem', () => {
    it('should render correctly', () => {
        const tree = TestRenderer.create(<BreadcrumbItem label="Test" />);
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should handle the click event', () => {
        const mockFunction = jest.fn();
        const wrapper = shallow(
            <BreadcrumbItem label="Test" onClick={mockFunction} />
        );
        wrapper.simulate('click');
        expect(mockFunction).toHaveBeenCalled();
    });

    xit('renders the label', () => {
        const wrapper = shallow(
            <BreadcrumbItem label="Test" onClick={mockFunction} />
        );
        expect(wrapper.find('.breadcrumb'));
    });
});
