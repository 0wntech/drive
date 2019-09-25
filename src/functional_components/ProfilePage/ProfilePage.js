import React from 'react';
import { connect } from 'react-redux';
import styles from './ProfilePage.module.css';
import { ClassicSpinner } from 'react-spinners-kit';

import Settings from '../../assets/svgIcons/Settings';
import EditIcon from '../../assets/svgIcons/Edit';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import KeyValuePair from '../KeyValuePair/KeyValuePair';

const ProfilePage = ({
    user
}) => {
    if (user) {
        return (
            <div className={styles.grid}>
                <div className={styles.toolbarArea}>
                    <div className={styles.iconWrapper}>
                        <Settings className={styles.settings} />
                    </div>
                </div>
                <div className={styles.profileContainer}>
                    <div className={styles.headContainer}>
                        <div
                            className={styles.profileImage}
                            style={
                                user && user.picture
                                    ? {
                                          backgroundImage: `url(${user.picture})`,
                                      }
                                    : { backgroundImage: `url(${defaultIcon})` }
                            }
                        />
                        <div className={styles.nameContainer}>
                            <div className={styles.nameLabel}>{user.name}</div>
                            <div className={styles.webIdLabel}>
                                {user.webId.replace('/profile/card#me', '')}
                            </div>
                        </div>
                        <div className={styles.bio}>
                            {user.bio ? user.bio : 'add Bio'}
                        </div>
                        <div className={styles.editWrapper}>
                            <EditIcon className={styles.editIcon} />
                        </div>
                    </div>
                    <KeyValuePair label="Job" value={user.job} />
                    <KeyValuePair label="Email" value={user.emails} />
                    <KeyValuePair label="Telephone" value={user.telephones} />
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
});

export default connect(
    mapStateToProps,
    {}
)(ProfilePage);
