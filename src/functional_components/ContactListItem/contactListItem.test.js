import React from 'react';
import TestRenderer from 'react-test-renderer';
import ContactListItem from './ContactListItem';
import { contacts } from '../../../test/fixtures/contacts';
import { shallow } from 'enzyme';
import Delete from '../../assets/svgIcons/Delete';

describe('ContactListItem', () => {
    test('should render correctly', () => {
        const contact = contacts[0];
        const webId = 'https://bejow.solid.community/profile/card#me';
        const className = 'test';
        const removeContact = jest.fn();
        const onClick = jest.fn();

        const tree = TestRenderer.create(
            <ContactListItem
                contact={contact}
                webId={webId}
                className={className}
                removeContact={removeContact}
                onClick={onClick}
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    test('should call removeContact', () => {
        const contact = contacts[0];
        const webId = 'https://bejow.solid.community/profile/card#me';
        const className = 'test';
        const removeContact = jest.fn();
        const onClick = jest.fn();

        const wrapper = shallow(
            <ContactListItem
                contact={contact}
                webId={webId}
                className={className}
                removeContact={removeContact}
                onClick={onClick}
            />
        );
        wrapper.find(Delete).simulate('click', { stopPropagation: () => {} });
        expect(removeContact.mock.calls.length).toEqual(1);
    });

    test('should not call onClick when clicking on removeContact', () => {
        const contact = contacts[0];
        const webId = 'https://bejow.solid.community/profile/card#me';
        const className = 'test';
        const removeContact = jest.fn();
        const onClick = jest.fn();

        const wrapper = shallow(
            <ContactListItem
                contact={contact}
                webId={webId}
                className={className}
                removeContact={removeContact}
                onClick={onClick}
            />
        );
        wrapper.find(Delete).simulate('click', { stopPropagation: () => {} });
        expect(onClick.mock.calls.length).toEqual(0);
    });

    test('should call onClick', () => {
        const contact = contacts[0];
        const webId = 'https://bejow.solid.community/profile/card#me';
        const className = 'test';
        const removeContact = jest.fn();
        const onClick = jest.fn();

        const wrapper = shallow(
            <ContactListItem
                contact={contact}
                webId={webId}
                className={className}
                removeContact={removeContact}
                onClick={onClick}
            />
        );
        wrapper.simulate('click');
        expect(onClick.mock.calls.length).toEqual(1);
    });
});
