import React, { useEffect } from 'react';
import url from 'url';
import mime from 'mime';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './Drive.module.scss';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { ItemList } from '../ItemList';
import fileUtils from '../../utils/fileUtils';
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
    setSearchbarStatus,
} from '../../actions/appActions';
import ToolbarButtons from '../ToolbarButtons/ToolbarButtons';
import { isCmdPressed, handleError } from '../../utils/helper';
import Windows from '../Windows/Windows';
import DriveContextMenu from '../DriveContextMenu/DriveContextMenu';
import { getParentFolderUrl } from '../../utils/url';

const Drive = ({
    selectedItems,
    currentItem,
    currentPath,
    loadCurrentItem,
    openConsentWindow,
    webId,
    setCurrentPath,
    setSelection,
    fetchCurrentItem,
    history,
    downloadFile,
    error,
    loadDeletion,
    loadPaste,
    setSearchbarStatus,
    isSearchBarExpanded,
}) => {
    const appState = JSON.parse(localStorage.getItem('appState'));
    useEffect(() => {
        if (!loadCurrentItem && (!currentItem || !currentItem.files)) {
            if (!currentPath) {
                currentPath =
                    appState && appState.currentPath
                        ? appState.currentPath
                        : getRootFromWebId(webId);
                setCurrentPath(currentPath);
            } else {
                currentPath = getParentFolderUrl(currentPath);
                setCurrentPath(currentPath);
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
    }, []);
    handleError(error);
    // Event Handlers
    const loadFile = (url, event = {}) => {
        if (url.endsWith('/')) {
            url = url.substr(0, url.lastIndexOf('/'));
        }
        if (isCmdPressed(event) && selectedItems.includes(url) === false) {
            const newSelection = [...selectedItems];
            newSelection.push(url);
            setSelection(newSelection);
        } else if (isCmdPressed(event) && selectedItems.includes(url)) {
            const newSelection = selectedItems.filter((item) => item !== url);
            setSelection(newSelection);
        } else {
            history.push(`/file?f=${url}`);
        }
    };

    const loadFolder = (path, event = {}) => {
        if (loadCurrentItem) return;
        if (isCmdPressed(event) && selectedItems.includes(path)) {
            const newSelection = selectedItems.filter((item) => item !== path);
            setSelection(newSelection);
        } else if (isCmdPressed(event) && !selectedItems.includes(path)) {
            const newSelection = [...selectedItems, path];
            setSelection(newSelection);
        } else {
            setCurrentPath(path);
            fetchCurrentItem(path, true);
        }
    };

    const uploadFile = (e) => {
        const filePath =
            e.target.files && e.target.files.length ? e.target.files[0] : null;
        if (filePath) {
            fileUtils.uploadFile(filePath, currentPath, () => {
                fetchCurrentItem(currentPath);
            });
        }
    };

    const clearSelection = (e) => {
        if (
            typeof e.target.className === 'string' &&
            !e.target.className.includes('Item_') &&
            !e.target.className.includes('File_') &&
            e.target.className !== ''
        ) {
            console.log('Emptying selection');
            setSelection([]);
        }
    };

    const handleClick = (e) => {
        if (isSearchBarExpanded) {
            setSearchbarStatus(false);
            e.stopPropagation();
        } else {
            clearSelection(e);
        }
    };

    const downloadItems = () => {
        selectedItems.forEach((item) => {
            const download =
                webId.replace('profile/card#me', 'download?path=') +
                url.parse(item).pathname;
            window.open(download.replace(/\/+$/, ''));
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

    const uploadCurrentItem = (e) => {
        const files = e.target.files;
        if (files && files.length) {
            Promise.all(
                files.map((file) => {
                    return fileUtils.uploadCurrentItemOrFile(
                        files[file],
                        currentPath +
                            encodeURIComponent(files[file].webkitRelativePath)
                    );
                })
            ).then((response) => {
                fetchCurrentItem(currentPath);
            });
        }
    };

    // toolbar fragments
    const toolbarRight = (
        <ToolbarButtons
            onFolderUpload={uploadCurrentItem}
            onDownload={downloadItems}
            uploadFile={uploadFile}
            onDelete={() => {
                if (selectedItems.length !== 0) {
                    openConsentWindow(selectedItems);
                }
            }}
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
            className={styles.grid}
            label="Drive"
            onClick={handleClick}
            isLoading={loadDeletion || loadPaste || loadCurrentItem}
        >
            <DriveContextMenu
                className={styles.mainArea}
                drive
                id="drive contextmenu"
            >
                <div className={styles.container}>
                    <Windows />
                    {currentItem &&
                    currentItem.folders &&
                    currentItem.files &&
                    !noFilesAndFolders() ? (
                        <div>
                            <ItemList
                                selectedItems={selectedItems}
                                items={currentItem.folders}
                                currPath={currentPath}
                                image={folder}
                                onItemClick={
                                    isSearchBarExpanded
                                        ? () => setSearchbarStatus(false)
                                        : loadFolder
                                }
                            />
                            <ItemList
                                selectedItems={selectedItems}
                                isFile
                                items={currentItem.files}
                                currPath={currentPath}
                                image={fileIcon}
                                onItemClick={
                                    isSearchBarExpanded
                                        ? () => setSearchbarStatus(false)
                                        : loadFile
                                }
                            />
                        </div>
                    ) : (
                        <p className={styles.emptyMessage}>
                            This folder is empty
                        </p>
                    )}
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
        webId: state.user.webId,
        clipboard: state.app.clipboard,
        error: state.app.error,
        loadDeletion: state.app.loadDeletion,
        loadPaste: state.app.loadPaste,
        loadCurrentItem: state.app.loadCurrentItem,
        isSearchBarExpanded: state.app.isSearchBarExpanded,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        openConsentWindow,
        setCurrentPath,
        sendNotification,
        fetchCurrentItem,
        setSelection,
        setSearchbarStatus,
    })(Drive)
);
