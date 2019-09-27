import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';
import { ContactListItem } from '../ContactListItem';

const ContactList = ({ contacts, onItemClick }) => {
    return (
        <div className={styles.container}>
            {contacts
                ? contacts.map((contact) => (
                      <div className={styles.itemContainer}>
                          <ContactListItem
                              onClick={onItemClick}
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
    onItemClick: PropTypes.func(PropTypes.func),
};

export default ContactList;
