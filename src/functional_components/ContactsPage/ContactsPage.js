import React, { useEffect, useState } from 'react';
import styles from './ContactsPage.module.css';
import { connect } from 'react-redux';
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
    });

    const [displayedRows, setDisplayedRows] = useState(2);
    const contactRecommendationsToDisplay = contactRecommendations.slice(
        0,
        displayedRows * 3
    );

    return (
        <Layout
            label="Contacts"
            className={styles.grid}
            isLoading={loadContacts}
        >
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
                        <div className={styles.recommendLabel}>
                            People you might know:
                        </div>
                        <ContactList
                            onItemClick={(contact) => {
                                setCurrentContact(contact);
                                history.push('/contact');
                            }}
                            contacts={contactRecommendationsToDisplay}
                            webId={webId}
                            addContact={addContact}
                            recommended
                        />
                        {displayedRows * 3 < contactRecommendations.length ? (
                            <div
                                onClick={() =>
                                    setDisplayedRows(displayedRows + 2)
                                }
                                className={styles.showMoreWrapper}
                            >
                                <div className={styles.showMoreLabel}>
                                    Show more
                                </div>
                                <div className={styles.showMoreIcon}>...</div>
                            </div>
                        ) : null}
                    </>
                ) : null}
            </div>
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

export default connect(mapStateToProps, {
    setCurrentContact,
    addContact,
    removeContact,
    fetchContactRecommendations,
})(withRouter(ContactsPage));
