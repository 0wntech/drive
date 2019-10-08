import React, { useState } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import styles from './Navigation.module.css';
import SearchDropdown from '../SearchDropdown/SearchDropdown';
import FileIcon from '../../assets/icons/File.png';
import FolderIcon from '../../assets/icons/Folder.png';
import fileUtils from '../../utils/fileUtils';
import { connect } from 'react-redux';
import { setCurrentPath, setCurrentContact } from '../../actions/UserActions';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import DropdownMenu from '../DropdownMenu';
import ActionButton from '../ActionButton/ActionButton';

const Navigation = ({
    picture,
    webId,
    onLogin,
    onLogout,
    toggleSidebar,
    setCurrentPath,
    username,
    history,
    items,
    contacts,
    currentPath,
    setCurrentContact,
}) => {
    const DROPDOWN_OPTIONS = [
        { onClick: () => history.push('/profile'), label: 'Profile' },
        { onClick: () => console.log('test2'), label: 'Settings*' },
        { onClick: () => console.log('test2'), label: 'Notifications*' },
        { onClick: () => history.push('/contacts'), label: 'Contacts' },
        { onClick: () => onLogout(), label: 'Logout' },
    ];
    const [isDropdownExpanded, setDropdownExpanded] = useState(false);
    const handleChange = (selected) => {
        if (selected.type === 'folder') {
            setCurrentPath(`${currentPath}/${selected.name}/`);
            history.push('/home');
        } else if (selected.type === 'file') {
            console.log('implement redux on file click');
        } else if (selected.type === 'contact') {
            setCurrentContact(selected.value);
            history.push('/contact');
        }
    };

    const getSearchDropdownOptions = () => {
        const filesAndFolders = fileUtils
            .convertFilesAndFoldersToArray(items.files, items.folders)
            .map((item) => ({
                ...item,
                value: item.name,
                label: item.label,
            }));
        const contactOptions = contacts.map((contact) => ({
            value: { ...contact },
            type: 'contact',
        }));
        const separator = {
            label: 'People',
            type: 'separator',
            isDisabled: true,
        };
        return [...filesAndFolders, separator, ...contactOptions];
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
            {console.log('iteeeeems', items)}
            <div className={styles.search}>
                {items ? (
                    <SearchDropdown
                        className={styles.searchDropdown}
                        formatOptionLabel={formatOptionLabel}
                        onChange={handleChange}
                        items={
                            items && contacts
                                ? getSearchDropdownOptions()
                                : null
                        }
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

const formatOptionLabel = ({ value, label, name, type }) => {
    if (type === 'contact') {
        return (
            <div className={styles.optionContainer}>
                <div className={styles.iconContainer}>
                    <div
                        className={styles.contactIcon}
                        style={{
                            backgroundImage: `url('${value.picture}')`,
                        }}
                    />
                </div>
                <span>{`${value.name} (${value.webId.replace(
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
});
export default connect(
    mapStateToProps,
    { setCurrentPath, setCurrentContact }
)(withRouter(Navigation));
