// import { shallow } from 'enzyme';
import React from 'react';
import BreadcrumbItem from './BreadcrumbItem';
import { shallow } from 'enzyme';

describe('BreadcrumbItem', () => {
    it('should render correctly', () => {
        const output = shallow(<BreadcrumbItem label="Test" />);
        expect(JSON.stringify(output)).toMatchSnapshot();
    });
    it('should handle the click event', () => {
        const mockFunction = jest.fn();
        const output = shallow(
            <BreadcrumbItem label="Test" onClick={mockFunction} />
        );
        output.simulate('click');
        expect(mockFunction).toHaveBeenCalled();
    });
});
