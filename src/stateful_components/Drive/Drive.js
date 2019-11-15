import React from 'react';
import url from 'url';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './Drive.module.css';
import Breadcrumbs from '../../functional_components/Breadcrumbs/Breadcrumbs';
import { ItemList } from '../../functional_components/ItemList';
import fileUtils from '../../utils/fileUtils';
import { getBreadcrumbsFromUrl, getRootFromWebId } from '../../utils/url';
import folder from '../../assets/icons/Folder.png';
import fileIcon from '../../assets/icons/File.png';
import { Layout } from '../../functional_components/Layout';
import {
    setCurrentPath,
    setSelection,
    sendNotification,
    fetchCurrentItem,
    copyItems,
    pasteItems,
    openConsentWindow,
    openCreateFileWindow,
    openCreateFolderWindow,
    openRenameWindow,
} from '../../actions/appActions';
import { ClassicSpinner } from 'react-spinners-kit';
import ToolbarButtons from '../../functional_components/ToolbarButtons';
import { isCmdPressed } from '../../utils/helper';
import { MenuProvider, Menu, Item } from 'react-contexify';
import classNames from 'classnames';
import Windows from '../../functional_components/Windows/Windows';

class Drive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currPath: undefined,
            folders: undefined,
            files: undefined,
        };

        this.toolbarRight = (
            <ToolbarButtons
                onFileCreation={openCreateFileWindow}
                onFolderCreation={openCreateFolderWindow}
                onFolderUpload={this.uploadFolder}
                onDownload={this.downloadItems}
                uploadFile={this.uploadFile}
                onDelete={() => {
                    openConsentWindow();
                }}
            />
        );
        this.followPath = this.followPath.bind(this);
        this.uploadCurrentItem = this.uploadCurrentItem.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.downloadItems = this.downloadItems.bind(this);
        this.loadFile = this.loadFile.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
    }

    sortContainments(urls) {
        const folders = [];
        const files = [];
        urls.forEach((url) => {
            if (url.value[url.value.length - 1] === '/') {
                const urlFragments = url.value.split('/');
                const folderUrl = urlFragments[urlFragments.length - 2];
                folders.push(decodeURIComponent(folderUrl));
            } else {
                const urlFragments = url.value.split('/');
                const fileUrl = urlFragments[urlFragments.length - 1];
                files.push(decodeURIComponent(fileUrl));
            }
        });
        return [files, folders];
    }

    loadFile(url, event = {}) {
        const {
            selectedItems,
            setSelection,
            fetchCurrentItem,
            setCurrentPath,
            history,
        } = this.props;
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
            fetchCurrentItem(url);
            setCurrentPath(url);
            history.push(`/file?f=${url}`);
        }
    }

    followPath(path, event = {}) {
        if (this.props.loadCurrentItem) return;
        const {
            selectedItems,
            setCurrentPath,
            setSelection,
            fetchCurrentItem,
        } = this.props;
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
    }

    uploadFile(e) {
        console.log(e);
        const { currentPath, fetchCurrentItem } = this.props;
        const filePath =
            e.target.files && e.target.files.length ? e.target.files[0] : null;
        if (filePath) {
            fileUtils.uploadFile(filePath, currentPath, () => {
                fetchCurrentItem(currentPath);
            });
        }
    }

    clearSelection(e) {
        if (
            e.target.nodeName !== 'IMG' &&
            e.target.nodeName !== 'P' &&
            e.target.innerHTML !== 'Delete'
        ) {
            this.setState({
                selectedItems: [],
            });
        }
    }

    componentDidMount() {
        const {
            setCurrentPath,
            loadCurrentItem,
            currentItem,
            webId,
        } = this.props;
        let { currentPath } = this.props;

        if (!currentPath && !loadCurrentItem && webId) {
            currentPath = webId.replace('profile/card#me', '');
            setCurrentPath(currentPath, true);
        } else if (currentPath && currentItem && currentItem.body) {
            currentPath =
                currentPath.substr(0, currentPath.lastIndexOf('/')) + '/';
            setCurrentPath(currentPath);
        }
    }

    downloadItems() {
        const { selectedItems, webId } = this.props;
        selectedItems.forEach((item) => {
            const download =
                webId.replace('profile/card#me', 'download?path=') +
                url.parse(item).pathname;
            window.open(download.replace(/\/+$/, ''));
        });
    }

    uploadCurrentItem(e) {
        const { currentPath } = this.props;
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
    }

    addForDelete(item) {
        const { selectedItems, setSelection } = this.props;
        const newSelection = [...selectedItems];
        if (
            item &&
            url.parse(item).path !== '/' &&
            !selectedItems.includes(item)
        ) {
            newSelection.push(item);
            setSelection(newSelection);
        }
        if (selectedItems.length !== 0 || newSelection.length !== 0) {
            return true;
        }
    }

    render() {
        const {
            selectedItems,
            currentItem,
            currentPath,
            loadCurrentItem,
            webId,
            setCurrentPath,
            loadDeletion,
            loadPaste,
            copyItems,
            pasteItems,
            clipboard,
            openConsentWindow,
            openCreateFileWindow,
            openCreateFolderWindow,
            openRenameWindow,
        } = this.props;

        const CONTEXTMENU_OPTIONS = [
            {
                label: 'Info',
                onClick: (item) => fileUtils.getInfo(item),
                disabled: false,
            },
            {
                label: 'Copy*',
                onClick: (item) => {
                    if (
                        !selectedItems.includes(item) &&
                        item !== getRootFromWebId(webId)
                    ) {
                        selectedItems.push(item);
                    }
                    copyItems(selectedItems);
                },
                disabled: false,
            },
            {
                label: 'Paste*',
                onClick: () => pasteItems(clipboard, currentPath),
                disabled: clipboard.length === 0,
            },
            {
                label: 'Rename',
                onClick: (item) => openRenameWindow(item),
                disabled: false,
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
                label: 'Delete',
                onClick: (item) => {
                    const deletable = this.addForDelete(item);
                    if (deletable) openConsentWindow(item);
                },
                disabled: false,
            },
        ];

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
                disabled: clipboard.length === 0,
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

        const toolbarLeft = webId ? (
            <div className={styles.breadcrumbsContainer}>
                <Breadcrumbs
                    onClick={(path) => {
                        console.log(path);
                        setCurrentPath(path);
                        this.setState({ file: null });
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
                    toolbarChildrenRight={this.toolbarRight}
                    className={styles.grid}
                    onClick={this.clearSelection}
                    label="Drive"
                >
                    <MenuProvider
                        className={styles.mainArea}
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
                                            onItemClick={this.followPath}
                                            contextMenuOptions={
                                                CONTEXTMENU_OPTIONS
                                            }
                                        />
                                    ) : null}
                                    <ItemList
                                        selectedItems={selectedItems}
                                        isFile
                                        items={currentItem.files}
                                        currPath={currentPath}
                                        image={fileIcon}
                                        onItemClick={this.loadFile}
                                        contextMenuOptions={CONTEXTMENU_OPTIONS}
                                    />
                                </div>
                            ) : (
                                undefined
                            )}
                        </div>
                    </MenuProvider>
                    <Menu
                        className={styles.contextMenu}
                        id={'drive contextmenu'}
                    >
                        {CONTEXTMENU_OPTIONS_DRIVE &&
                            CONTEXTMENU_OPTIONS_DRIVE.map((option, index) => (
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
                            ))}
                    </Menu>
                </Layout>
            );
        }
    }
}

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
    connect(
        mapStateToProps,
        {
            setCurrentPath,
            sendNotification,
            fetchCurrentItem,
            setSelection,
            copyItems,
            pasteItems,
            openConsentWindow,
            openCreateFileWindow,
            openCreateFolderWindow,
            openRenameWindow,
        }
    )(Drive)
);
