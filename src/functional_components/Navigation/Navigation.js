import React, { useState } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import styles from './Navigation.module.css';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import DropdownMenu from '../DropdownMenu';

const DROPDOWN_OPTIONS = [
    { onClick: () => console.log('test'), label: 'Home' },
    { onClick: () => console.log('test2'), label: 'Settings' },
    { onClick: () => console.log('test2'), label: 'Notifications' },
    { onClick: () => console.log('test2'), label: 'Contacts' },
    { onClick: () => {}, label: 'Logout' },
];

const Navigation = ({
    picture,
    webId,
    onLogin,
    onLogout,
    toggleSidebar,
    username,
    history,
}) => {
    DROPDOWN_OPTIONS[DROPDOWN_OPTIONS.length - 1].onClick = onLogout
    const [isDropdownExpanded, setDropdownExpanded] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.brandWrapper}>
                <img
                    onClick={() => history.push('/home')}
                    className={styles.brand}
                    src="https://owntech.de/favicon.ico"
                />
            </div>
            <div className={styles.menuWrapper}>
                {webId ? (
                    <div className={styles.dropdownWrapper}>
                        <div className={styles.profileSection}>
                            {picture ? (
                                <div
                                    onClick={toggleSidebar}
                                    className={styles.profileIcon}
                                    style={{
                                        backgroundImage: 'url(' + picture + ')',
                                    }}
                                />
                            ) : (
                                <img
                                    onClick={() => history.push('/profile')}
                                    className={styles.profileIcon}
                                    src={defaultIcon}
                                />
                            )}
                            <div className={styles.username}>{username}</div>
                        </div>
                        <DropdownMenu
                            options={DROPDOWN_OPTIONS}
                            isExpanded={isDropdownExpanded}
                            setExpanded={setDropdownExpanded}
                        />
                        <div
                            className={classNames(styles.mask, {
                                [styles.active]: isDropdownExpanded,
                            })}
                        />
                    </div>
                ) : (
                    <div className={styles.loginButton}>
                        <a
                            href="/login"
                        >
                            Login
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default withRouter(Navigation);
