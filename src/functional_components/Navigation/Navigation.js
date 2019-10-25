import React, { useState } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Navigation.module.css';
import SearchDropdown from '../SearchDropdown/SearchDropdown';
import FileIcon from '../../assets/icons/File.png';
import FolderIcon from '../../assets/icons/Folder.png';
import fileUtils from '../../utils/fileUtils';
import {
    setCurrentPath,
    setCurrentContact,
    searchContact,
} from '../../actions/UserActions';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import DropdownMenu from '../DropdownMenu';
import ActionButton from '../ActionButton/ActionButton';
import { getUsernameFromWebId } from '../../utils/url';

const Navigation = ({
    picture,
    webId,
    onLogout,
    setCurrentPath,
    username,
    history,
    items,
    contacts,
    currentPath,
    setCurrentContact,
    contactSearchResult,
    searchingContacts,
    searchContact,
}) => {
    const DROPDOWN_OPTIONS = [
        { onClick: () => history.push('/profile'), label: 'Profile' },
        { onClick: () => console.log('test2'), label: 'Settings*' },
        { onClick: () => console.log('test2'), label: 'Notifications*' },
        { onClick: () => history.push('/contacts'), label: 'Contacts' },
        { onClick: () => onLogout(), label: 'Logout' },
    ];
    const [isDropdownExpanded, setDropdownExpanded] = useState(false);
    const [typingTimer, setTypingTimer] = useState(null);

    const handleChange = (selected) => {
        if (selected.type === 'folder') {
            setCurrentPath(`${currentPath}/${selected.name}/`);
            history.push('/home');
        } else if (selected.type === 'file') {
            console.log('implement redux on file click');
        } else if (selected.type === 'contact') {
            setCurrentContact(selected.contact);
            history.push('/contact');
        }
    };

    const handleInputChange = (searchText) => {
        clearTimeout(typingTimer);
        if (searchText !== '') {
            setTypingTimer(setTimeout(() => searchContact(searchText), 500));
        }
    };

    const getSearchDropdownOptions = () => {
        const filesAndFolders = fileUtils
            .convertFilesAndFoldersToArray(items.files, items.folders)
            .map((item) => ({
                ...item,
                value: item.name,
            }));

        const contactOptions = [...contactSearchResult, ...contacts].map(
            (contact) => ({
                value: getUsernameFromWebId(contact.webId),
                type: 'contact',
                contact,
            })
        );

        const separator = {
            label: 'People',
            type: 'separator',
            isDisabled: true,
        };
        return contactOptions.length > 0
            ? [...filesAndFolders, separator, ...contactOptions]
            : filesAndFolders;
    };
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
            <div className={styles.search}>
                {items ? (
                    <SearchDropdown
                        className={styles.searchDropdown}
                        formatOptionLabel={formatOptionLabel}
                        onChange={handleChange}
                        onInputChange={handleInputChange}
                        placeholder="Search..."
                        items={getSearchDropdownOptions()}
                        loading={searchingContacts}
                        filterOption={customFilter}
                    />
                ) : null}
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

const customFilter = (option, searchText) => {
    console.log('option', option);
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
                        className={
                            type === 'file'
                                ? styles.fileIcon
                                : styles.folderIcon
                        }
                        src={type === 'file' ? FileIcon : FolderIcon}
                    />
                </div>
                <span>{name}</span>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    currentPath: state.app.currentPath,
    items: state.app.currentItems,
    contacts: state.app.contacts,
    searchingContacts: state.app.searchingContacts,
    contactSearchResult: state.app.contactSearchResult,
});
export default connect(
    mapStateToProps,
    { setCurrentPath, setCurrentContact, searchContact }
)(withRouter(Navigation));
