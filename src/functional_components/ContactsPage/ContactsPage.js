import React from 'react';
import styles from './ContactsPage.module.css';
import { connect } from 'react-redux';
import { addContact, removeContact } from '../../actions/UserActions';

import ContactList from '../ContactList/ContactsList';

const ContactsPage = ({ contacts, addContact, removeContact, webId }) => {
    return (
        <div className={styles.grid}>
            <div className={styles.toolbarArea}>
                <div className={styles.toolbarTitle}>Contacts</div>
            </div>
            <div className={styles.contactsContainer}>
                <ContactList contacts={contacts} />
                {/* <div
                    onClick={() =>
                        addContact(
                            webId,
                            'https://ludwigschubert.solid.community/profile/card#me'
                        )
                    }
                >
                    add
                </div> */}
            </div>
        </div>
    );
};

ContactsPage.propTypes = {};

const mapStateToProps = (state) => ({
    contacts: state.app.contacts,
    webId: state.app.webId,
});

export default connect(
    mapStateToProps,
    { addContact, removeContact }
)(ContactsPage);
