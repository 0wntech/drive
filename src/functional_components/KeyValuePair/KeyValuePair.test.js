import React from 'react';
import KeyValuePair from './KeyValuePair';
import { shallow } from 'enzyme';
import TestRenderer from 'react-test-renderer';

describe('KeyValuePair', () => {
    const label = 'Test';
    const value = 'testValue';
    const dataKey = 'testKey';
    const placeholder = 'testPlaceholder';

    it('should render unexpanded', () => {
        const editable = false;
        const tree = TestRenderer.create(
            <KeyValuePair
                placeholder={placeholder}
                dataKey={dataKey}
                value={value}
                label={label}
                editable={editable}
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    it('should render expanded', () => {
        const editable = true;
        const tree = TestRenderer.create(
            <KeyValuePair
                editable={editable}
                placeholder={placeholder}
                dataKey={dataKey}
                value={value}
                label={label}
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    xit('should trigger onClick function on click', () => {
        const mockFunction = jest.fn();
        const wrapper = shallow(
            <KeyValuePair label={label} onClick={mockFunction} />
        );
        wrapper.simulate('click');
        expect(mockFunction).toHaveBeenCalled();
    });
});
