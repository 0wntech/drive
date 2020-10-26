import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import url from 'url';
import styles from './ProfilePage.module.scss';
import {
    updateProfile,
    changeProfilePhoto,
    fetchUser,
} from '../../actions/userActions';
import EditIcon from '../../assets/svgIcons/Edit';
import ActionButton from '../ActionButton/ActionButton';
import { handleError } from '../../utils/helper';
import ProfileView from '../ProfileView/ProfileView';
import { fetchContactProfiles, setCurrentContact } from '../../actions/contactActions';
import { withRouter } from 'react-router-dom';

export const ProfilePage = ({
    user,
    changeProfilePhoto,
    updateProfile,
    updatingProfile,
    error,
    webId,
    loadUser,
    contacts,
    loadContacts,
    fetchContactProfiles,
    setCurrentContact,
    history,
}) => {
    handleError(error);
    useEffect(() => {
        if (!user && !loadUser && webId) {
            fetchUser(webId);
        } else if (!contacts && !loadContacts && !user) {
            fetchContactProfiles(user.contacts, webId);
        }
    }, []);

    const [userData, setUserData] = useState({
        ...user,
        emails: user.emails[0],
        telephones: user.telephones[0],
    });
    const [editState, setEditState] = useState(false);

    const updateUserData = (key, value) => {
        setUserData({ ...userData, [key]: value });
    };

    const onCancel = () => {
        setEditState(false);
        setUserData({
            ...user,
            emails: user.emails[0],
            telephones: user.telephones[0],
        });
    };

    const onSubmit = () => {
        setEditState(false);
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
                        color="red"
                        dataId="edit-cancel"
                    />
                    <ActionButton
                        className={styles.actionButton}
                        onClick={onSubmit}
                        label="Save"
                        size="lg"
                        color="green"
                        dataId="edit-submit"
                    />
                </div>
            );
        } else {
            return (
                <ActionButton
                    onClick={() => setEditState(!editState)}
                    size="lg"
                    color="blue"
                >
                    <EditIcon
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        onClick={() => setEditState(!editState)}
                        className={styles.iconWhite}
                        data-test-id="edit"
                    />
                    Edit Profile
                </ActionButton>
            );
        }
    };

    return (
        <ProfileView
            label="Profile"
            user={user}
            contacts={contacts}
            updatingProfile={updatingProfile}
            renderButtons={renderEditButtons}
            onPhotoChange={onPhotoChange}
            updateUserData={updateUserData}
            editState={editState}
            userData={userData}
            loadingContacts={loadContacts}
            navigateToContact={(contact) => {
                setCurrentContact(contact);
                history.push(`/contact/${url.parse(contact.webId).host}`);
            }}
        ></ProfileView>
    );
};

const mapStateToProps = (state) => ({
    user: state.user.user,
    updatingProfile: state.user.updatingProfile,
    error: state.user.error,
    webId: state.user.webId,
    loadUser: state.user.loadUser,
    contacts: state.contact.contacts,
    loadContacts: state.contact.loadContacts,
});

export default connect(mapStateToProps, {
    updateProfile,
    changeProfilePhoto,
    fetchUser,
    fetchContactProfiles,
    setCurrentContact,
})(withRouter(ProfilePage));
