import React, { useState } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import styles from './Navigation.module.css';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import DropdownMenu from '../DropdownMenu';
import ActionButton from '../ActionButton/ActionButton';

const Navigation = ({
    picture,
    webId,
    onLogin,
    onLogout,
    toggleSidebar,
    username,
    history,
}) => {
    const DROPDOWN_OPTIONS = [
        { onClick: () => history.push('/profile'), label: 'Profile' },
        { onClick: () => console.log('test2'), label: 'Settings*' },
        { onClick: () => console.log('test2'), label: 'Notifications*' },
        { onClick: () => console.log('test2'), label: 'Contacts*' },
        { onClick: () => onLogout(), label: 'Logout' },
    ];
    const [isDropdownExpanded, setDropdownExpanded] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.brandWrapper}>
                <img
                    onClick={() => {
                        if (webId) {
                            history.push('/home');
                        } else {
                            history.push('/');
                        }
                    }}
                    className={styles.brand}
                    src="https://owntech.de/favicon.ico"
                />
            </div>
            <div className={styles.menuWrapper}>
                {webId ? (
                    <div className={styles.dropdownWrapper}>
                        <div className={styles.profileSection}>
                            <div
                                onClick={() => history.push('/profile')}
                                className={styles.profileIcon}
                                style={{
                                    backgroundImage: `url('${
                                        picture ? picture : defaultIcon
                                    }')`,
                                }}
                            />

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
                    <ActionButton
                        size="sm"
                        label="Login"
                        onClick={() => history.push('/login')}
                    />
                )}
            </div>
        </div>
    );
};

export default withRouter(Navigation);
