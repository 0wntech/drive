import React, { useEffect } from 'react';
import url from 'url';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './Drive.module.css';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { ItemList } from '../ItemList';
import fileUtils from '../../utils/fileUtils';
import { getBreadcrumbsFromUrl } from '../../utils/url';
import folder from '../../assets/icons/Folder.png';
import fileIcon from '../../assets/icons/File.png';
import { Layout } from '../Layout';
import {
    setCurrentPath,
    setSelection,
    sendNotification,
    fetchCurrentItem,
} from '../../actions/appActions';
import { ClassicSpinner } from 'react-spinners-kit';
import ToolbarButtons from '../ToolbarButtons/ToolbarButtons';
import { isCmdPressed } from '../../utils/helper';
import Windows from '../Windows/Windows';
import { CursorMenu } from '../DriveContextMenu/DriveContextMenu';

const Drive = ({
    selectedItems,
    currentItem,
    currentPath,
    loadCurrentItem,
    webId,
    setCurrentPath,
    setSelection,
    fetchCurrentItem,
    history,
    loadDeletion,
    loadPaste,
}) => {
    useEffect(() => {
        if (!currentPath && !loadCurrentItem && webId) {
            currentPath = webId.replace('profile/card#me', '');
            setCurrentPath(currentPath, true);
        } else if (currentPath && currentItem && currentItem.body) {
            currentPath =
                currentPath.substr(0, currentPath.lastIndexOf('/')) + '/';
            setCurrentPath(currentPath);
        }
    });

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
            console.log(e.target);
            console.log('Emptying selection');
            setSelection([]);
        }
    };

    const downloadItems = () => {
        selectedItems.forEach((item) => {
            const download =
                webId.replace('profile/card#me', 'download?path=') +
                url.parse(item).pathname;
            window.open(download.replace(/\/+$/, ''));
        });
    };

    const uploadCurrentItem = (e) => {
        const files = e.target.files;
        if (files && files.length) {
            for (let file = 0; file < files.length; file++) {
                fileUtils
                    .uploadCurrentItemOrFile(
                        files[file],
                        currentPath +
                            encodeURIComponent(files[file].webkitRelativePath)
                    )
                    .then((response) => {
                        console.log(file, response);
                        if (file === files.length - 1) {
                            fetchCurrentItem(currentPath);
                        }
                    });
            }
        }
    };

    // toolbar fragments
    const toolbarRight = (
        <ToolbarButtons
            onFolderUpload={uploadCurrentItem}
            onDownload={downloadItems}
            uploadFile={uploadFile}
            onDelete={() => {
                const deletable = addForDelete();
                if (deletable) openConsentWindow();
            }}
        />
    );

    const toolbarLeft = webId ? (
        <div className={styles.breadcrumbsContainer}>
            <Breadcrumbs
                onClick={(path) => {
                    console.log(path);
                    setCurrentPath(path);
                }}
                breadcrumbs={
                    currentPath ? getBreadcrumbsFromUrl(currentPath) : null
                }
                webId={webId}
            />
        </div>
    ) : null;

    if ((loadCurrentItem, loadDeletion, loadPaste)) {
        return (
            <div className={styles.spinner}>
                <ClassicSpinner
                    size={30}
                    color="#686769"
                    loading={(loadCurrentItem, loadDeletion, loadPaste)}
                />
            </div>
        );
    } else {
        return (
            <Layout
                toolbarChildrenLeft={toolbarLeft}
                toolbarChildrenRight={toolbarRight}
                className={styles.grid}
                label="Drive"
                onClick={clearSelection}
            >
                <CursorMenu
                    className={styles.mainArea}
                    drive
                    id="drive contextmenu"
                >
                    <div className={styles.container}>
                        <Windows />
                        {currentItem &&
                        (currentItem.folders || currentItem.files) ? (
                            <div>
                                {currentItem.folders.length > 0 ? (
                                    <ItemList
                                        selectedItems={selectedItems}
                                        items={currentItem.folders}
                                        currPath={currentPath}
                                        image={folder}
                                        onItemClick={loadFolder}
                                    />
                                ) : null}
                                <ItemList
                                    selectedItems={selectedItems}
                                    isFile
                                    items={currentItem.files}
                                    currPath={currentPath}
                                    image={fileIcon}
                                    onItemClick={loadFile}
                                />
                            </div>
                        ) : (
                            undefined
                        )}
                    </div>
                </CursorMenu>
            </Layout>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        currentItem: state.app.currentItem,
        currentPath: state.app.currentPath,
        selectedItems: state.app.selectedItems,
        webId: state.user.webId,
        loadCurrentItem: state.app.loadCurrentItem,
        loadDeletion: state.app.loadDeletion,
        clipboard: state.app.clipboard,
        loadPaste: state.app.loadPaste,
        loadCurrentItem: state.app.loadCurrentItem,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        setCurrentPath,
        sendNotification,
        fetchCurrentItem,
        setSelection,
    })(Drive)
);
