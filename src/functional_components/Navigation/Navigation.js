import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './Navigation.module.css';
import SearchDropdown from '../SearchDropdown/SearchDropdown';
import FileIcon from '../../assets/icons/File.png';
import FolderIcon from '../../assets/icons/Folder.png';
import fileUtils from '../../utils/fileUtils';
import { setCurrentPath } from '../../actions/appActions';
import { navigate } from '../../utils/helper';
import { searchContact, setCurrentContact } from '../../actions/contactActions';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import { getUsernameFromWebId } from '../../utils/url';
import NavbarMenu from '../NavbarMenu/NavbarMenu';

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
    dispatch,
}) => {
    const [typingTimer, setTypingTimer] = useState(null);

    const handleChange = (selected) => {
        resetError();
        if (selected.type === 'folder') {
            setCurrentPath(`${currentPath}/${selected.name}/`);
            navigate('/home', history, dispatch);
        } else if (selected.type === 'file') {
            navigate(
                `/file?f=${currentPath + selected.value}`,
                history,
                dispatch
            );
        } else if (selected.type === 'contact') {
            setCurrentContact(selected.contact);
            navigate('/contact', history, dispatch);
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
        <div className={styles.container}>
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
                        items={getSearchDropdownOptions()}
                        loading={searchingContacts}
                        filterOption={customFilter}
                    />
                ) : null}
            </div>
            <NavbarMenu
                resetError={resetError}
                className={styles.menuWrapper}
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
    webId: state.user.webId,
    currentPath: state.app.currentPath,
    currentItem: state.app.currentItem,
    contacts: state.contact.contacts,
    searchingContacts: state.contact.searchingContacts,
    contactSearchResult: state.contact.contactSearchResult,
});
export default connect(mapStateToProps, (dispatch) => ({
    ...bindActionCreators(
        { setCurrentPath, setCurrentContact, searchContact },
        dispatch
    ),
    dispatch,
}))(withRouter(Navigation));
