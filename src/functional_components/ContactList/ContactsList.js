import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ContactList.module.scss';
import { ContactListItem } from '../ContactListItem';

const ContactList = ({
    contacts,
    onItemClick,
    webId,
    removeContact,
    addContact,
    isContact,
    removable,
}) => {
    const renderContact = (contact) => {
        return (
            <ContactListItem
                addContact={() => addContact(webId, contact)}
                onClick={(contact) => {
                    onItemClick(contact);
                }}
                contact={contact}
                removeContact={() => removeContact(webId, contact)}
                isContact={isContact}
                removable={removable}
            />
        );
    };

    return (
        <div
            className={classNames(styles.container, {
                [styles.empty]: !contacts || contacts.length === 0,
            })}
        >
            {contacts && contacts.length > 0 ? (
                contacts.map((contact) => (
                    <div key={contact.webId} className={styles.itemContainer}>
                        {renderContact(contact)}
                    </div>
                ))
            ) : (
                <div className={styles.emptyMessage}>
                    You don't have any contacts yet. Try searching for a contact
                    through the search bar.
                </div>
            )}
        </div>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    onItemClick: PropTypes.func,
    webId: PropTypes.string,
    removeContact: PropTypes.func,
};

export default ContactList;
