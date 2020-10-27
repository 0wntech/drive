import React, { useEffect, useState } from 'react';
import styles from './ContactsPage.module.scss';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    setCurrentContact,
    addContact,
    removeContact,
    fetchContactRecommendations,
    fetchContactProfiles,
} from '../../actions/contactActions';
import ContactList from '../ContactList/ContactsList';
import useWindowDimension from '../../hooks/useWindowDimension';
import { screen_l as screenL } from '../../styles/constants.scss';
import { Layout } from '../Layout';
import { handleError } from '../../utils/helper';
import { getContactRoute } from '../../utils/url';

const ContactsPage = ({
    contacts,
    addContact,
    loadContacts,
    fetchContactProfiles,
    webId,
    user,
    setCurrentContact,
    contactRecommendations,
    loadContactRecommendations,
    removeContact,
    history,
    fetchContactRecommendations,
    error,
}) => {
    useEffect(() => {
        if (!contacts && !loadContacts && user.contacts)
            fetchContactProfiles(user.contacts);
        if (!contactRecommendations && !loadContactRecommendations)
            fetchContactRecommendations(webId);
    }, []);

    const { width } = useWindowDimension();

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
            hideToolbar={width < screenL}
        >
            <div className={styles.contactsContainer}>
                <ContactList
                    onItemClick={(contact) => {
                        setCurrentContact(contact);
                        history.push(getContactRoute(contact));
                    }}
                    contacts={contacts}
                    webId={webId}
                    addContact={addContact}
                    removeContact={removeContact}
                    alreadyContacts
                />
                {contactRecommendations ? (
                    <>
                        <div className={styles.sectionLabel}>
                            People you might know
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
    user: state.user.user,
    loadContacts: state.contact.loadContacts,
    contactRecommendations: state.contact.contactRecommendations,
    loadContactRecommendations: state.contact.loadContactRecommendations,
    error: state.contact.error,
});

export default connect(mapStateToProps, {
    setCurrentContact,
    addContact,
    removeContact,
    fetchContactProfiles,
    fetchContactRecommendations,
})(withRouter(ContactsPage));
