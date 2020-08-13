import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    addContact,
    removeContact,
    fetchContact,
    setCurrentContact,
    fetchContacts,
} from '../../actions/contactActions';
import { isContact } from '../../reducers/contactReducer';
import { handleError } from '../../utils/helper';
import { getParamsFromUrl, getUsernameFromWebId } from '../../utils/url';
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
    fetchContacts,
    contacts,
    currentContacts,
    history,
    error,
}) => {
    handleError(error);
    useEffect(() => {
        const currentUser = getParamsFromUrl(window.location.href).u;
        if (!currentContact && contacts) {
            const contactFromContacts = contacts.find(
                (contact) => contact.webId == currentUser
            );
            if (contactFromContacts) setCurrentContact(contactFromContacts);
        } else if (
            !currentContact ||
            (currentContact && currentContact.webId !== currentUser)
        ) {
            fetchContact(currentUser);
        }
        if (!currentContacts) fetchContacts(currentUser);
    }, [currentContacts]);

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
                emails: currentContact.emails[0],
                telephones: currentContact.telephones[0],
            }}
            isContact={isContact}
            addContact={addContact}
            removeContact={removeContact}
            webId={webId}
            contacts={currentContacts}
            navigateToContact={(contact) => {
                setCurrentContact(contact);
                history.push(`/contact?u=${encodeURIComponent(contact.webId)}`);
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
    fetchContacts,
})(withRouter(ContactProfilePage));
