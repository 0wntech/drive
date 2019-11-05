import React from 'react';
import styles from './ContactsPage.module.css';
import { connect } from 'react-redux';
import { ClassicSpinner } from 'react-spinners-kit';
import { withRouter } from 'react-router-dom';
import {
    setCurrentContact,
    addContact,
    removeContact,
} from '../../actions/contactActions';

import ContactList from '../ContactList/ContactsList';
import { Layout } from '../Layout';

const ContactsPage = ({
    contacts,
    addContact,
    loadContacts,
    webId,
    setCurrentContact,
    removeContact,
    history,
}) => {
    return (
        <Layout label="Contacts" className={styles.grid}>
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
                        onItemClick={(contact) => {
                            setCurrentContact(contact);
                            history.push('/contact');
                        }}
                        contacts={contacts}
                        webId={webId}
                        removeContact={removeContact}
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
        </Layout>
    );
};

ContactsPage.propTypes = {};

const mapStateToProps = (state) => ({
    contacts: state.contact.contacts,
    webId: state.user.webId,
    loadContacts: state.contact.loadContacts,
});

export default connect(
    mapStateToProps,
    { setCurrentContact, addContact, removeContact }
)(withRouter(ContactsPage));
