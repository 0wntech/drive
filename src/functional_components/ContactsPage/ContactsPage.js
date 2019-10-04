import React from 'react';
import styles from './ContactsPage.module.css';
import { connect } from 'react-redux';
import { addContact, setCurrentContact } from '../../actions/UserActions';
import { ClassicSpinner } from 'react-spinners-kit';

import ContactList from '../ContactList/ContactsList';

const ContactsPage = ({
    contacts,
    addContact,
    loadContacts,
    webId,
    setCurrentContact,
}) => {
    return (
        <div className={styles.grid}>
            <div className={styles.toolbarArea}>
                <div className={styles.toolbarTitle}>Contacts</div>
            </div>
            {loadContacts ? (
                <div className={styles.spinner}>
                    <ClassicSpinner
                        size={30}
                        color="#686769"
                        loading={loadContacts}
                    />
                </div>
            ) : (
                <div className={styles.contactsContainer}>
                    <ContactList
                        onItemClick={setCurrentContact}
                        contacts={contacts}
                    />
                    <button
                        onClick={() =>
                            addContact(
                                webId,
                                'https://ludwigschubert.solid.community/profile/card#me'
                            )
                        }
                    >
                        add
                    </button>
                </div>
            )}
        </div>
    );
};

ContactsPage.propTypes = {};

const mapStateToProps = (state) => ({
    contacts: state.app.contacts,
    webId: state.app.webId,
    loadContacts: state.app.loadContacts,
});

export default connect(
    mapStateToProps,
    { setCurrentContact, addContact }
)(ContactsPage);
