import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import url from 'url';
import { ClassicSpinner } from 'react-spinners-kit';

import styles from './Navigation.module.scss';
import SearchDropdown from '../SearchDropdown/SearchDropdown';
import fileUtils from '../../utils/fileUtils';
import { setCurrentPath, toggleSearchbar } from '../../actions/appActions';
import { searchContact, setCurrentContact } from '../../actions/contactActions';
import { navigate, getInitialsFromUser } from '../../utils/helper';
import logo from '../../assets/icons/owndrive-logo.png';
import {
    getUsernameFromWebId,
    getContactRoute,
    getIdpFromWebId,
    getHomeRoute,
    getFileRoute,
} from '../../utils/url';
import NavbarMenu from '../NavbarMenu/NavbarMenu';
import Search from '../../assets/svgIcons/Search';
import useWindowDimension from '../../hooks/useWindowDimension';
import { screen_l as screenL } from '../../styles/constants.scss';
import FileIcon from '../../assets/icons/FileIconMd.png';
import FolderIcon from '../../assets/icons/FolderMd.png';
import FileIconSm from '../../assets/icons/FileIconSm.png';
import FolderIconSm from '../../assets/icons/FolderSm.png';
import DefaultIcon from '../DefaultIcon/DefaultIcon';

const formatOptionLabel = ({ label, name, path, type, contact }) => {
    if (type === 'contact') {
        return (
            <div className={styles.optionContainer}>
                <div className={styles.iconContainer}>
                    {contact.picture ? (
                        <div
                            className={styles.contactIcon}
                            style={{
                                backgroundImage: `url('${contact.picture}')`,
                            }}
                        />
                    ) : (
                        <DefaultIcon
                            className={styles.defaultContactIcon}
                            initials={getInitialsFromUser(contact)}
                        />
                    )}
                </div>
                <span>
                    {contact.name
                        ? `${contact.name} (${getUsernameFromWebId(
                              contact.webId
                          )}.${getIdpFromWebId(contact.webId)})`
                        : getUsernameFromWebId(contact.webId)}
                </span>
            </div>
        );
    } else if (type === 'separator') {
        return (
            <div className={styles.separatorContainer}>
                <div className={styles.iconContainer}>
                    <div className={styles.separator}>{label}</div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.optionContainer}>
                <div className={styles.iconContainer}>
                    <img
                        alt="icon"
                        className={
                            type === 'file'
                                ? styles.fileIcon
                                : styles.folderIcon
                        }
                        srcSet={`
                    ${type === 'file' ? FileIconSm : FolderIconSm} 567px,
                    ${type === 'file' ? FileIcon : FolderIcon}
                    `}
                    />
                </div>
                <div style={{ display: 'flex' }}>
                    <div>{name}</div>
                    {url.parse(path).pathname !== '/' && (
                        <div className={styles.fullPath}>
                            {url
                                .parse(path)
                                .pathname.replace(
                                    path.endsWith('/') ? name + '/' : name,
                                    ''
                                )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
};

const Navigation = ({
    resetError,
    webId,
    setCurrentPath,
    history,
    location,
    currentItem,
    rootUrl,
    fileHierarchy,
    contacts,
    currentPath,
    setCurrentContact,
    contactSearchResult,
    dispatch,
    isSearchBarExpanded,
    searchingContacts,
    toggleSearchbar,
    isAccessWindowVisible,
}) => {
    const [dropdownOptions, setDropdownOptions] = useState([]);
    useEffect(() => {
        setDropdownOptions(
            getSearchDropdownOptions(
                contactSearchResult,
                contacts,
                fileHierarchy
            )
        );
    }, [fileHierarchy?.length, contacts?.length, contactSearchResult?.length]);

    const handleChange = (selected) => {
        resetError();
        if (selected.type === 'folder' && location.pathname === '/home') {
            history.push(getHomeRoute(selected.path));
        } else if (
            selected.type === 'file' &&
            location.pathname.startsWith('/file')
        ) {
            navigate(getFileRoute(selected.path), history, dispatch);
        } else if (selected.type === 'folder') {
            history.push(getHomeRoute(selected.path));
        } else if (selected.type === 'file') {
            navigate(getFileRoute(selected.path), history, dispatch);
        } else if (selected.type === 'contact') {
            const { contact } = selected;
            navigate(getContactRoute(contact), history, dispatch, () =>
                setCurrentContact(contact)
            );
        }
    };
    const { width } = useWindowDimension();

    const dropdownIndicator =
        searchingContacts && !isAccessWindowVisible ? (
            <ClassicSpinner
                size={20}
                color="#686769"
                loading={searchingContacts}
            />
        ) : (
            <Search
                {...{
                    viewBox: '0 0 24 24',
                    width: width < screenL ? 24 : 30,
                    height: width < screenL ? 24 : 30,
                }}
            />
        );

    const getSearchDropdownOptions = (
        contactSearchResult,
        contacts,
        fileHierarchy
    ) => {
        const contactSearchDropdownItems = contactSearchResult
            ? contactSearchResult
            : [];
        const contactsDropdownItems = contacts ? contacts : [];
        const contactOptions = [
            ...contactSearchDropdownItems,
            ...contactsDropdownItems,
        ]
            .filter((contact, pos, options) => {
                return (
                    options.findIndex(
                        (possibleDuplicate) =>
                            contact.webId === possibleDuplicate.webId
                    ) === pos
                );
            })
            .map((contact) => ({
                value: getUsernameFromWebId(contact.webId),
                type: 'contact',
                contact,
            }));

        if (
            (currentItem && currentItem.files && currentItem.folders) ||
            fileHierarchy
        ) {
            if (fileHierarchy) {
                const filesAndFolders = fileUtils
                    .convertFilesAndFoldersToArray({
                        items: fileHierarchy,
                    })
                    .map((resource) => ({
                        ...resource,
                        value: resource.name,
                        path: resource.path,
                    }));
                return (contactOptions.length > 0 || contactSearchResult) &&
                    !searchingContacts
                    ? [...contactOptions, ...filesAndFolders]
                    : filesAndFolders;
            } else {
                const filesAndFolders = fileUtils
                    .convertFilesAndFoldersToArray({
                        files: currentItem.files,
                        folders: currentItem.folders,
                    })
                    .map((resource) => ({
                        ...resource,
                        value: resource.name,
                        path: currentPath + resource.name,
                    }));
                return (contactOptions.length > 0 || contactSearchResult) &&
                    !searchingContacts
                    ? [...contactOptions, ...filesAndFolders]
                    : filesAndFolders;
            }
        } else {
            return contactOptions;
        }
    };

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
            <div className={styles.search}>
                <SearchDropdown
                    className={styles.searchDropdown}
                    onChange={handleChange}
                    placeholder="Search..."
                    items={dropdownOptions}
                    isSearchBarExpanded={isSearchBarExpanded}
                    toggleSearchbar={toggleSearchbar}
                    indicator={dropdownIndicator}
                    formatOptionLabel={formatOptionLabel}
                />
            </div>
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
    currentPath: state.app.currentPath,
    currentItem: state.app.currentItem,
    rootUrl: state.app.rootUrl,
    contacts: state.contact.contacts,
    searchingContacts: state.contact.searchingContacts,
    contactSearchResult: state.contact.contactSearchResult,
    isSearchBarExpanded: state.app.isSearchBarExpanded,
    loadCurrentItem: state.app.loadCurrentItem,
    fileHierarchy: state.app.fileHierarchy,
    isAccessWindowVisible: state.app.isAccessWindowVisible,
});

export default connect(mapStateToProps, (dispatch) => ({
    ...bindActionCreators(
        {
            setCurrentPath,
            setCurrentContact,
            searchContact,
            toggleSearchbar,
        },
        dispatch
    ),
    dispatch,
}))(withRouter(Navigation));
