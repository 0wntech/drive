import React, { useState } from 'react';
import { connect } from 'react-redux';
import styles from './ProfilePage.module.css';
import { ClassicSpinner } from 'react-spinners-kit';

import { updateProfile, changeProfilePhoto } from '../../actions/UserActions';
import Settings from '../../assets/svgIcons/Settings';
import Camera from '../../assets/svgIcons/Camera';
import EditIcon from '../../assets/svgIcons/Edit';
import X from '../../assets/svgIcons/X';
import Check from '../../assets/svgIcons/Check';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import KeyValuePair from '../KeyValuePair/KeyValuePair';
import SingleValue from '../KeyValuePair/SingleValue';

export const ProfilePage = ({
    webId,
    user,
    updateProfilePic,
    changeProfilePhoto,
    updateProfile,
}) => {
    const [userData, setUserData] = useState({ ...user });
    const [isEditable, setEditable] = useState(false);

    const updateUserData = (key, value) => {
        setUserData({ ...userData, [key]: value });
    };

    const onCancel = () => {
        setEditable(false);
        setUserData({ ...user });
    };

    const onSubmit = () => {
        setEditable(false);
        updateProfile(userData, webId);
    };

    const onPhotoChange = (e) => {
        changeProfilePhoto(e, webId);
    };

    if (user || updateProfilePic) {
        return (
            <div className={styles.grid}>
                <div className={styles.toolbarArea}>
                    <div className={styles.iconWrapper}>
                        <Settings className={styles.settings} />
                    </div>
                </div>
                <div className={styles.profileContainer}>
                    <div className={styles.headContainer}>
                        {isEditable ? (
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
                        <div className={styles.nameContainer}>
                            <SingleValue
                                editable={isEditable}
                                value={userData.name}
                                setValue={(value) =>
                                    updateUserData('name', value)
                                }
                                className={styles.nameLabel}
                                placholder="Enter Name.."
                            />
                            <div className={styles.webIdLabel}>
                                {user.webId.replace('/profile/card#me', '')}
                            </div>
                        </div>
                        <div className={styles.bio}>
                            <SingleValue
                                editable={isEditable}
                                value={userData.bio}
                                setValue={(value) =>
                                    updateUserData('bio', value)
                                }
                                placeholder="Add bio.."
                                className={styles.bioLabel}
                            />
                        </div>
                        <div className={styles.editWrapper}>
                            {isEditable ? (
                                <div className={styles.editButtons}>
                                    <X
                                        onClick={onCancel}
                                        className={styles.icon}
                                    />{' '}
                                    <Check
                                        className={styles.icon}
                                        onClick={onSubmit}
                                    />
                                </div>
                            ) : (
                                <EditIcon
                                    onClick={() => setEditable(!isEditable)}
                                    className={styles.icon}
                                />
                            )}
                        </div>
                    </div>
                    <KeyValuePair
                        label="Job"
                        dataKey="job"
                        value={userData.job}
                        editable={isEditable}
                        setValue={updateUserData}
                        placeholder={user.job ? user.job : `add Job`}
                    />
                    <KeyValuePair
                        setValue={updateUserData}
                        label="Email"
                        dataKey="emails"
                        value={userData.emails}
                        editable={isEditable}
                        placeholder={
                            user.emails.length > 1 ? user.emails : `add Email`
                        }
                    />
                    <KeyValuePair
                        setValue={updateUserData}
                        dataKey="telephones"
                        label="Telephone"
                        value={userData.telephones}
                        editable={isEditable}
                        placeholder={
                            user.telephones.length > 1
                                ? user.telephones
                                : `add Number`
                        }
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.spinner}>
                <ClassicSpinner size={30} color="#686769" loading={!user} />
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    user: state.app.user,
    webId: state.app.webId,
    updateProfilePic: state.app.updateProfilePic,
});

export default connect(
    mapStateToProps,
    { updateProfile, changeProfilePhoto }
)(ProfilePage);
