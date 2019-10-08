import React from 'react';
import KeyValuePair from './KeyValuePair';
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

    it('should render uneditable with multiple values', () => {
        const editable = false;
        const values = ['multiple', 'values', 'test'];
        const tree = TestRenderer.create(
            <KeyValuePair
                editable={editable}
                placeholder={placeholder}
                dataKey={dataKey}
                value={values}
                label={label}
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    xit('should render editable with multiple values', () => {
        const editable = true;
        const values = ['multiple', 'values', 'test'];

        const tree = TestRenderer.create(
            <KeyValuePair
                editable={editable}
                placeholder={placeholder}
                dataKey={dataKey}
                value={values}
                label={label}
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
