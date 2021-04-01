import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './NavbarMenu.module.scss';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { setCurrentPath } from '../../actions/appActions';
import { logout } from '../../actions/userActions';
import { getUsernameFromWebId } from '../../utils/url';
import { navigate, getInitialsFromUser } from '../../utils/helper';
import useWindowDimension from '../../hooks/useWindowDimension';
import styleConstants from '../../styles/constants.scss';
import SvgSettings from '../../assets/svgIcons/Settings';
import DefaultIcon from '../DefaultIcon/DefaultIcon';

export const NavbarMenu = ({
    className,
    history,
    logout,
    user,
    rootUrl,
    setCurrentPath,
    resetError,
    dispatch,
}) => {
    const [isDropdownExpanded, setDropdownExpanded] = useState(false);
    const [profilePictureError, setProfilePictureError] = useState(false);
    const profilePictureRef = useRef();

    useEffect(() => setProfilePictureError(false), [user]);

    const DROPDOWN_OPTIONS = [
        {
            onClick: () => {
                navigate('/home', history, dispatch);
                setCurrentPath(rootUrl);
            },
            label: 'Home',
        },
        { onClick: () => history.push('/settings'), label: 'Settings' },
        {
            onClick: () => navigate('/profile', history, dispatch, resetError),
            label: 'Profile',
        },
        {
            onClick: () => navigate('/apps', history, dispatch, resetError),
            label: 'Apps',
        },
        { onClick: () => logout(), label: 'Logout' },
    ];

    // eslint-disable-next-line no-unused-vars
    const { _, width } = useWindowDimension();

    const getMenuHead = () => (
        <div className={styles.profileSection}>
            {width < styleConstants.screen_l &&
            history.location.pathname === '/profile' ? (
                <div
                    className={styles.settings}
                    onClick={(e) => {
                        e.stopPropagation();
                        setDropdownExpanded(false);
                        navigate('/settings', history, dispatch, resetError);
                    }}
                >
                    <SvgSettings />
                </div>
            ) : user && user.picture && !profilePictureError ? (
                <div
                    className={styles.profileIcon}
                    ref={profilePictureRef}
                    onClick={(e) => {
                        e.stopPropagation();
                        setDropdownExpanded(false);
                        navigate('/profile', history, dispatch, resetError);
                    }}
                    data-test-id="navigation-profile-picture"
                >
                    <img
                        alt={`${getUsernameFromWebId(user.webId)}'s profile`}
                        onLoad={() => {
                            profilePictureRef.current.style.backgroundImage = `url(${user.picture})`;
                        }}
                        onError={() => setProfilePictureError(true)}
                        src={user.picture}
                    />
                </div>
            ) : (
                <DefaultIcon
                    onClick={(e) => {
                        e.stopPropagation();
                        setDropdownExpanded(false);
                        navigate('/profile', history, dispatch, resetError);
                    }}
                    className={styles.defaultProfileIcon}
                    initials={getInitialsFromUser(user)}
                />
            )}

            <div data-test-id="navbar-username" className={styles.username}>
                {user.name ? user.name : getUsernameFromWebId(user.webId)}
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
            ) : null}
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user.user,
    rootUrl: state.app.rootUrl,
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
