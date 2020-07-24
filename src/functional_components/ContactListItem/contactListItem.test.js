import React from 'react';
import TestRenderer from 'react-test-renderer';
import ContactListItem from './ContactListItem';
import { contacts } from '../../../test/fixtures/contacts';
import { shallow } from 'enzyme';
import Add from '../../assets/svgIcons/Add';

describe('ContactListItem', () => {
    test('should render correctly', () => {
        const contact = contacts[0];
        const webId = 'https://bejow.solid.community/profile/card#me';
        const className = 'test';
        const addContact = jest.fn();
        const onClick = jest.fn();

        const tree = TestRenderer.create(
            <ContactListItem
                contact={contact}
                webId={webId}
                className={className}
                addContact={addContact}
                onClick={onClick}
            />
        );
        expect(tree.toJSON()).toMatchSnapshot();
    });

    test('should call addContact', () => {
        const contact = contacts[0];
        const webId = 'https://bejow.solid.community/profile/card#me';
        const className = 'test';
        const addContact = jest.fn();
        const onClick = jest.fn();

        const wrapper = shallow(
            <ContactListItem
                contact={contact}
                webId={webId}
                className={className}
                addContact={addContact}
                onClick={onClick}
            />
        );
        wrapper.find(Add).simulate('click', { stopPropagation: () => {} });
        expect(addContact.mock.calls.length).toEqual(1);
    });

    test('should not call onClick when clicking on addContact', () => {
        const contact = contacts[0];
        const webId = 'https://bejow.solid.community/profile/card#me';
        const className = 'test';
        const addContact = jest.fn();
        const onClick = jest.fn();

        const wrapper = shallow(
            <ContactListItem
                contact={contact}
                webId={webId}
                className={className}
                addContact={addContact}
                onClick={onClick}
            />
        );
        wrapper.find(Add).simulate('click', { stopPropagation: () => {} });
        expect(onClick.mock.calls.length).toEqual(0);
    });

    test('should call onClick', () => {
        const contact = contacts[0];
        const webId = 'https://bejow.solid.community/profile/card#me';
        const className = 'test';
        const addContact = jest.fn();
        const onClick = jest.fn();

        const wrapper = shallow(
            <ContactListItem
                contact={contact}
                webId={webId}
                className={className}
                addContact={addContact}
                onClick={onClick}
            />
        );
        wrapper.find('[data-test-id="contact-picture"]').simulate('click');
        expect(onClick.mock.calls.length).toEqual(1);
    });
});
