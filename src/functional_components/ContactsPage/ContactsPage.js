import React, { useEffect } from 'react';
import styles from './ContactsPage.module.css';
import { connect } from 'react-redux';
import { ClassicSpinner } from 'react-spinners-kit';
import { withRouter } from 'react-router-dom';
import {
    setCurrentContact,
    addContact,
    removeContact,
    fetchContactRecommendations,
} from '../../actions/contactActions';

import ContactList from '../ContactList/ContactsList';
import { Layout } from '../Layout';

const ContactsPage = ({
    contacts,
    addContact,
    loadContacts,
    webId,
    setCurrentContact,
    contactRecommendations,
    removeContact,
    history,
    fetchContactRecommendations,
}) => {
    useEffect(() => {
        fetchContactRecommendations(webId);
    }, []);

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
                    {contactRecommendations ? (
                        <>
                            <div>People you might know:</div>
                            <ContactList
                                onItemClick={(contact) => {
                                    setCurrentContact(contact);
                                    history.push('/contact');
                                }}
                                contacts={contactRecommendations}
                                webId={webId}
                                removeContact={removeContact}
                            />
                        </>
                    ) : (
                        <div>People you might know:</div>
                    )}
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
    contactRecommendations: state.contact.contactRecommendations,
});

export default connect(
    mapStateToProps,
    {
        setCurrentContact,
        addContact,
        removeContact,
        fetchContactRecommendations,
    }
)(withRouter(ContactsPage));
