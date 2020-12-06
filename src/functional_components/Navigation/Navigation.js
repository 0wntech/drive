import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import styles from './Navigation.module.scss';
import { setCurrentPath } from '../../actions/appActions';
import { navigate } from '../../utils/helper';
import logo from '../../assets/icons/owndrive-logo.png';
import NavbarMenu from '../NavbarMenu/NavbarMenu';
import Search from '../../assets/svgIcons/Search';
import SearchInput from '../SearchInput/SearchInput';

const Navigation = ({
    resetError,
    webId,
    setCurrentPath,
    history,
    rootUrl,
    dispatch,
    isSearchBarExpanded,
}) => {
    const dropdownIndicator = (
        <Search
            {...{
                viewBox: '0 0 24 24',
                width: 24,
                height: 24,
            }}
        />
    );

    return (
        <div
            className={classNames(styles.container, {
                [styles.active]: isSearchBarExpanded,
            })}
        >
            <div className={styles.brandWrapper}>
                <img
                    alt="logo"
                    onClick={() => {
                        resetError();
                        if (webId) {
                            setCurrentPath(rootUrl);
                            navigate('/home', history, dispatch);
                        } else {
                            history.push('/');
                        }
                    }}
                    className={styles.brand}
                    src={logo}
                />
            </div>
            {webId && (
                <div className={styles.search}>
                    <SearchInput
                        className={styles.searchDropdown}
                        placeholder="Search..."
                        indicator={dropdownIndicator}
                    />
                </div>
            )}
            <NavbarMenu
                resetError={resetError}
                className={styles.menuWrapper}
                iconClassName={styles.icon}
            />
        </div>
    );
};

const mapStateToProps = (state) => ({
    webId: state.user.webId,
    rootUrl: state.app.rootUrl,
    isSearchBarExpanded: state.app.isSearchBarExpanded,
});

export default connect(mapStateToProps, (dispatch) => ({
    ...bindActionCreators(
        {
            setCurrentPath,
        },
        dispatch
    ),
    dispatch,
}))(withRouter(Navigation));
