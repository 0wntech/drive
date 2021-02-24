import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import url from 'url';
import styles from './ProfilePage.module.scss';
import {
    updateProfile,
    changeProfilePhoto,
    fetchUser,
} from '../../actions/userActions';
import ActionButton from '../ActionButton/ActionButton';
import { handleError } from '../../utils/helper';
import ProfileView from '../ProfileView/ProfileView';
import {
    fetchContact,
    fetchContactProfiles,
    setCurrentContact,
    addContact,
    removeContact,
} from '../../actions/contactActions';
import { withRouter } from 'react-router-dom';
import { getProfileRoute, useParamsFromUrl } from '../../utils/url';
import { isContact } from '../../reducers/contactReducer';

export const ProfilePage = ({
    user,
    changeProfilePhoto,
    updateProfile,
    updatingProfile,
    error,
    webId,
    loadUser,
    contacts,
    currentContacts,
    loadContacts,
    loadCurrentContact,
    fetchContact,
    setCurrentContact,
    addContact,
    removeContact,
    isContact,
    history,
    currentContact,
    contactRecommendations,
}) => {
    const { id } = useParamsFromUrl();
    handleError(error);
    const ownProfile = !id || id === url.parse(webId).host;
    useEffect(() => {
        if (ownProfile) {
            if (!user && !loadUser) {
                fetchUser(webId);
            } else if (!contacts && !loadContacts) {
                fetchContactProfiles(user.contacts, webId);
            }
        } else {
            setUserData(undefined);
            const contactWebId = url.format({
                protocol: 'https:',
                host: id,
                pathname: '/profile/card',
                hash: '#me',
            });
            if (
                (!currentContact || currentContact.webId !== contactWebId) &&
                !loadCurrentContact
            ) {
                fetchContact(contactWebId);
            }
        }
    }, [
        id,
        currentContact,
        isContact,
        contacts,
        fetchContact,
        loadContacts,
        loadCurrentContact,
        loadUser,
        ownProfile,
        user,
        webId,
    ]);

    const userProfile =
        ownProfile && user ? user : currentContact ? currentContact : undefined;
    const profile = userProfile
        ? {
              ...userProfile,
              emails: userProfile.emails ? userProfile.emails[0] : undefined,
              telephones: userProfile.telephones
                  ? userProfile.telephones[0]
                  : undefined,
              bio: Array.isArray(userProfile.bio)
                  ? userProfile.bio[0]
                  : userProfile.bio,
          }
        : undefined;
    const [userData, setUserData] = useState(ownProfile ? profile : undefined);
    const [editState, setEditState] = useState(false);

    const updateUserData = (key, value) => {
        setUserData({ ...userData, [key]: value });
    };

    const onCancel = () => {
        setEditState(false);
        setUserData({
            ...user,
            emails:
                !!user?.emails && user?.emails.length > 0
                    ? user.emails[0] ?? undefined
                    : undefined,
            telephones:
                !!user?.telephones && user?.telephones.length > 0
                    ? user.telephones[0] ?? undefined
                    : undefined,
        });
    };

    const onSubmit = () => {
        setEditState(false);
        if (JSON.stringify(userData) !== JSON.stringify(user))
            updateProfile(userData, user.webId);
    };

    const onPhotoChange = (e) => {
        changeProfilePhoto(e, user.webId);
    };

    const renderEditButtons = () => {
        if (editState) {
            return (
                <div className={styles.editButtons}>
                    <ActionButton
                        className={styles.actionButton}
                        onClick={onCancel}
                        label="Cancel"
                        size="lg"
                        type="danger"
                        dataId="edit-cancel"
                    />
                    <ActionButton
                        className={styles.actionButton}
                        onClick={onSubmit}
                        label="Save"
                        size="lg"
                        type="confirm"
                        dataId="edit-submit"
                    />
                </div>
            );
        } else {
            return (
                <ActionButton
                    onClick={() => setEditState(!editState)}
                    size="md"
                    type="secondary"
                    className={styles.editButton}
                    label="Edit Profile"
                    dataId="edit"
                />
            );
        }
    };

    return (
        <ProfileView
            label="Profile"
            user={profile}
            webId={webId}
            addContact={addContact}
            removeContact={removeContact}
            isContact={isContact}
            contacts={ownProfile ? contacts : currentContacts}
            error={error}
            renderButtons={renderEditButtons}
            onPhotoChange={onPhotoChange}
            updateUserData={updateUserData}
            editState={editState}
            userData={userData || profile}
            loading={updatingProfile || loadCurrentContact || loadContacts}
            contactRecommendations={contactRecommendations}
            navigateToContact={(contact) => {
                setCurrentContact(contact);
                history.push(getProfileRoute(contact));
            }}
        />
    );
};

const mapStateToProps = (state) => ({
    user: state.user.user,
    updatingProfile: state.user.updatingProfile,
    error: state.user.error ?? state.contact.error,
    webId: state.user.webId,
    loadUser: state.user.loadUser,
    contacts: state.contact.contacts,
    loadContacts: state.contact.loadContacts,
    loadCurrentContact: state.contact.loadCurrentContact,
    currentContact: state.contact.currentContact,
    currentContacts: state.contact.currentContacts,
    contactRecommendations: state.contact.contactRecommendations,
    isContact:
        state.contact.contacts && state.contact.currentContact
            ? isContact(
                  state.contact.contacts,
                  state.contact.currentContact.webId
              )
            : undefined,
});

export default connect(mapStateToProps, {
    updateProfile,
    changeProfilePhoto,
    fetchUser,
    fetchContact,
    addContact,
    removeContact,
    setCurrentContact,
})(withRouter(ProfilePage));
