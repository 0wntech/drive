import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import styles from './NavbarMenu.module.scss';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { setCurrentPath } from '../../actions/appActions';
import { logout } from '../../actions/userActions';
import { getRootFromWebId } from '../../utils/url';
import { navigate } from '../../utils/helper';
import useWindowDimension from '../../hooks/useWindowDimension';
import styleConstants from '../../styles/constants.scss';
import SvgSettings from '../../assets/svgIcons/Settings';

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

    // eslint-disable-next-line no-unused-vars
    const { _, width } = useWindowDimension();

    const getMenuHead = () => (
        <div className={styles.profileSection}>
            {width < styleConstants.screen_m &&
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
            ) : (
                <div
                    data-test-id="navigation-profile-picture"
                    onClick={(e) => {
                        e.stopPropagation();
                        setDropdownExpanded(false);
                        navigate('/profile', history, dispatch, resetError);
                    }}
                    className={styles.profileIcon}
                    style={{
                        backgroundImage: `url('${
                            user.picture ? user.picture : defaultIcon
                        }')`,
                    }}
                />
            )}

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
            ) : null}
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
