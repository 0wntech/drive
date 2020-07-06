import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import styles from './DriveMenu.module.scss';
import { logout } from '../../actions/userActions';
import {
    toggleDriveMenu,
    copyItems,
    pasteItems,
    openConsentWindow,
    openCreateFileWindow,
    openCreateFolderWindow,
    openRenameWindow,
} from '../../actions/appActions';
import Trash2 from '../../assets/svgIcons/Trash2';
import Edit3 from '../../assets/svgIcons/Edit3';
import Copy from '../../assets/svgIcons/Copy';
import Clipboard from '../../assets/svgIcons/Clipboard';
import FolderPlus from '../../assets/svgIcons/FolderPlus';
import FilePlus from '../../assets/svgIcons/FilePlus';
import Logout from '../../assets/svgIcons/LogOut';

export const DriveMenu = ({
    isDriveMenuVisible,
    selectedItems,
    renderOption,
    toggleDriveMenu,
    clipboard,
    pasteItems,
    copyItems,
    currentPath,
    openConsentWindow,
    openCreateFileWindow,
    openCreateFolderWindow,
    openRenameWindow,
    logout,
}) => {
    const defaultRender = (option) => {
        return (
            <div
                key={option.label}
                onClick={
                    !option.disabled
                        ? () => {
                              option.onClick();
                              toggleDriveMenu();
                          }
                        : undefined
                }
                className={classNames(styles.option, {
                    [styles.disabled]: option.disabled,
                    [styles.red]: !option.disabled && option.red,
                })}
            >
                {option.icon}
                <div className={styles.optionLabel}>{option.label}</div>
            </div>
        );
    };

    const options = [
        {
            label: 'Copy',
            onClick: () => {
                copyItems(selectedItems);
            },
            disabled: !selectedItems || selectedItems.length === 0,
            icon: <Copy />,
        },
        {
            label: 'Paste',
            onClick: () => pasteItems(clipboard, currentPath),
            disabled: !clipboard || clipboard.length === 0,
            icon: <Clipboard />,
        },
        {
            label: 'Rename',
            onClick: () => openRenameWindow(selectedItems[0]),
            disabled: !selectedItems || selectedItems.length !== 1,
            icon: <Edit3 />,
        },
        {
            label: 'Create Folder',
            onClick: openCreateFolderWindow,
            icon: <FolderPlus />,
        },
        {
            label: 'Create File',
            onClick: openCreateFileWindow,
            icon: <FilePlus />,
        },
        {
            label: 'Delete',
            onClick: openConsentWindow,
            disabled: !selectedItems || selectedItems.length === 0,
            icon: <Trash2 />,
            red: true,
        },
        {
            label: 'Logout',
            onClick: logout,
            icon: <Logout />,
        },
    ];

    return isDriveMenuVisible ? (
        <div
            className={styles.wrapper}
            onClick={(e) => {
                toggleDriveMenu();
            }}
        >
            <div
                className={styles.container}
                onClick={(e) => {
                    toggleDriveMenu();
                }}
            >
                {renderOption
                    ? options.map((option, index) => (
                          <div key={index} className={styles.option}>
                              {renderOption(option)}
                          </div>
                      ))
                    : options.map((option) => defaultRender(option))}
            </div>
        </div>
    ) : (
        <></>
    );
};

const mapStateToProps = (state) => ({
    selectedItems: state.app.selectedItems,
    clipboard: state.app.clipboard,
    currentPath: state.app.currentPath,
});

export default connect(mapStateToProps, {
    toggleDriveMenu,
    logout,
    copyItems,
    pasteItems,
    openConsentWindow,
    openCreateFileWindow,
    openCreateFolderWindow,
    openRenameWindow,
})(DriveMenu);
