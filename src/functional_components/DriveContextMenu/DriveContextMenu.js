import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Menu, MenuProvider, Item } from 'react-contexify';
import styles from './DriveContextMenu.module.scss';
import fileUtils from '../../utils/fileUtils';
import {
    setSelection,
    copyItems,
    pasteItems,
    openConsentWindow,
    openCreateFileWindow,
    openCreateFolderWindow,
    openRenameWindow,
    toggleAccessWindow,
    setCurrentPath,
} from '../../actions/appActions';

export const DriveContextMenu = ({
    className,
    currentPath,
    selectedItems,
    setSelection,
    setCurrentPath,
    webId,
    clipboard,
    copyItems,
    pasteItems,
    openConsentWindow,
    openCreateFileWindow,
    openCreateFolderWindow,
    openRenameWindow,
    children,
    item,
    toggleAccessWindow,
}) => {
    const renderMenuItem = (option, index) => {
        return (
            <Item
                disabled={option.disabled}
                key={index + option.label}
                onClick={
                    !option.disabled
                        ? () => {
                              const onClickArg = item
                                  ? currentPath +
                                    (item.name ? item.name : item + '/')
                                  : currentPath;
                              option.onClick(onClickArg);
                          }
                        : undefined
                }
                className={classNames(styles.contextItem, {
                    [styles.disabled]: option.disabled,
                })}
            >
                <div
                    data-test-id={`contextmenu-${option.label.replace(
                        ' ',
                        '-'
                    )}`}
                >
                    {option.label}
                </div>
            </Item>
        );
    };

    const CONTEXTMENU_OPTIONS_DRIVE = [
        // {
        //     label: 'Info',
        //     onClick: toggleInfoWindow,
        //     disabled: false,
        // },
        {
            label: 'Copy',
            onClick: (item) => {
                if (selectedItems.length === 0) {
                    selectedItems.push(item);
                } else if (
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
            label: 'Rename',
            onClick: () =>
                openRenameWindow(
                    selectedItems.length === 1
                        ? selectedItems[0]
                        : currentPath + (item.name ? item.name : item + '/')
                ),
            disabled: !selectedItems || (!item && selectedItems.length !== 1),
        },
        {
            label: 'Manage Access',
            onClick: (item) => {
                if (item !== currentPath) setCurrentPath(item);
                toggleAccessWindow();
            },
            disabled: false,
        },
        // {
        //     label: 'Share*',
        //     onClick: (item) => fileUtils.changeAccess(item),
        //     disabled: true,
        // },
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
            onClick: (item) => {
                const deletable = fileUtils.addForDelete(item, selectedItems);
                if (deletable && deletable.length !== 0) {
                    setSelection(deletable);
                    openConsentWindow(deletable);
                }
            },
            disabled: false,
        },
    ];

    const menuIdentifier =
        (item ? (item.name ? item.name : item) : 'drive') + ' contextmenu';

    return (
        <>
            <MenuProvider
                className={classNames(styles.menu, className)}
                id={menuIdentifier}
            >
                {children}
            </MenuProvider>
            <Menu className={styles.contextMenu} id={menuIdentifier}>
                {CONTEXTMENU_OPTIONS_DRIVE
                    ? CONTEXTMENU_OPTIONS_DRIVE.map((option, index) =>
                          renderMenuItem(option, index)
                      )
                    : null}
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
    toggleAccessWindow,
    setCurrentPath,
})(DriveContextMenu);
