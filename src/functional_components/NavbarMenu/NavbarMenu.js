import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import defaultIcon from '../../assets/icons/defaultUserPic.png';
import styles from './NavbarMenu.module.css';
import ActionButton from '../ActionButton/ActionButton';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

const NavbarMenu = ({
    className,
    history,
    webId,
    picture,
    username,
    onLogout,
}) => {
    const [isDropdownExpanded, setDropdownExpanded] = useState(false);

    const DROPDOWN_OPTIONS = [
        { onClick: () => history.push('/profile'), label: 'Profile' },
        { onClick: () => console.log('test2'), label: 'Settings*' },
        { onClick: () => console.log('test2'), label: 'Notifications*' },
        { onClick: () => history.push('/contacts'), label: 'Contacts' },
        { onClick: () => onLogout(), label: 'Logout' },
    ];

    const menuHead = (
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
    );

    return (
        <div className={className}>
            {webId ? (
                <DropdownMenu
                    menuHead={menuHead}
                    options={DROPDOWN_OPTIONS}
                    isExpanded={isDropdownExpanded}
                    setExpanded={setDropdownExpanded}
                />
            ) : (
                <ActionButton
                    size="sm"
                    label="Login"
                    onClick={() => history.push('/login')}
                />
            )}
        </div>
    );
};

NavbarMenu.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object,
    webId: PropTypes.string,
    picture: PropTypes.string,
    username: PropTypes.string,
    onLogout: PropTypes.func,
};

export default withRouter(NavbarMenu);
