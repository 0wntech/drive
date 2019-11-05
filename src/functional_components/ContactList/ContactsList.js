import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';
import { ContactListItem } from '../ContactListItem';

const ContactList = ({ contacts, onItemClick, webId, removeContact }) => {
    console.log(contacts);
    return (
        <div className={styles.container}>
            {contacts
                ? contacts.map((contact) => (
                      <div className={styles.itemContainer}>
                          <ContactListItem
                              removeContact={() =>
                                  removeContact(webId, contact.webId)
                              }
                              onClick={(contact) => {
                                  onItemClick(contact);
                              }}
                              contact={contact}
                          />
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
