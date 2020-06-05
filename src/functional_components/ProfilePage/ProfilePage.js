import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './ProfilePage.module.scss';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { updateProfile, changeProfilePhoto } from '../../actions/userActions';
import { fetchContacts } from '../../actions/contactActions';
import { fetchApps } from '../../actions/userAppActions';
import Camera from '../../assets/svgIcons/Camera';
import EditIcon from '../../assets/svgIcons/Edit';
import X from '../../assets/svgIcons/X';
import Check from '../../assets/svgIcons/Check';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import KeyValuePair from '../KeyValuePair/KeyValuePair';
import SingleValue from '../KeyValuePair/SingleValue';
import ActionButton from '../ActionButton/ActionButton';
import { Layout } from '../Layout';
import { handleError } from '../../utils/helper';
import useWindowDimension from '../../hooks/useWindowDimension';
import styleConstants from '../../styles/constants.scss';
import { ContactListItem } from '../ContactListItem';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 3,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3,
    },
};

export const ProfilePage = ({
    user,
    changeProfilePhoto,
    updateProfile,
    updatingProfile,
    fetchApps,
    fetchContacts,
    contacts,
    apps,
    webId,
    error,
}) => {
    handleError(error);
    const [userData, setUserData] = useState({ ...user });
    const [isEditable, setEditable] = useState(false);

    useEffect(() => {
        if (!contacts) fetchContacts(webId);
    }, []);

    // eslint-disable-next-line no-unused-vars
    const { width } = useWindowDimension();

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
                            dataId="edit-cancel"
                        />
                        <ActionButton
                            className={styles.actionButton}
                            onClick={onSubmit}
                            label="Save"
                            size="lg"
                            color="green"
                            dataIid="edit-submit"
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
                    <ActionButton
                        onClick={() => setEditable(!isEditable)}
                        size="lg"
                        color="blue"
                    >
                        <EditIcon
                            viewBox="3 2 30 30"
                            width="20"
                            height="20"
                            onClick={() => setEditable(!isEditable)}
                            className={styles.iconWhite}
                            data-test-id="edit"
                        />
                        Edit Profile
                    </ActionButton>
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
                    {contacts ? (
                        <div className={styles.carouselContainer}>
                            <Carousel
                                containerClass=""
                                responsive={responsive}
                                renderButtonGroupOutside={false}
                                renderDotsOutside={false}
                                centerMode={false}
                            >
                                {contacts.map((contact) => {
                                    return (
                                        <ContactListItem
                                            className={styles.item}
                                            contact={contact}
                                            size="sm"
                                        />
                                    );
                                })}
                            </Carousel>
                        </div>
                    ) : null}
                </div>
            </Layout>
        );
    } else {
        return null;
    }
};

const mapStateToProps = (state) => ({
    user: state.user.user,
    webId: state.user.webId,
    updatingProfile: state.user.updatingProfile,
    error: state.user.error,
    apps: state.userApps.apps,
    contacts: state.contact.contacts,
});

export default connect(mapStateToProps, {
    updateProfile,
    changeProfilePhoto,
    fetchContacts,
    fetchApps,
})(ProfilePage);
