import React, { useEffect } from 'react';
import classNames from 'classnames';
import url from 'url';
import mime from 'mime';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './Drive.module.scss';
import Breadcrumbs from '../Breadcrumbs';
import ItemList from '../ItemList';
import { getBreadcrumbsFromUrl, getRootFromWebId } from '../../utils/url';
import folder from '../../assets/icons/Folder.png';
import fileIcon from '../../assets/icons/File.png';
import { Layout } from '../Layout';
import {
    setCurrentPath,
    setSelection,
    sendNotification,
    fetchCurrentItem,
    openConsentWindow,
    toggleSearchbar,
    toggleDriveMenu,
    openCreateFolderWindow,
    downloadFile,
    uploadFileOrFolder,
} from '../../actions/appActions';
import ToolbarButtons from '../ToolbarButtons';
import { handleError } from '../../utils/helper';
import { getParentFolderUrl } from '../../utils/url';
import Windows from '../Windows';
import DriveContextMenu from '../DriveContextMenu';
import BackButton from '../BackButton';
import DriveMenu from '../DriveMenu';
import SelectModeButton from '../SelectModeButton';
import AccessDisplay from '../AccessDisplay/AccessDisplay';
import BottomOverlay from '../BottomOverlay/BottomOverlay';

const Drive = ({
    selectedItems,
    selectionMode,
    setSelection,
    currentItem,
    currentPath,
    loadCurrentItem,
    openConsentWindow,
    openCreateFolderWindow,
    toggleDriveMenu,
    isDriveMenuVisible,
    webId,
    setCurrentPath,
    fetchCurrentItem,
    history,
    downloadFile,
    uploadFileOrFolder,
    uploadingFiles,
    error,
    loadDeletion,
    loadPaste,
    toggleSearchbar,
    isSearchBarExpanded,
    isAccessWindowVisible,
}) => {
    const appState = JSON.parse(localStorage.getItem('appState'));
    useEffect(() => {
        if (!loadCurrentItem && (!currentItem || !currentItem.files)) {
            if (!currentPath && appState && appState.currentPath) {
                setCurrentPath(appState.currentPath);
            } else if (!currentPath && webId) {
                setCurrentPath(getRootFromWebId(webId));
            } else {
                setCurrentPath(getParentFolderUrl(currentPath));
            }
        }
        return () => {
            localStorage.setItem(
                'appState',
                JSON.stringify({
                    ...appState,
                    currentPath: currentPath,
                })
            );
        };
    }, [currentPath]);
    handleError(error);
    // Event Handlers
    const loadFile = (url) => {
        if (url.endsWith('/')) {
            url = url.substr(0, url.lastIndexOf('/'));
        }
        if (selectionMode && !selectedItems.includes(url)) {
            const newSelection = [...selectedItems, url];
            setSelection(newSelection);
        } else if (selectionMode && selectedItems.includes(url)) {
            const newSelection = selectedItems.filter((item) => item !== url);
            setSelection(newSelection);
        } else {
            history.push(`/file?f=${url}`);
        }
    };
    const loadFolder = (path) => {
        if (selectionMode && !selectedItems.includes(path)) {
            const newSelection = [...selectedItems, path];
            setSelection(newSelection);
        } else if (selectionMode && selectedItems.includes(path)) {
            const newSelection = selectedItems.filter((item) => item !== path);
            setSelection(newSelection);
        } else {
            setCurrentPath(path);
            fetchCurrentItem(path, true);
        }
    };

    const clearSelection = (e) => {
        if (
            typeof e.target.className === 'string' &&
            (e.target.className.includes('Drive_') ||
                e.target.className.includes('Layout_') ||
                e.target.className.includes('ItemList_'))
        ) {
            console.log('Emptying selection');
            setSelection([]);
        }
    };

    const handleClick = (e) => {
        clearSelection(e);
    };

    const downloadItems = () => {
        selectedItems.forEach((item) => {
            const file = mime.getType(item);
            if (file) {
                downloadFile(item);
            } else {
                const download =
                    webId.replace('profile/card#me', 'download?path=') +
                    url.parse(item).pathname;
                window.open(download.replace(/\/+$/, ''));
            }
        });
    };

    // toolbar fragments
    const toolbarRight = (
        <ToolbarButtons
            onFolderUpload={uploadFileOrFolder}
            onDownload={downloadItems}
            onFileUpload={uploadFileOrFolder}
            onDelete={() => {
                if (selectedItems.length !== 0) {
                    openConsentWindow(selectedItems);
                }
            }}
            onCreateFolder={openCreateFolderWindow}
            onMore={toggleDriveMenu}
        />
    );

    const toolbarLeft = webId ? (
        <div className={styles.breadcrumbsContainer}>
            <Breadcrumbs
                onClick={(path) => {
                    setCurrentPath(path);
                }}
                breadcrumbs={
                    currentPath ? getBreadcrumbsFromUrl(currentPath) : null
                }
                webId={webId}
            />
        </div>
    ) : null;

    const noFilesAndFolders = () => {
        return currentItem.folders.length < 1 && currentItem.files.length < 1;
    };

    return (
        <Layout
            toolbarChildrenLeft={toolbarLeft}
            toolbarChildrenRight={toolbarRight}
            className={classNames(styles.grid, {
                [styles.noScroll]: isDriveMenuVisible || isAccessWindowVisible,
            })}
            label="Drive"
            onClick={handleClick}
            isLoading={
                loadDeletion || loadPaste || loadCurrentItem || uploadingFiles
            }
        >
            <DriveMenu
                isDriveMenuVisible={isDriveMenuVisible}
                selectedItems={selectedItems}
            />
            <DriveContextMenu
                className={styles.mainArea}
                drive
                id="drive contextmenu"
            >
                <div className={styles.container}>
                    <Windows />
                    {currentPath &&
                    currentItem &&
                    currentItem.folders &&
                    currentItem.files &&
                    !noFilesAndFolders() ? (
                        <div>
                            {currentItem.folders.length > 0 && (
                                <ItemList
                                    selectedItems={selectedItems}
                                    items={currentItem.folders}
                                    currPath={currentPath}
                                    image={folder}
                                    onItemClick={
                                        isSearchBarExpanded
                                            ? toggleSearchbar
                                            : loadFolder
                                    }
                                />
                            )}
                            {currentItem.files.length > 0 && (
                                <ItemList
                                    selectedItems={selectedItems}
                                    isFile
                                    items={currentItem.files}
                                    currPath={currentPath}
                                    image={fileIcon}
                                    onItemClick={
                                        isSearchBarExpanded
                                            ? toggleSearchbar
                                            : loadFile
                                    }
                                />
                            )}
                        </div>
                    ) : (
                        <p className={styles.emptyMessage}>
                            This folder is empty
                        </p>
                    )}
                    <BottomOverlay>
                        <BackButton />
                        <SelectModeButton />
                        <AccessDisplay />
                    </BottomOverlay>
                </div>
            </DriveContextMenu>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        currentItem: state.app.currentItem,
        currentPath: state.app.currentPath,
        selectedItems: state.app.selectedItems,
        selectionMode: state.app.selectionMode,
        webId: state.user.webId,
        clipboard: state.app.clipboard,
        error: state.app.error,
        loadDeletion: state.app.loadDeletion,
        loadPaste: state.app.loadPaste,
        loadCurrentItem: state.app.loadCurrentItem,
        isSearchBarExpanded: state.app.isSearchBarExpanded,
        isDriveMenuVisible: state.app.isDriveMenuVisible,
        isAccessWindowVisible: state.app.isAccessWindowVisible,
        uploadingFiles: state.app.uploadingFiles,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        openConsentWindow,
        openCreateFolderWindow,
        toggleDriveMenu,
        setCurrentPath,
        sendNotification,
        fetchCurrentItem,
        setSelection,
        toggleSearchbar,
        downloadFile,
        uploadFileOrFolder,
    })(Drive)
);
