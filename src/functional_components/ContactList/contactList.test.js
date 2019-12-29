import React from 'react';
import TestRenderer from 'react-test-renderer';
import ContactList from './ContactsList';
import { contacts } from '../../test/fixtures/contacts';

describe('ContactList', () => {
    test('should render correctly', () => {
        const tree = TestRenderer.create(<ContactList contacts={contacts} />);
        expect(tree.toJSON()).toMatchSnapshot();
    });
});
