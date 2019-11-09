import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './Navigation.module.css';
import SearchDropdown from '../SearchDropdown/SearchDropdown';
import FileIcon from '../../assets/icons/File.png';
import FolderIcon from '../../assets/icons/Folder.png';
import fileUtils from '../../utils/fileUtils';
import { setCurrentPath } from '../../actions/appActions';
import { searchContact, setCurrentContact } from '../../actions/contactActions';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import { getUsernameFromWebId } from '../../utils/url';
import NavbarMenu from '../NavbarMenu/NavbarMenu';

const Navigation = ({
    picture,
    webId,
    onLogout,
    setCurrentPath,
    username,
    history,
    currentItem,
    contacts,
    currentPath,
    setCurrentContact,
    contactSearchResult,
    searchingContacts,
    searchContact,
}) => {
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

        if (!currentItem.files && !currentItem.folders) {
            return contactOptions.length > 0 ? contactOptions : undefined;
        } else {
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
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.brandWrapper}>
                <img
                    alt="logo"
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
                {currentItem ? (
                    <SearchDropdown
                        className={styles.searchDropdown}
                        formatOptionLabel={formatOptionLabel}
                        onChange={handleChange}
                        onInputChange={handleInputChange}
                        placeholder="Search..."
                        currentItem={getSearchDropdownOptions()}
                        loading={searchingContacts}
                        filterOption={customFilter}
                    />
                ) : null}
            </div>
            <NavbarMenu
                className={styles.menuWrapper}
                onLogout={onLogout}
                webId={webId}
                picture={picture}
                username={username}
            />
        </div>
    );
};

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
    currentItem: state.app.currentcurrentItem,
    contacts: state.contact.contacts,
    searchingContacts: state.contact.searchingContacts,
    contactSearchResult: state.contact.contactSearchResult,
});
export default connect(
    mapStateToProps,
    { setCurrentPath, setCurrentContact, searchContact }
)(withRouter(Navigation));
