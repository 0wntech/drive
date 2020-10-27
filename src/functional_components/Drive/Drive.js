import React, { useEffect } from 'react';
import classNames from 'classnames';
import url from 'url';
import mime from 'mime';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './Drive.module.scss';
import Breadcrumbs from '../Breadcrumbs';
import ItemList from '../ItemList';
import {
    getBreadcrumbsFromUrl,
    getFileRoute,
    getHomeRoute,
    getRootFromWebId,
    useParamsFromUrl,
} from '../../utils/url';
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
import { setStorageUrl, fetchUser } from '../../actions/userActions';
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
    rootUrl,
    loadCurrentItem,
    openConsentWindow,
    openCreateFolderWindow,
    toggleDriveMenu,
    isDriveMenuVisible,
    user,
    webId,
    loadUser,
    setCurrentPath,
    currentPath,
    setStorageUrl,
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
    const { path } = useParamsFromUrl();
    const routeUrl = url.resolve(rootUrl, path ?? '');
    const appState = JSON.parse(localStorage.getItem('appState'));
    useEffect(() => {
        if (!loadUser && !user) {
            fetchUser(webId);
        }

        if (currentPath !== routeUrl && !loadCurrentItem) {
            if (mime.getType(routeUrl)) {
                history.push(getFileRoute(routeUrl));
            } else {
                setCurrentPath(routeUrl);
            }
        } else if (
            !loadCurrentItem &&
            !loadUser &&
            (!currentItem || !currentItem.files)
        ) {
            if (
                !currentPath &&
                appState &&
                appState.currentPath &&
                url.parse(webId).host === url.parse(appState.currentPath).host
            ) {
                setCurrentPath(appState.currentPath);
            } else if (!currentPath && user.storage) {
                setCurrentPath(user.storage);
            } else if (!currentPath && !user.storage && user.webId) {
                setStorageUrl(getRootFromWebId(user.webId), user.webId);
                setCurrentPath(getRootFromWebId(user.webId));
            } else {
                setCurrentPath(getParentFolderUrl(currentPath));
            }
        }
    }, [currentPath, routeUrl, user]);
    handleError(error);
    // Event Handlers
    const loadFile = (fileUrl) => {
        if (fileUrl.endsWith('/')) {
            fileUrl = fileUrl.substr(0, fileUrl.lastIndexOf('/'));
        }
        if (selectionMode && !selectedItems.includes(fileUrl)) {
            const newSelection = [...selectedItems, fileUrl];
            setSelection(newSelection);
        } else if (selectionMode && selectedItems.includes(fileUrl)) {
            const newSelection = selectedItems.filter(
                (item) => item !== fileUrl
            );
            setSelection(newSelection);
        } else {
            history.push(
                `/file/${encodeURIComponent(url.parse(fileUrl).pathname)}`
            );
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
            history.push(
                `/home/${encodeURIComponent(url.parse(path).pathname)}`
            );
        }
    };

    const clearSelection = (e) => {
        if (
            typeof e.target.className === 'string' &&
            (e.target.className.includes('Drive_') ||
                e.target.className.includes('Layout_') ||
                e.target.className.includes('ItemList_'))
        ) {
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
                    user.webId.replace('profile/card#me', 'download?path=') +
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

    const toolbarLeft = currentPath && rootUrl && (
        <div className={styles.breadcrumbsContainer}>
            <Breadcrumbs
                onClick={(path) => {
                    history.push(getHomeRoute(path));
                }}
                breadcrumbs={
                    currentPath
                        ? getBreadcrumbsFromUrl(currentPath, rootUrl)
                        : null
                }
                rootUrl={rootUrl}
            />
        </div>
    );

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
            onClick={handleClick}
            label="Drive"
            isLoading={
                loadDeletion ||
                loadPaste ||
                loadCurrentItem ||
                uploadingFiles ||
                loadUser
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
        rootUrl: state.app.rootUrl,
        selectedItems: state.app.selectedItems,
        selectionMode: state.app.selectionMode,
        user: state.user.user,
        webId: state.user.webId,
        loadUser: state.user.loadUser,
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
        setStorageUrl,
    })(Drive)
);
