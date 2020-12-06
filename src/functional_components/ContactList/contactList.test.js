import React from 'react';
import TestRenderer from 'react-test-renderer';
import ContactList from './ContactList';
import { contacts } from '../../../test/fixtures/contacts';

describe('ContactList', () => {
    test('should render correctly', () => {
        const tree = TestRenderer.create(<ContactList contacts={contacts} />);
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
