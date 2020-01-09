import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import styles from './NavbarMenu.module.css';
import ActionButton from '../ActionButton/ActionButton';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { setCurrentPath } from '../../actions/appActions';
import { logout } from '../../actions/userActions';
import { getRootFromWebId } from '../../utils/url';

const onRegister = () => {
    window.location.href = `https://owntech.de/register?returnToUrl=${window.location.href}login`;
};

export const NavbarMenu = ({
    className,
    history,
    logout,
    user,
    setCurrentPath,
}) => {
    const [isDropdownExpanded, setDropdownExpanded] = useState(false);

    const DROPDOWN_OPTIONS = [
        {
            onClick: () => {
                history.push('/home');
                setCurrentPath(getRootFromWebId(user.webId));
            },
            label: 'Home',
        },
        { onClick: () => history.push('/profile'), label: 'Profile' },
        { onClick: () => console.log('test2'), label: 'Settings*' },
        { onClick: () => console.log('test2'), label: 'Notifications*' },
        { onClick: () => history.push('/contacts'), label: 'Contacts' },
        { onClick: () => history.push('/apps'), label: 'Apps' },
        { onClick: () => logout(), label: 'Logout' },
    ];

    const getMenuHead = () => (
        <div className={styles.profileSection}>
            <div
                data-test-id="navigation-profile-picture"
                onClick={() => history.push('/profile')}
                className={styles.profileIcon}
                style={{
                    backgroundImage: `url('${
                        user.picture ? user.picture : defaultIcon
                    }')`,
                }}
            />

            <div data-test-id="navbar-username" className={styles.username}>
                {user.name}
            </div>
        </div>
    );

    return (
        <div className={className}>
            {user && user.webId ? (
                <DropdownMenu
                    menuHead={getMenuHead()}
                    options={DROPDOWN_OPTIONS}
                    isExpanded={isDropdownExpanded}
                    setExpanded={setDropdownExpanded}
                />
            ) : (
                <ActionButton
                    size="sm"
                    label="Register"
                    color="green"
                    onClick={onRegister}
                />
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user.user,
});

NavbarMenu.propTypes = {
    className: PropTypes.string,
    history: PropTypes.object,
    user: PropTypes.object,
    logout: PropTypes.func,
};

export default withRouter(
    connect(mapStateToProps, { logout, setCurrentPath })(NavbarMenu)
);
