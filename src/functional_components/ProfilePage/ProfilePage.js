import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './ProfilePage.module.scss';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { updateProfile, changeProfilePhoto } from '../../actions/userActions';
import { fetchContacts, setCurrentContact } from '../../actions/contactActions';
import { fetchApps, removeApp } from '../../actions/userAppActions';
import Camera from '../../assets/svgIcons/Camera';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import KeyValuePair from '../KeyValuePair/KeyValuePair';
import SingleValue from '../KeyValuePair/SingleValue';
import { Layout } from '../Layout';
import { handleError } from '../../utils/helper';
import useWindowDimension from '../../hooks/useWindowDimension';
import styleConstants from '../../styles/constants.scss';
import { ContactListItem } from '../ContactListItem';
import { EditButtons } from '../EditButtons';
import { withRouter } from 'react-router-dom';
import { responsiveApps, responsiveContacts } from './constants';

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
    history,
    setCurrentContact,
    removeApp,
}) => {
    handleError(error);
    const [userData, setUserData] = useState({ ...user });
    const [isEditable, setEditable] = useState(false);

    useEffect(() => {
        if (!contacts) fetchContacts(webId);
        if (!apps) fetchApps(webId);
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
                            <EditButtons
                                isEditable={isEditable}
                                onSubmit={onSubmit}
                                onCancel={onCancel}
                                onEdit={() => setEditable(!isEditable)}
                            />
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
                    {user.telephones.length > 0 ? (
                        <KeyValuePair
                            setValue={updateUserData}
                            dataKey="telephones"
                            label="Phone:"
                            value={userData.telephones}
                            editable={isEditable}
                            placeholder={
                                user.telephones.length > 1
                                    ? user.telephones
                                    : `add Number`
                            }
                        />
                    ) : null}
                    <p className={styles.label}>Contacts</p>
                    {contacts ? (
                        <div className={styles.carouselContainer}>
                            <Carousel
                                containerClass=""
                                responsive={responsiveContacts}
                                centerMode={true}
                            >
                                {contacts.map((contact) => {
                                    return (
                                        <ContactListItem
                                            className={styles.item}
                                            contact={contact}
                                            size="sm"
                                            onClick={(contact) => {
                                                setCurrentContact(contact);
                                                history.push('/contact');
                                            }}
                                        />
                                    );
                                })}
                            </Carousel>
                            <div
                                className={styles.goToBtn}
                                onClick={() => history.push('/contacts')}
                            >
                                View Contacts
                            </div>
                        </div>
                    ) : null}
                    <p className={styles.label}>Apps</p>
                    {apps ? (
                        <div className={styles.carouselContainer}>
                            <Carousel
                                containerClass=""
                                responsive={responsiveApps}
                                centerMode={true}
                            >
                                {fakeApps(apps).map((app, index) => {
                                    console.log('app', app);
                                    return (
                                        <div
                                            key={app.title + index}
                                            className={styles.appCard}
                                            onClick={() =>
                                                window.open(app.url, '_blank')
                                            }
                                        >
                                            <img
                                                className={styles.appCardImage}
                                                src={
                                                    app.icon ||
                                                    `${app.url}/favicon.ico`
                                                }
                                            />
                                            <p className={styles.appCardLabel}>
                                                {app.title}
                                            </p>
                                        </div>
                                    );
                                })}
                            </Carousel>
                            <div
                                className={styles.goToBtn}
                                onClick={() => history.push('/apps')}
                            >
                                View Apps
                            </div>
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
    removeApp,
    changeProfilePhoto,
    fetchContacts,
    fetchApps,
    setCurrentContact,
})(withRouter(ProfilePage));

// remove me if user library functions return all the parameter
const fakeApps = (apps) => {
    if (!apps) return [];
    return apps.map((url) => {
        return {
            url,
            title: getHost(url),
            description: url,
            settings: url,
            icon: undefined,
            description: url,
            contents: [],
            permissions: {},
        };
    });
};

const getHost = function (href) {
    const link = document.createElement('a');
    link.href = href;
    return link.hostname.split('.')[0];
};
