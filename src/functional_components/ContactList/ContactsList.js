import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';
import { ContactListItem } from '../ContactListItem';
import { RecommendationItem } from '../RecommendationItem';

const ContactList = ({
    contacts,
    onItemClick,
    webId,
    removeContact,
    addContact,
    recommended,
}) => {
    const renderContact = (contact) => {
        if (recommended) {
            return (
                <RecommendationItem
                    addContact={() => addContact(webId, contact.webId)}
                    onClick={(contact) => {
                        onItemClick(contact);
                    }}
                    contact={contact}
                />
            );
        } else {
            return (
                <ContactListItem
                    removeContact={() => removeContact(webId, contact.webId)}
                    onClick={(contact) => {
                        onItemClick(contact);
                    }}
                    contact={contact}
                />
            );
        }
    };

    return (
        <div className={styles.container}>
            {contacts
                ? contacts.map((contact) => (
                      <div key={contact.webId} className={styles.itemContainer}>
                          {renderContact(contact)}
                      </div>
                  ))
                : null}
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
