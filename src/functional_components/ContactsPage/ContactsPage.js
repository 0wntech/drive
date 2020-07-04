import React, { useEffect, useState } from 'react';
import styles from './ContactsPage.module.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    setCurrentContact,
    addContact,
    removeContact,
    fetchContactRecommendations,
    fetchContacts,
} from '../../actions/contactActions';
import ContactList from '../ContactList/ContactsList';
import { Layout } from '../Layout';
import { handleError } from '../../utils/helper';
import { getContactRoute } from '../../utils/url';

const ContactsPage = ({
    contacts,
    addContact,
    loadContacts,
    fetchContacts,
    webId,
    setCurrentContact,
    contactRecommendations,
    removeContact,
    history,
    fetchContactRecommendations,
    error,
}) => {
    useEffect(() => {
        if (!contacts) fetchContacts(webId);
        if (!contactRecommendations) fetchContactRecommendations(webId);
    }, []);

    handleError(error);

    const [displayedRows, setDisplayedRows] = useState(2);
    const contactRecommendationsToDisplay =
        contactRecommendations &&
        contactRecommendations.slice(0, displayedRows * 5);

    return (
        <Layout
            label="Contacts"
            className={styles.grid}
            isLoading={loadContacts}
        >
            <div className={styles.contactsContainer}>
                <div className={styles.sectionLabel}>Your Contacts:</div>
                <ContactList
                    onItemClick={(contact) => {
                        setCurrentContact(contact);
                        history.push(getContactRoute(contact));
                    }}
                    contacts={contacts}
                    webId={webId}
                    removeContact={removeContact}
                    alreadyContacts
                />
                {contactRecommendations ? (
                    <>
                        <div className={styles.sectionLabel}>
                            People you might know:
                        </div>
                        <ContactList
                            onItemClick={(contact) => {
                                setCurrentContact(contact);
                                history.push(getContactRoute(contact));
                            }}
                            contacts={contactRecommendationsToDisplay}
                            webId={webId}
                            addContact={addContact}
                            recommended
                            removeContact={removeContact}
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
    error: state.contact.error,
});

export default connect(mapStateToProps, {
    setCurrentContact,
    addContact,
    removeContact,
    fetchContacts,
    fetchContactRecommendations,
})(withRouter(ContactsPage));
