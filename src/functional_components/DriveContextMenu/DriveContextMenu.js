import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Menu, MenuProvider } from 'react-contexify';
import styles from './DriveContextMenu.module.css';
import fileUtils from '../../utils/fileUtils';
import { Item } from '../Item';
import {
    setSelection,
    copyItems,
    pasteItems,
    openConsentWindow,
    openCreateFileWindow,
    openCreateFolderWindow,
    openRenameWindow,
} from '../../actions/appActions';

export const CursorMenu = ({
    className,
    currentPath,
    selectedItems,
    webId,
    clipboard,
    copyItems,
    pasteItems,
    openConsentWindow,
    openCreateFileWindow,
    openCreateFolderWindow,
    children,
}) => {
    const renderMenuItem = (option, index) => {
        return (
            <Item
                disabled={option.disabled}
                key={index + option.label}
                onClick={
                    !option.disabled
                        ? () => {
                              option.onClick(currentPath);
                          }
                        : undefined
                }
                className={classNames(styles.contextItem, {
                    [styles.disabled]: option.disabled,
                })}
            >
                <div>{option.label}</div>
            </Item>
        );
    };

    const CONTEXTMENU_OPTIONS_DRIVE = [
        {
            label: 'Info',
            onClick: (item) => fileUtils.getInfo(item),
            disabled: false,
        },
        {
            label: 'Copy',
            onClick: (item) => {
                if (
                    !selectedItems.includes(item) &&
                    item !== webId.replace('profile/card#me', '')
                ) {
                    selectedItems.push(item);
                }
                copyItems(selectedItems);
            },
            disabled: false,
        },
        {
            label: 'Paste',
            onClick: () => pasteItems(clipboard, currentPath),
            disabled: clipboard && clipboard.length === 0,
        },
        {
            label: 'Manage Access',
            onClick: (item) => fileUtils.changeAccess(item),
            disabled: false,
        },
        {
            label: 'Share*',
            onClick: (item) => fileUtils.changeAccess(item),
            disabled: true,
        },
        {
            label: 'Create Folder',
            onClick: openCreateFolderWindow,
        },
        {
            label: 'Create File',
            onClick: openCreateFileWindow,
        },
        {
            label: 'Delete',
            onClick: (item) => openConsentWindow(item),
            disabled: false,
        },
    ];

    return (
        <>
            <MenuProvider className={classNames(styles.menu, className)}>
                {children}
            </MenuProvider>
            <Menu className={styles.contextMenu} id={'drive contextmenu'}>
                {CONTEXTMENU_OPTIONS_DRIVE &&
                    CONTEXTMENU_OPTIONS_DRIVE.map((option, index) =>
                        renderMenuItem(option, index)
                    )}
            </Menu>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        webId: state.user.webId,
        clipboard: state.app.clipboard,
        currentPath: state.app.currentPath,
        selectedItems: state.app.selectedItems,
    };
};

export default connect(mapStateToProps, {
    setSelection,
    copyItems,
    pasteItems,
    openRenameWindow,
    openConsentWindow,
    openCreateFileWindow,
    openCreateFolderWindow,
})(CursorMenu);
