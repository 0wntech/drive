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
    toggleAccessWindow,
} from '../../actions/appActions';
import { connect } from 'react-redux';
import AccessWindow from '../AccessWindow';

export const Windows = ({
    isConsentWindowVisible,
    isCreateFileVisible,
    isCreateFolderVisible,
    isRenameWindowVisible,
    isAccessWindowVisible,
    renamedItem,
    selectedItems,
    currentItem,
    currentPath,
    deleteItems,
    renameItem,
    closeConsentWindow,
    closeCreateFileWindow,
    closeCreateFolderWindow,
    closeRenameWindow,
    createFile,
    createFolder,
}) => {
    return (
        <Fragment>
            <DeleteWindow
                selectedItems={selectedItems}
                onSubmit={(selectedItems) => {
                    deleteItems(selectedItems, currentPath);
                }}
                visible={isConsentWindowVisible}
                onClose={closeConsentWindow}
            ></DeleteWindow>
            <InputWindow
                windowName="Create Folder"
                info=""
                visible={isCreateFolderVisible}
                onSubmit={(value) => createFolder(value, currentPath)}
                onClose={closeCreateFolderWindow}
                placeholder={'Untitled'}
                currentItem={currentItem}
            />
            <InputWindow
                windowName="Create File"
                info=""
                onSubmit={(value) => createFile(value, currentPath)}
                className={isCreateFileVisible ? styles.visible : styles.hidden}
                visible={isCreateFileVisible}
                onClose={closeCreateFileWindow}
                placeholder={'Untitled'}
                currentItem={currentItem}
            />
            <RenameWindow
                windowName="Rename File"
                info="Enter a new name:"
                placeholder={renamedItem ? renamedItem : 'Untitled'}
                currentItem={currentItem}
                onSubmit={(value) =>
                    renameItem(renamedItem, encodeURIComponent(value))
                }
                visible={isRenameWindowVisible}
                onClose={closeRenameWindow}
            />
            <AccessWindow />
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        isRenameWindowVisible: state.app.isRenameWindowVisible,
        isCreateFileVisible: state.app.isCreateFileVisible,
        isCreateFolderVisible: state.app.isCreateFolderVisible,
        isConsentWindowVisible: state.app.isConsentWindowVisible,
        isAccessWindowVisible: state.app.isAccessWindowVisible,
        selectedItems: state.app.selectedItems,
        currentPath: state.app.currentPath,
        currentItem: state.app.currentItem,
        renamedItem: state.app.renamedItem,
    };
};

export default connect(mapStateToProps, {
    deleteItems,
    renameItem,
    closeConsentWindow,
    closeCreateFileWindow,
    closeCreateFolderWindow,
    closeRenameWindow,
    createFile,
    createFolder,
    toggleAccessWindow,
})(Windows);
