import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

import styles from './Navigation.module.scss';
import SearchDropdown from '../SearchDropdown/SearchDropdown';
import FileIcon from '../../assets/icons/FileIconMd.png';
import FolderIcon from '../../assets/icons/FolderMd.png';
import FileIconSm from '../../assets/icons/FileIconSm.png';
import FolderIconSm from '../../assets/icons/FolderSm.png';
import fileUtils from '../../utils/fileUtils';
import { setCurrentPath, toggleSearchbar } from '../../actions/appActions';
import {
    searchContact,
    setCurrentContact,
    fetchContacts,
} from '../../actions/contactActions';
import { navigate } from '../../utils/helper';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import logo from '../../assets/icons/owndrive-logo.png';
import { getUsernameFromWebId, getContactRoute } from '../../utils/url';
import NavbarMenu from '../NavbarMenu/NavbarMenu';

const customFilter = (option, searchText) => {
    if (!option.value) {
        return true;
    }
    if (option.data.type === 'contact') {
        if (
            option.value.toLowerCase().includes(searchText.toLowerCase()) ||
            (option.data.contact.name &&
                option.data.contact.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase()))
        ) {
            return true;
        }
        return false;
    }
    if (option.value.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
    }
    return false;
};

const formatOptionLabel = ({ value, label, name, type, contact }) => {
    if (type === 'contact') {
        return (
            <div className={styles.optionContainer}>
                <div className={styles.iconContainer}>
                    <div
                        className={styles.contactIcon}
                        style={{
                            backgroundImage: `url('${
                                contact.picture ? contact.picture : defaultIcon
                            }')`,
                        }}
                    />
                </div>
                <span>{`${contact.name} (${contact.webId.replace(
                    '/profile/card#me',
                    ''
                )})`}</span>
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
                <span>{name}</span>
            </div>
        );
    }
};

const Navigation = ({
    resetError,
    webId,
    setCurrentPath,
    history,
    currentItem,
    contacts,
    currentPath,
    setCurrentContact,
    contactSearchResult,
    searchingContacts,
    searchContact,
    fetchContacts,
    loadContacts,
    dispatch,
    toggleSearchbar,
    isSearchBarExpanded,
}) => {
    const [typingTimer, setTypingTimer] = useState(null);

    useEffect(() => {
        if (!contacts && !loadContacts) fetchContacts(webId);
    }, []);

    const handleChange = (selected) => {
        resetError();
        if (selected.type === 'folder') {
            setCurrentPath(`${currentPath}${selected.name}/`);
            navigate('/home', history, dispatch);
        } else if (selected.type === 'file') {
            navigate(
                `/file?f=${currentPath + selected.value}`,
                history,
                dispatch
            );
        } else if (selected.type === 'contact') {
            const { contact } = selected;
            setCurrentContact(contact);
            navigate(getContactRoute(contact), history, dispatch);
        }
        if (isSearchBarExpanded) toggleSearchbar();
    };

    const handleInputChange = (searchText) => {
        clearTimeout(typingTimer);
        if (searchText !== '') {
            setTypingTimer(setTimeout(() => searchContact(searchText), 500));
        }
    };

    const getSearchDropdownOptions = () => {
        const contactSearchDropdownItems = contactSearchResult
            ? [...contactSearchResult]
            : [];
        const contactsDropdownItems = contacts ? [...contacts] : [];
        const contactOptions = [
            ...contactSearchDropdownItems,
            ...contactsDropdownItems,
        ].map((contact) => ({
            value: getUsernameFromWebId(contact.webId),
            type: 'contact',
            contact,
        }));

        const separator = {
            label: 'People',
            type: 'separator',
            isDisabled: true,
            loading: searchingContacts,
        };

        if (currentItem && currentItem.files && currentItem.folders) {
            const filesAndFolders = fileUtils
                .convertFilesAndFoldersToArray(
                    currentItem.files,
                    currentItem.folders
                )
                .map((resource) => ({
                    ...resource,
                    value: resource.name,
                }));
            return contactOptions.length > 0
                ? [...filesAndFolders, separator, ...contactOptions]
                : filesAndFolders;
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
                            setCurrentPath(
                                webId.replace('profile/card#me', '')
                            );
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
                {currentItem || contacts ? (
                    <SearchDropdown
                        className={styles.searchDropdown}
                        formatOptionLabel={formatOptionLabel}
                        onChange={handleChange}
                        onInputChange={handleInputChange}
                        placeholder="Search..."
                        items={getSearchDropdownOptions()}
                        loading={searchingContacts}
                        filterOption={customFilter}
                        toggleSearchbar={toggleSearchbar}
                        isSearchBarExpanded={isSearchBarExpanded}
                    />
                ) : null}
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
    contacts: state.contact.contacts,
    searchingContacts: state.contact.searchingContacts,
    contactSearchResult: state.contact.contactSearchResult,
    isSearchBarExpanded: state.app.isSearchBarExpanded,
    loadContacts: state.contact.loadContacts,
});

export default connect(mapStateToProps, (dispatch) => ({
    ...bindActionCreators(
        {
            setCurrentPath,
            setCurrentContact,
            searchContact,
            fetchContacts,
            toggleSearchbar,
        },
        dispatch
    ),
    dispatch,
}))(withRouter(Navigation));
