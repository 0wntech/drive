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

export const ProfileView = ({
    user,
    userData,
    isContact,
    editState,
    updatingProfile,
    updateUserData,
    onPhotoChange,
    renderButtons,
    defaultIcon,
    addContact,
    removeContact,
    webId,
    label,
}) => {
    // eslint-disable-next-line no-unused-vars
    const { _, width } = useWindowDimension();
    const [contactStatus, setContactStatus] = useState(isContact);

    if (user && userData) {
        return (
            <Layout
                isLoading={updatingProfile || !user}
                className={styles.grid}
                label={label}
                hideToolbar={width < styleConstants.screen_m ? true : false}
            >
                <div className={styles.profileContainer}>
                    <div className={styles.headContainer}>
                        {editState ? (
                            <div className={styles.editPhoto}>
                                <input
                                    type="file"
                                    onChange={onPhotoChange}
                                    style={{ display: 'none' }}
                                    id="pictureUpload"
                                    accept="*/*"
                                />
                                <label htmlFor="pictureUpload">
                                    <Camera />
                                </label>
                            </div>
                        ) : null}
                        <div
                            className={styles.profileImage}
                            style={
                                user && user.picture
                                    ? {
                                          backgroundImage: `url('${user.picture}')`,
                                      }
                                    : {
                                          backgroundImage: `url('${defaultIcon}')`,
                                      }
                            }
                        />
                        <div className={styles.headDataContainer}>
                            <SingleValue
                                editable={editState}
                                value={
                                    typeof userData.name !== 'undefined'
                                        ? userData.name
                                        : getUsernameFromWebId(userData.webId)
                                }
                                dataKey="name"
                                setValue={(value) =>
                                    updateUserData('name', value)
                                }
                                className={styles.nameLabel}
                            />
                            <SingleValue
                                editable={editState}
                                value={userData.bio}
                                setValue={(value) =>
                                    updateUserData('bio', value)
                                }
                                className={classNames(styles.bioLabel)}
                                maxInput={256}
                            />
                            <a
                                className={styles.webIdLabel}
                                href={user && user.webId}
                            >
                                {user && getIdpFromWebId(user.webId)}
                            </a>
                        </div>
                        <div className={styles.editWrapper}>
                            {webId && user && user.webId !== webId ? (
                                contactStatus ? (
                                    <ActionButton
                                        label="Remove"
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
                                        label="Add"
                                        className={classNames(
                                            styles.addButton,
                                            styles.actionButton
                                        )}
                                        onClick={() => {
                                            addContact(webId, user);
                                            setContactStatus(true);
                                        }}
                                    />
                                )
                            ) : (
                                renderButtons()
                            )}
                        </div>
                    </div>
                    <KeyValuePair
                        label="Job:"
                        dataKey="job"
                        value={userData.job}
                        editable={editState}
                        setValue={updateUserData}
                        placeholder={userData.job !== '' ? userData.job : ``}
                    />
                    <KeyValuePair
                        setValue={updateUserData}
                        label="Email:"
                        dataKey="emails"
                        value={userData.emails}
                        editable={editState}
                        placeholder={userData.emails ? userData.emails : ``}
                    />
                    <KeyValuePair
                        setValue={updateUserData}
                        dataKey="telephones"
                        label="Phone:"
                        value={userData.telephones}
                        editable={editState}
                        placeholder={
                            userData.telephones ? userData.telephones : ``
                        }
                    />
                </div>
            </Layout>
        );
    } else {
        return null;
    }
};

export default ProfileView;
