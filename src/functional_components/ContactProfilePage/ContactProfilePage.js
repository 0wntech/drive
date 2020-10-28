import React, { useEffect } from 'react';
import url from 'url';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    addContact,
    removeContact,
    fetchContact,
    setCurrentContact,
    fetchContactProfiles,
} from '../../actions/contactActions';
import { isContact } from '../../reducers/contactReducer';
import { handleError } from '../../utils/helper';
import {
    useParamsFromUrl,
    getUsernameFromWebId,
    getWebIdFromRoot,
} from '../../utils/url';
import ProfileView from '../ProfileView/ProfileView';
import { withRouter } from 'react-router-dom';

const ContactProfilePage = ({
    currentContact,
    fetchContact,
    addContact,
    removeContact,
    setCurrentContact,
    webId,
    isContact,
    contacts,
    loadContacts,
    currentContacts,
    history,
    error,
}) => {
    handleError(error);
    const { id: currentContactHost } = useParamsFromUrl();
    const currentContactWebId = getWebIdFromRoot(
        url.format({
            protocol: 'https',
            host: currentContactHost,
        })
    );

    useEffect(() => {
        if (!currentContact && contacts) {
            const contactFromContacts = contacts.find(
                (contact) => contact.webId === currentContactWebId
            );
            if (contactFromContacts) setCurrentContact(contactFromContacts);
        } else if (
            !currentContact ||
            (currentContact && currentContact.webId !== currentContactWebId)
        ) {
            fetchContact(currentContactWebId);
        }
    }, [currentContactHost, currentContacts]);

    return currentContact ? (
        <ProfileView
            label={
                currentContact.name
                    ? currentContact.name
                    : getUsernameFromWebId(currentContact.webId)
            }
            user={currentContact}
            userData={{
                ...currentContact,
                emails: currentContact.emails && currentContact.emails[0],
                telephones:
                    currentContact.telephones && currentContact.telephones[0],
            }}
            isContact={isContact}
            addContact={addContact}
            removeContact={removeContact}
            webId={webId}
            contacts={currentContacts}
            loadingContacts={loadContacts}
            navigateToContact={(contact) => {
                history.push(
                    `/contact/${encodeURIComponent(
                        url.parse(contact.webId).host
                    )}`
                );
                setCurrentContact(contact);
            }}
        />
    ) : null;
};

ContactProfilePage.propTypes = {
    currentContact: PropTypes.object,
};

const mapStateToProps = (state) => ({
    error: state.contact.error,
    currentContact: state.contact.currentContact,
    loadContacts: state.contact.loadContacts,
    contacts: state.contact.contacts,
    currentContacts: state.contact.currentContacts,
    webId: state.user.webId,
    isContact:
        state.contact.contacts && state.contact.currentContact
            ? isContact(
                  state.contact.contacts,
                  state.contact.currentContact.webId
              )
            : undefined,
});

export default connect(mapStateToProps, {
    addContact,
    removeContact,
    setCurrentContact,
    fetchContact,
    fetchContactProfiles,
})(withRouter(ContactProfilePage));
