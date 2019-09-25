import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';
import { ContactListItem } from '../ContactListItem';

const ContactList = ({ contacts }) => {
    return (
        <div className={styles.container}>
            {contacts
                ? contacts.map((contact) => (
                      <div className={styles.itemContainer}>
                          <ContactListItem contact={contact} />
                      </div>
                  ))
                : null}
        </div>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
};

export default ContactList;
