import React, { Fragment } from 'react';
import styles from './Windows.module.css';
import { DeleteWindow } from '../DeleteWindow';
import { InputWindow } from '../InputWindow';
import RenameWindow from '../RenameWindow/RenameWindow';
import {
    deleteItems,
    renameItem,
    closeConsentWindow,
    closeCreateFileWindow,
    closeCreateFolderWindow,
    closeRenameWindow,
    createFile,
    createFolder,
} from '../../actions/UserActions';
import { connect } from 'react-redux';

export const Windows = (props) => {
    const {
        isConsentWindowVisible,
        isCreateFileVisible,
        isCreateFolderVisible,
        isRenameWindowVisible,
        renamedItem,
        selectedItems,
        currentPath,
    } = props;

    return (
        <Fragment>
            <DeleteWindow
                windowName="Delete File"
                selectedItems={selectedItems}
                onSubmit={(selectedItems) => {
                    deleteItems(selectedItems, currentPath);
                }}
                className={
                    isConsentWindowVisible ? styles.visible : styles.hidden
                }
                onClose={closeConsentWindow}
            ></DeleteWindow>
            <InputWindow
                windowName="Create Folder"
                info=""
                onSubmit={(value) => createFolder(value, currentPath)}
                className={
                    isCreateFolderVisible ? styles.visible : styles.hidden
                }
                onClose={closeCreateFolderWindow}
                placeholder={'Untitled'}
            />
            <InputWindow
                windowName="Create File"
                info=""
                onSubmit={(value) => createFile(value, currentPath)}
                className={isCreateFileVisible ? styles.visible : styles.hidden}
                onClose={closeCreateFileWindow}
                placeholder={'Untitled'}
            />
            <RenameWindow
                windowName="Rename File"
                info="Enter a new name:"
                placeholder={renamedItem ? renamedItem : 'Untitled'}
                onSubmit={(value) =>
                    renameItem(renamedItem, encodeURIComponent(value))
                }
                className={
                    isRenameWindowVisible ? styles.visible : styles.hidden
                }
                onClose={closeRenameWindow}
            />
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        isRenameWindowVisible: state.app.isRenameWindowVisible,
        isCreateFileVisible: state.app.isCreateFileVisible,
        isCreateFolderVisible: state.app.isCreateFolderVisible,
        isConsentWindowVisible: state.app.isConsentWindowVisible,
        selectedItems: state.app.selectedItems,
        currentPath: state.app.currentPath,
        renamedItem: state.app.renamedItem,
    };
};

export default connect(
    mapStateToProps,
    {
        deleteItems,
        renameItem,
        closeConsentWindow,
        closeCreateFileWindow,
        closeCreateFolderWindow,
        closeRenameWindow,
        createFile,
        createFolder,
    }
)(Windows);