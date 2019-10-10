import React, { Fragment } from 'react';
import rdf from 'rdflib';
import auth from 'solid-auth-client';
import url from 'url';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './Drive.module.css';
import Breadcrumbs from '../../functional_components/Breadcrumbs/Breadcrumbs';
import { ItemList } from '../../functional_components/ItemList';
import fileUtils from '../../utils/fileUtils';
import { getBreadcrumbsFromUrl } from '../../utils/url';
import folder from '../../assets/icons/Folder.png';
import fileIcon from '../../assets/icons/File.png';
import { InputWindow } from '../../functional_components/InputWindow';
import { DeleteWindow } from '../../functional_components/DeleteWindow';
import RenameWindow from '../../functional_components/RenameWindow/RenameWindow';
import {
    setCurrentPath,
    setSelection,
    sendNotification,
    fetchCurrentItems,
    deleteItems,
    copyItems,
    pasteItems,
    renameItem,
    searchContact,
} from '../../actions/UserActions';
import { ClassicSpinner } from 'react-spinners-kit';
import ToolbarButtons from '../../functional_components/ToolbarButtons';
import { isCmdPressed } from '../../utils/helper';
import { MenuProvider, Menu, Item } from 'react-contexify';
import classNames from 'classnames';
const ns = require('solid-namespace')(rdf);

class Drive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currPath: undefined,
            file: undefined,
            image: undefined,
            folders: undefined,
            isCreateFolderVisible: false,
            isConsentWindowVisible: false,
            isCreateFileVisible: false,
            isRenameFileVisible: false,
            files: undefined,
            renamedItem: undefined,
        };

        this.createFolder = this.createFolder.bind(this);
        this.createFile = this.createFile.bind(this);
        this.followPath = this.followPath.bind(this);
        this.uploadFolder = this.uploadFolder.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.downloadItems = this.downloadItems.bind(this);
        this.loadFile = this.loadFile.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
        this.openCreateFolderWindow = this.openCreateFolderWindow.bind(this);
        this.closeCreateFolderWindow = this.closeCreateFolderWindow.bind(this);
        this.openConsentWindow = this.openConsentWindow.bind(this);
        this.closeConsentWindow = this.closeConsentWindow.bind(this);
        this.openCreateFileWindow = this.openCreateFileWindow.bind(this);
        this.closeCreateFileWindow = this.closeCreateFileWindow.bind(this);
        this.openRenameFileWindow = this.openRenameFileWindow.bind(this);
        this.closeRenameFileWindow = this.closeRenameFileWindow.bind(this);
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

    loadFolder(url) {
        const store = rdf.graph();
        const fetcher = new rdf.Fetcher(store);

        return fetcher.load(url).then(() => {
            const containments = store.each(
                rdf.sym(url),
                ns.ldp('contains'),
                null
            );

            return this.sortContainments(containments);
        });
    }

    loadFile(url, event = {}) {
        const { selectedItems, setSelection } = this.props;
        if (url.endsWith('/')) {
            url = url.split('/');
            url.pop();
            url = url.join('/');
        }
        console.log(url);
        if (isCmdPressed(event) && selectedItems.includes(url) === false) {
            const newSelection = [...selectedItems];
            newSelection.push(url);
            setSelection(newSelection);
        } else if (isCmdPressed(event) && selectedItems.includes(url)) {
            const newSelection = selectedItems.filter((item) => item != url);
            setSelection(newSelection);
        } else {
            const newBreadCrumbs = getBreadcrumbsFromUrl(url);

            const contentType = fileUtils.getContentType(url);
            if (contentType === 'image') {
                this.setState({
                    file: url,
                    image: url,
                    currPath: url,
                    breadcrumbs: newBreadCrumbs,
                    selectedItems: [],
                });
                return;
            }

            auth.fetch(url).then((response) => {
                response.text().then((text) => {
                    this.setState({
                        file: text,
                        currPath: url,
                        breadcrumbs: newBreadCrumbs,
                        selectedItems: [],
                    });
                });
            });
        }
    }

    followPath(path, event = {}) {
        const { selectedItems, setCurrentPath, setSelection } = this.props;
        if (isCmdPressed(event) && selectedItems.includes(path)) {
            const newSelection = selectedItems.filter((item) => item != path);
            setSelection(newSelection);
        } else if (isCmdPressed(event) && !selectedItems.includes(path)) {
            const newSelection = [...selectedItems, path];
            setSelection(newSelection);
        } else {
            setCurrentPath(path);
        }
    }

    uploadFile(e) {
        console.log(e);
        const { currentPath, fetchCurrentItems } = this.props;
        const filePath =
            e.target.files && e.target.files.length ? e.target.files[0] : null;
        if (filePath) {
            fileUtils.uploadFile(filePath, currentPath, () => {
                fetchCurrentItems(currentPath);
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

    createFolder(folderAddress) {
        const { currentPath, setCurrentPath } = this.props;
        const request = {
            method: 'POST',
            headers: {
                'slug': folderAddress,
                'link': '<http://www.w3.org/ns/ldp#BasicContainer>; rel="type"',
                'Content-Type': 'text/turtle',
            },
        };

        auth.fetch(currentPath, request).then(() => {
            setCurrentPath(currentPath);
        });
    }

    createFile(folderAddress) {
        const { currentPath, setCurrentPath } = this.props;
        const request = {
            method: 'POST',
            headers: {
                'slug': folderAddress,
                'link': '<http://www.w3.org/ns/ldp#Resource>; rel="type"',
                'Content-Type': 'text/turtle',
            },
        };

        auth.fetch(currentPath, request).then(() => {
            setCurrentPath(currentPath);
        });
    }

    componentDidMount() {
        const {
            currentItems,
            currentPath,
            loadCurrentItems,
            contactsFound,
            searchContact,
        } = this.props;

        if (!currentItems && !currentPath && !loadCurrentItems) {
            console.log('fetching files');
            console.log(
                'current path + current items: ',
                currentPath,
                currentItems
            );
            fetchCurrentItems(currentPath);
        }

        if (!contactsFound) {
            searchContact('ludwig');
        } else {
            console.log(contactsFound);
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

    uploadFolder(e) {
        const { currentPath } = this.props;
        const files = e.target.files;
        if (files && files.length) {
            for (let file = 0; file < files.length; file++) {
                fileUtils
                    .uploadFolderOrFile(
                        files[file],
                        currentPath +
                            encodeURIComponent(files[file].webkitRelativePath)
                    )
                    .then((response) => {
                        console.log(file, response);
                        if (file === files.length - 1) {
                            fetchCurrentItems(currentPath);
                        }
                    });
            }
        }
    }

    closeCreateFolderWindow() {
        this.setState({
            isCreateFolderVisible: false,
        });
    }

    openCreateFolderWindow() {
        this.setState({
            isCreateFolderVisible: true,
        });
    }

    closeConsentWindow() {
        this.setState({
            isConsentWindowVisible: false,
        });
    }

    openConsentWindow(item) {
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
            this.setState({
                isConsentWindowVisible: true,
            });
        }
    }

    closeCreateFileWindow() {
        this.setState({
            isCreateFileVisible: false,
        });
    }

    openCreateFileWindow() {
        this.setState({
            isCreateFileVisible: true,
        });
    }

    closeRenameFileWindow(item) {
        this.setState({
            isRenameFileVisible: false,
            renamedItem: undefined,
        });
    }

    openRenameFileWindow(item) {
        this.setState({
            isRenameFileVisible: true,
            renamedItem: item,
        });
    }

    componentWillUnmount() {
        // console.log('Caching state...');
        // localStorage.setItem('appState', JSON.stringify(this.state));
    }

    render() {
        const {
            selectedItems,
            currentItems,
            currentPath,
            deleteItems,
            loadCurrentItems,
            webId,
            setCurrentPath,
            loadDeletion,
            loadPaste,
            copyItems,
            pasteItems,
            clipboard,
            renameItem,
        } = this.props;

        const {
            isConsentWindowVisible,
            isCreateFileVisible,
            isCreateFolderVisible,
            isRenameFileVisible,
            renamedItem,
        } = this.state;

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
                        item !== webId.replace('profile/card#me', '')
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
                onClick: (item) => this.openRenameFileWindow(item),
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
                onClick: () => this.openCreateFolderWindow(),
            },
            {
                label: 'Delete',
                onClick: (item) => this.openConsentWindow(item),
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
            // {
            //     label: 'Share*',
            //     onClick: (item) => fileUtils.changeAccess(item),
            //     disabled: true,
            // },
            {
                label: 'Create Folder',
                onClick: () => this.openCreateFolderWindow(),
            },
            {
                label: 'Delete',
                onClick: (item) => this.openConsentWindow(item),
                disabled: false,
            },
        ];

        const fileMarkup = this.state.file ? (
            <div className={styles.renderedFile}>
                {this.state.image ? (
                    <img src={this.state.image} alt="requested file"></img>
                ) : (
                    this.state.file
                )}
            </div>
        ) : (
            undefined
        );

        const toolbar = (
            <div className={styles.toolbarArea}>
                {webId ? (
                    <div className={styles.breadcrumbsContainer}>
                        <Breadcrumbs
                            onClick={setCurrentPath}
                            breadcrumbs={
                                currentPath
                                    ? getBreadcrumbsFromUrl(currentPath)
                                    : null
                            }
                            webId={webId}
                        />
                    </div>
                ) : null}
                <div className={styles.toolbarHeader}>Drive</div>
                <ToolbarButtons
                    onFileCreation={this.openCreateFileWindow}
                    onFolderCreation={this.openCreateFolderWindow}
                    onFolderUpload={this.uploadFolder}
                    onDownload={this.downloadItems}
                    uploadFile={this.uploadFile}
                    onDelete={() => {
                        this.openConsentWindow();
                    }}
                />
            </div>
        );

        const windows = (
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
                    onClose={this.closeConsentWindow}
                ></DeleteWindow>
                <InputWindow
                    windowName="Create Folder"
                    info=""
                    onSubmit={(value) => this.createFolder(value)}
                    className={
                        isCreateFolderVisible ? styles.visible : styles.hidden
                    }
                    onClose={this.closeCreateFolderWindow}
                    placeholder={'Untitled'}
                />
                <InputWindow
                    windowName="Create File"
                    info=""
                    onSubmit={(value) => this.createFile(value)}
                    className={
                        isCreateFileVisible ? styles.visible : styles.hidden
                    }
                    onClose={this.closeCreateFileWindow}
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
                        isRenameFileVisible ? styles.visible : styles.hidden
                    }
                    onClose={this.closeRenameFileWindow}
                />
            </Fragment>
        );

        if ((loadCurrentItems, loadDeletion, loadPaste)) {
            return (
                <div className={styles.spinner}>
                    <ClassicSpinner
                        size={30}
                        color="#686769"
                        loading={(loadCurrentItems, loadDeletion, loadPaste)}
                    />
                </div>
            );
        } else {
            return (
                <div
                    className={styles.grid}
                    style={{ height: '100%' }}
                    onClick={this.clearSelection}
                >
                    {toolbar}
                    <MenuProvider
                        className={styles.mainArea}
                        id="drive contextmenu"
                    >
                        {fileMarkup ? (
                            <div className={styles.container}>{fileMarkup}</div>
                        ) : (
                            <div className={styles.container}>
                                {windows}
                                {currentItems ? (
                                    <div>
                                        <ItemList
                                            selectedItems={selectedItems}
                                            items={currentItems.folders}
                                            currPath={currentPath}
                                            image={folder}
                                            onItemClick={this.followPath}
                                            contextMenuOptions={
                                                CONTEXTMENU_OPTIONS
                                            }
                                        />
                                        <ItemList
                                            selectedItems={selectedItems}
                                            isFile
                                            items={currentItems.files}
                                            currPath={currentPath}
                                            image={fileIcon}
                                            onItemClick={this.loadFile}
                                            contextMenuOptions={
                                                CONTEXTMENU_OPTIONS
                                            }
                                        />
                                    </div>
                                ) : (
                                    undefined
                                )}
                            </div>
                        )}
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
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        currentItems: state.app.currentItems,
        currentPath: state.app.currentPath,
        selectedItems: state.app.selectedItems,
        webId: state.app.webId,
        loadCurrentItems: state.app.loadCurrentItems,
        loadDeletion: state.app.loadDeletion,
        clipboard: state.app.clipboard,
        loadPaste: state.app.loadPaste,
        contactsFound: state.app.contactsFound,
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        {
            setCurrentPath,
            sendNotification,
            fetchCurrentItems,
            setSelection,
            deleteItems,
            copyItems,
            pasteItems,
            renameItem,
            searchContact,
        }
    )(Drive)
);
