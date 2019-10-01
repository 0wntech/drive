import React, { useState } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import styles from './Navigation.module.css';
import SearchDropdown from '../SearchDropdown/SearchDropdown';
import FileIcon from '../../assets/icons/File.png';
import FolderIcon from '../../assets/icons/Folder.png';
import fileUtils from '../../utils/fileUtils';
import { connect } from 'react-redux';
import { setCurrentPath } from '../../actions/UserActions';
import defaultIcon from '../../assets/icons/defaultUserPic.png';
import DropdownMenu from '../DropdownMenu';
import ActionButton from '../ActionButton/ActionButton';

const Navigation = ({
    picture,
    webId,
    onLogin,
    onLogout,
    toggleSidebar,
    username,
    history,
    items,
    currentPath,
}) => {
    const DROPDOWN_OPTIONS = [
        { onClick: () => history.push('/profile'), label: 'Profile' },
        { onClick: () => console.log('test2'), label: 'Settings*' },
        { onClick: () => console.log('test2'), label: 'Notifications*' },
        { onClick: () => history.push('/contacts'), label: 'Contacts' },
        { onClick: () => onLogout(), label: 'Logout' },
    ];
    const [isDropdownExpanded, setDropdownExpanded] = useState(false);

    const formatOptionLabel = ({ value, label, name, type }) => (
        <div
            className={styles.optionContainer}
            onClick={
                type === 'folder'
                    ? () => {
                          setCurrentPath(`${currentPath}/${name}/`);
                      }
                    : () => {
                          console.log('Implement Redux File onClickbehavior');
                      }
            }
        >
            <img
                className={styles.optionIcon}
                src={type === 'file' ? FileIcon : FolderIcon}
            />
            <span>{name}</span>
        </div>
    );

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
                        items={fileUtils
                            .convertFilesAndFoldersToArray(
                                items.files,
                                items.folders
                            )
                            .map((item) => ({
                                ...item,
                                value: item.name,
                                label: item.label,
                            }))}
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

const mapStateToProps = (state) => ({
    currentPath: state.app.currentPath,
    items: state.app.currentItems,
});
export default connect(mapStateToProps)(withRouter(Navigation));
