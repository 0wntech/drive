import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    addContact,
    removeContact,
    fetchContact,
    setCurrentContact,
} from '../../actions/contactActions';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import { isContact } from '../../reducers/contactReducer';
import { handleError } from '../../utils/helper';
import { getParamsFromUrl, getUsernameFromWebId } from '../../utils/url';
import ProfileView from '../ProfileView/ProfileView';

const ContactProfilePage = ({
    currentContact,
    fetchContact,
    addContact,
    removeContact,
    setCurrentContact,
    webId,
    isContact,
    contacts,
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
    }, []);

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
            defaultIcon={defaultIcon}
            addContact={addContact}
            removeContact={removeContact}
            webId={webId}
        />
    ) : null;
};

ContactProfilePage.propTypes = {
    currentContact: PropTypes.object,
};

const mapStateToProps = (state) => ({
    error: state.contact.error,
    currentContact: state.contact.currentContact,
    contacts: state.contact.contacts,
    webId: state.user.webId,
    isContact:
        state.contact.contacts && state.contact.currentContact
            ? isContact(state.contact, state.contact.currentContact.webId)
            : undefined,
});

export default connect(mapStateToProps, {
    addContact,
    removeContact,
    setCurrentContact,
    fetchContact,
})(ContactProfilePage);
