import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './ProfileView.module.scss';
import Camera from '../../assets/svgIcons/Camera';
import KeyValuePair from '../KeyValuePair/KeyValuePair';
import SingleValue from '../KeyValuePair/SingleValue';
import { Layout } from '../Layout';
import { getIdpFromWebId, getUsernameFromWebId } from '../../utils/url.js';
import styleConstants from '../../styles/constants.scss';
import useWindowDimension from '../../hooks/useWindowDimension';
import ActionButton from '../ActionButton/ActionButton';
import DefaultIcon from '../DefaultIcon/DefaultIcon';
import { getInitialsFromUser, handleError } from '../../utils/helper';
import { ClassicSpinner } from 'react-spinners-kit';
import ContactList from '../ContactList/ContactsList';

export const ProfileView = ({
    user,
    userData,
    editState,
    updateUserData,
    onPhotoChange,
    renderButtons,
    isContact,
    addContact,
    removeContact,
    webId,
    label,
    contacts,
    loading,
    error,
    contactRecommendations,
    navigateToContact,
}) => {
    // eslint-disable-next-line no-unused-vars
    const { _, width } = useWindowDimension();
    const [contactStatus, setContactStatus] = useState(undefined);

    handleError(error);

    const [displayedRows, setDisplayedRows] = useState(2);
    const contactRecommendationsToDisplay =
        contactRecommendations &&
        contactRecommendations.slice(0, displayedRows * 5);

    if (user && userData) {
        return (
            <Layout
                isLoading={loading}
                className={styles.grid}
                label={(user.name !== '' && user.name) ?? label}
                hideToolbar={width < styleConstants.screen_l ? true : false}
            >
                <div
                    className={classNames(styles.profileContainer, {
                        [styles.edit]: editState,
                    })}
                >
                    <div className={styles.headContainer}>
                        <label htmlFor="pictureUpload">
                            {editState ? (
                                <div className={styles.editPhoto}>
                                    <input
                                        type="file"
                                        onChange={onPhotoChange}
                                        style={{ display: 'none' }}
                                        id="pictureUpload"
                                        accept="image/*"
                                    />
                                    <Camera />
                                </div>
                            ) : null}
                            {user && user.picture ? (
                                <div
                                    className={styles.profileImage}
                                    style={{
                                        backgroundImage: `url('${user.picture}')`,
                                    }}
                                />
                            ) : (
                                <DefaultIcon
                                    className={styles.defaultProfileImage}
                                    initials={getInitialsFromUser(user)}
                                />
                            )}
                        </label>
                        <div className={styles.headDataContainer}>
                            {(userData.name || editState) && (
                                <SingleValue
                                    editable={editState}
                                    value={
                                        typeof userData.name !== 'undefined'
                                            ? userData.name
                                            : getUsernameFromWebId(
                                                  userData.webId
                                              )
                                    }
                                    placeholder="Name"
                                    dataKey="name"
                                    setValue={(value) =>
                                        updateUserData('name', value)
                                    }
                                    className={styles.nameLabel}
                                />
                            )}
                            {(userData.bio || editState) && (
                                <SingleValue
                                    editable={editState}
                                    value={userData.bio}
                                    placeholder="Bio"
                                    setValue={(value) =>
                                        updateUserData('bio', value)
                                    }
                                    className={classNames(styles.bioLabel)}
                                    maxInput={256}
                                />
                            )}
                            <a
                                className={styles.webIdLabel}
                                href={user && user.webId}
                            >
                                {user && getIdpFromWebId(user.webId)}
                            </a>
                        </div>
                        <div className={styles.editWrapper}>
                            {webId &&
                                user &&
                                user.webId !== webId &&
                                (contactStatus || isContact ? (
                                    <ActionButton
                                        label="Remove from Contacts"
                                        color="white"
                                        onClick={() => {
                                            removeContact(webId, user);
                                            setContactStatus(false);
                                        }}
                                        className={classNames(
                                            styles.removeButton,
                                            styles.actionButton
                                        )}
                                    />
                                ) : (
                                    <ActionButton
                                        label="Add to Contacts"
                                        color="green"
                                        className={classNames(
                                            styles.addButton,
                                            styles.actionButton
                                        )}
                                        onClick={() => {
                                            addContact(webId, user);
                                            setContactStatus(true);
                                        }}
                                    />
                                ))}
                        </div>
                    </div>
                    <div className={styles.infoContainer}>
                        {(userData.job || editState) && (
                            <KeyValuePair
                                label="Job:"
                                dataKey="job"
                                value={userData.job}
                                editable={editState}
                                setValue={updateUserData}
                                placeholder={
                                    userData.job !== '' ? userData.job : ``
                                }
                            />
                        )}
                        {(userData.emails || editState) && (
                            <KeyValuePair
                                setValue={updateUserData}
                                label="Email:"
                                dataKey="emails"
                                value={userData.emails}
                                editable={editState}
                                placeholder={
                                    userData.emails ? userData.emails : ``
                                }
                            />
                        )}
                        {(userData.telephones || editState) && (
                            <KeyValuePair
                                setValue={updateUserData}
                                dataKey="telephones"
                                label="Phone:"
                                value={userData.telephones}
                                editable={editState}
                                placeholder={
                                    userData.telephones
                                        ? userData.telephones
                                        : ``
                                }
                            />
                        )}
                        <div className={styles.editWrapper}>
                            {webId &&
                                user &&
                                user.webId === webId &&
                                renderButtons()}
                        </div>
                    </div>
                    <div className={styles.contactsContainer}>
                        {contacts && contacts.length > 0 && !editState && (
                            <div>
                                <div className={styles.sectionLabel}>
                                    Contacts
                                </div>
                                <ContactList
                                    onItemClick={navigateToContact}
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
                                            onItemClick={navigateToContact}
                                            contacts={
                                                contactRecommendationsToDisplay
                                            }
                                            webId={webId}
                                            addContact={addContact}
                                            recommended
                                            removeContact={removeContact}
                                        />
                                        {displayedRows * 3 <
                                        contactRecommendations.length ? (
                                            <div
                                                onClick={() =>
                                                    setDisplayedRows(
                                                        displayedRows + 2
                                                    )
                                                }
                                                className={
                                                    styles.showMoreWrapper
                                                }
                                            >
                                                <div
                                                    className={
                                                        styles.showMoreLabel
                                                    }
                                                >
                                                    Show more
                                                </div>
                                                <div
                                                    className={
                                                        styles.showMoreIcon
                                                    }
                                                >
                                                    ...
                                                </div>
                                            </div>
                                        ) : null}
                                    </>
                                ) : null}
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
        );
    } else {
        return null;
    }
};

export default ProfileView;
