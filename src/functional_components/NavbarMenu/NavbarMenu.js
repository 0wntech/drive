import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import styles from './NavbarMenu.module.css';
import ActionButton from '../ActionButton/ActionButton';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { setCurrentPath } from '../../actions/appActions';
import { logout } from '../../actions/userActions';
import { getRootFromWebId } from '../../utils/url';
import { navigate } from '../../utils/helper';

const onRegister = () => {
    window.location.href = `https://owntech.de/register?returnToUrl=${window.location.href}login`;
};

export const NavbarMenu = ({
    className,
    history,
    logout,
    user,
    setCurrentPath,
    resetError,
    dispatch,
}) => {
    const [isDropdownExpanded, setDropdownExpanded] = useState(false);

    const DROPDOWN_OPTIONS = [
        {
            onClick: () => {
                navigate('/home', history, dispatch);
                setCurrentPath(getRootFromWebId(user.webId));
            },
            label: 'Home',
        },
        { onClick: () => history.push('/settings'), label: 'Settings' },
        {
            onClick: () => navigate('/profile', history, dispatch, resetError),
            label: 'Profile',
        },
        {
            onClick: () => navigate('/contacts', history, dispatch, resetError),
            label: 'Contacts',
        },
        {
            onClick: () => navigate('/apps', history, dispatch, resetError),
            label: 'Apps',
        },
        { onClick: () => logout(), label: 'Logout' },
    ];

    const getMenuHead = () => (
        <div className={styles.profileSection}>
            <div
                data-test-id="navigation-profile-picture"
                onClick={() =>
                    navigate('/profile', history, dispatch, resetError)
                }
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
    connect(mapStateToProps, (dispatch) => ({
        ...bindActionCreators({ logout, setCurrentPath }, dispatch),
        dispatch,
    }))(NavbarMenu)
);
