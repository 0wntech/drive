import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './ProfilePage.module.scss';
import { updateProfile, changeProfilePhoto } from '../../actions/userActions';
import Camera from '../../assets/svgIcons/Camera';
import EditIcon from '../../assets/svgIcons/Edit';
import X from '../../assets/svgIcons/X';
import Check from '../../assets/svgIcons/Check';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import KeyValuePair from '../KeyValuePair/KeyValuePair';
import SingleValue from '../KeyValuePair/SingleValue';
import IconButton from '../IconButton/IconButton';
import ActionButton from '../ActionButton/ActionButton';
import { Layout } from '../Layout';
import { handleError } from '../../utils/helper';
import useWindowDimension from '../../hooks/useWindowDimension';
import styleConstants from '../../styles/constants.scss';

export const ProfilePage = ({
    user,
    changeProfilePhoto,
    updateProfile,
    updatingProfile,
    error,
}) => {
    handleError(error);
    const [userData, setUserData] = useState({ ...user });
    const [isEditable, setEditable] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const { _, width } = useWindowDimension();

    const updateUserData = (key, value) => {
        setUserData({ ...userData, [key]: value });
    };

    const onCancel = () => {
        setEditable(false);
        setUserData({ ...user });
    };

    const onSubmit = () => {
        setEditable(false);
        updateProfile(userData, user.webId);
    };

    const onPhotoChange = (e) => {
        changeProfilePhoto(e, user.webId);
    };

    const renderEditButtons = () => {
        if (isEditable) {
            if (width < styleConstants.screen_m) {
                return (
                    <div className={styles.editButtons}>
                        <ActionButton
                            className={styles.actionButton}
                            onClick={onCancel}
                            label="Cancel"
                            size="lg"
                            color="red"
                            data-test-id="edit-cancel"
                        />
                        <ActionButton
                            className={styles.actionButton}
                            onClick={onSubmit}
                            label="Save"
                            size="lg"
                            color="green"
                            data-test-id="edit-submit"
                        />
                    </div>
                );
            } else if (width > styleConstants.screen_m) {
                return (
                    <div className={styles.editButtons}>
                        <X
                            onClick={onCancel}
                            className={styles.icon}
                            data-test-id="edit-cancel"
                        />{' '}
                        <Check
                            className={styles.icon}
                            onClick={onSubmit}
                            data-test-id="edit-submit"
                        />
                    </div>
                );
            }
        } else {
            if (width < styleConstants.screen_m) {
                return (
                    <IconButton onClick={() => setEditable(!isEditable)}>
                        <EditIcon
                            onClick={() => setEditable(!isEditable)}
                            className={styles.icon}
                            data-test-id="edit"
                        />
                        Edit
                    </IconButton>
                );
            } else {
                return (
                    <EditIcon
                        onClick={() => setEditable(!isEditable)}
                        className={styles.icon}
                        data-test-id="edit"
                    />
                );
            }
        }
    };

    if (user) {
        return (
            <Layout
                isLoading={updatingProfile || !user}
                className={styles.grid}
                label="Profile"
                hideToolbar={width < styleConstants.screen_m ? true : false}
            >
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
                        <div className={styles.headDataContainer}>
                            <div>
                                <SingleValue
                                    editable={isEditable}
                                    value={userData.name}
                                    dataKey="name"
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
                            <SingleValue
                                editable={isEditable}
                                value={userData.bio}
                                setValue={(value) =>
                                    updateUserData('bio', value)
                                }
                                placeholder="Add bio.."
                                className={classNames(
                                    styles.bioLabel,
                                    styles.multiline
                                )}
                            />
                        </div>
                        <div className={styles.editWrapper}>
                            {renderEditButtons()}
                        </div>
                    </div>
                    <KeyValuePair
                        label="Job:"
                        dataKey="job"
                        value={userData.job}
                        editable={isEditable}
                        setValue={updateUserData}
                        placeholder={user.job ? user.job : `add Job`}
                    />
                    <KeyValuePair
                        setValue={updateUserData}
                        label="Email:"
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
                        label="Telephone:"
                        value={userData.telephones}
                        editable={isEditable}
                        placeholder={
                            user.telephones.length > 1
                                ? user.telephones
                                : `add Number`
                        }
                    />
                </div>
            </Layout>
        );
    } else {
        return null;
    }
};

const mapStateToProps = (state) => ({
    user: state.user.user,
    updatingProfile: state.user.updatingProfile,
    error: state.user.error,
});

export default connect(mapStateToProps, { updateProfile, changeProfilePhoto })(
    ProfilePage
);
