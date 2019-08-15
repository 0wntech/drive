import React from 'react';
import rdf from 'rdflib';
import auth from 'solid-auth-client';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './Drive.module.css';
import Breadcrumbs from '../../functional_components/Breadcrumbs/Breadcrumbs';
import { ItemList } from '../../functional_components/ItemList';
import fileUtils from '../../utils/fileUtils';
import { getBreadcrumbsFromUrl } from '../../utils/url';
import folder from '../../assets/icons/Folder.png';
import fileIcon from '../../assets/icons/File.png';
import Buttons from '../../functional_components/Buttons/Buttons';
import { InputWindow } from '../../functional_components/InputWindow';
import Container from 'react-bootstrap/Container';
import { ConsentWindow } from '../../functional_components/ConsentWindow';
import {
    setCurrentPath,
    setSelection,
    sendNotification,
    fetchCurrentItems,
} from '../../actions/UserActions';
import { ContactSidebar } from '../../functional_components/ContactSidebar';
import { ClassicSpinner } from 'react-spinners-kit';
const ns = require('solid-namespace')(rdf);

class Drive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currPath: undefined,
            file: undefined,
            image: undefined,
            selectedItems: [],
            folders: undefined,
            isCreateFolderVisible: false,
            isConsentWindowVisible: false,
            isCreateFileVisible: false,
            files: undefined,
        };

        this.createFolder = this.createFolder.bind(this);
        this.createFile = this.createFile.bind(this);
        this.followPath = this.followPath.bind(this);
        this.uploadFolder = this.uploadFolder.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.loadFile = this.loadFile.bind(this);
        this.loadCurrentFolder = this.loadCurrentFolder.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
        this.openCreateFolderWindow = this.openCreateFolderWindow.bind(this);
        this.closeCreateFolderWindow = this.closeCreateFolderWindow.bind(this);
        this.openConsentWindow = this.openConsentWindow.bind(this);
        this.closeConsentWindow = this.closeConsentWindow.bind(this);
        this.openCreateFileWindow = this.openCreateFileWindow.bind(this);
        this.closeCreateFileWindow = this.closeCreateFileWindow.bind(this);
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

    loadCurrentFolder(path, newBreadcrumbs) {
        const currPath = path
            ? path
            : 'https://' + this.props.webId.split('/')[2] + '/';
        Promise.resolve(this.loadFolder(currPath, newBreadcrumbs)).then(
            (sortedContainments) => {
                this.setState({
                    folders: sortedContainments[1],
                    files: sortedContainments[0],
                    currPath: currPath,
                    breadcrumbs: newBreadcrumbs,
                    file: undefined,
                    image: undefined,
                    selectedItems: [],
                });
            }
        );
    }

    loadFile(url) {
        if (this.props.selectedItems.includes(url) === false) {
            const newSelection = this.props.selectedItems;
            newSelection.push(url);
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

    followPath(path) {
        if (this.props.selectedItems.includes(path)) {
            console.log(path);
            this.props.setCurrentPath(path);
            // const newBreadcrumbs = getBreadcrumbsFromUrl(path);
            // this.loadCurrentFolder(path, newBreadcrumbs);
        } else {
            const newSelection = this.props.selectedItems;
            newSelection.push(path);
            setSelection(newSelection);
            this.setState({
                selectedItems: newSelection,
            });
        }
    }

    uploadFile(e) {
        const currPath = this.props.currentPath;
        const filePath = e.target.files[0];

        fileUtils.uploadFile(filePath, currPath).then(() => {
            this.loadCurrentFolder(this.state.currPath, this.state.breadcrumbs);
        });
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
                // prettier-ignore
                'Slug': folderAddress,
                // prettier-ignore
                'Link': '<http://www.w3.org/ns/ldp#BasicContainer>; rel="type"',
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
                // prettier-ignore
                'Slug': folderAddress,
                // prettier-ignore
                'Link': '<http://www.w3.org/ns/ldp#Resource>; rel="type"',
                'Content-Type': 'text/turtle',
            },
        };

        auth.fetch(currentPath, request).then(() => {
            setCurrentPath(currentPath);
        });
    }

    componentDidMount() {
        const { currentItems, currentPath, loadCurrentItems } = this.props;

        if (!currentItems && !currentPath && !loadCurrentItems) {
            console.log('fetching files');
            console.log(currentPath, currentItems);
            fetchCurrentItems(currentPath);
        }

        // if (webId) {
        //     const object = webId.replace('/card#me', '');
        //     console.log('sending notification...')
        //     sendNotification({ actor: webId, object: object, target: webId });
        // }
        // try {
        //     if (!JSON.parse(localStorage.getItem('appState')).currPath) {
        //         this.loadCurrentFolder(this.state.currPath, ['/']);
        //     } else {
        //         console.log('Using cached state...');
        //         this.loadCurrentFolder(
        //             JSON.parse(localStorage.getItem('appState')).currPath,
        //             JSON.parse(localStorage.getItem('appState')).breadcrumbs
        //         );
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    }

    uploadFolder(e) {
        const files = e.target.files;
        for (let file = 0; file < files.length; file++) {
            fileUtils
                .uploadFolderOrFile(
                    files[file],
                    this.props.currentPath +
                        encodeURIComponent(files[file].webkitRelativePath)
                )
                .then((response) => {
                    console.log(file, response);
                    if (file === files.length - 1) {
                        this.loadCurrentFolder(
                            this.props.currentPath,
                            getBreadcrumbsFromUrl(this.props.currentPath)
                        );
                    }
                });
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

    openConsentWindow() {
        this.setState({
            isConsentWindowVisible: true,
        });
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

    componentWillUnmount() {
        // console.log('Caching state...');
        // localStorage.setItem('appState', JSON.stringify(this.state));
    }

    render() {
        const {
            isCreateFolderVisible,
            isCreateFileVisible,
            isConsentWindowVisible,
            selectedItems,
        } = this.state;

        const {
            webId,
            currentItems,
            currentPath,
            setCurrentPath,
            loadCurrentItems,
        } = this.props;

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

        if (loadCurrentItems) {
            return (
                <div className={styles.spinner}>
                    <ClassicSpinner
                        size={100}
                        color="#686769"
                        loading={loadCurrentItems}
                    />
                </div>
            );
        } else {
            return (
                <div style={{ height: '100%' }} onClick={this.clearSelection}>
                    {webId ? (
                        <Breadcrumbs
                            onClick={setCurrentPath}
                            breadcrumbs={
                                currentPath
                                    ? getBreadcrumbsFromUrl(currentPath)
                                    : null
                            }
                            webId={webId}
                        />
                    ) : null}
                    <div>
                        {fileMarkup ? (
                            <Container>{fileMarkup}</Container>
                        ) : (
                            <div>
                                <ConsentWindow
                                    windowName="Delete File?"
                                    selectedItems={selectedItems}
                                    info={
                                        selectedItems.length > 1
                                            ? 'Do you really want to delete these items?'
                                            : 'Do you really want to delete this item?'
                                    }
                                    onSubmit={(selectedItems) =>
                                        fileUtils.deleteItems(selectedItems)
                                    }
                                    className={
                                        isConsentWindowVisible
                                            ? styles.visible
                                            : styles.hidden
                                    }
                                    onClose={this.closeConsentWindow}
                                ></ConsentWindow>
                                <InputWindow
                                    windowName="Create Folder"
                                    info=""
                                    onSubmit={this.createFolder}
                                    className={
                                        isCreateFolderVisible
                                            ? styles.visible
                                            : styles.hidden
                                    }
                                    onClose={this.closeCreateFolderWindow}
                                    placeholder={'Untitled'}
                                />
                                <InputWindow
                                    windowName="Create File"
                                    info=""
                                    onSubmit={this.createFile}
                                    className={
                                        isCreateFileVisible
                                            ? styles.visible
                                            : styles.hidden
                                    }
                                    onClose={this.closeCreateFileWindow}
                                    placeholder={'Untitled'}
                                />
                                {currentItems ? (
                                    <div>
                                        <ContactSidebar />
                                        <Container>
                                            <ItemList
                                                selectedItems={selectedItems}
                                                items={currentItems.folders}
                                                currPath={currentPath}
                                                image={folder}
                                                onItemClick={this.followPath}
                                                onDelete={(item) => {
                                                    this.openConsentWindow();
                                                }}
                                                onAccess={(item) => {
                                                    fileUtils.changeAccess(
                                                        item
                                                    );
                                                }}
                                                onRename={(item) => {
                                                    fileUtils.renameItem(item);
                                                }}
                                                onInfo={(item) => {
                                                    fileUtils.getInfo(item);
                                                }}
                                            />
                                            <ItemList
                                                selectedItems={selectedItems}
                                                isFile
                                                items={currentItems.files}
                                                currPath={currentPath}
                                                image={fileIcon}
                                                onItemClick={this.loadFile}
                                                onDelete={(item) => {
                                                    this.openConsentWindow();
                                                }}
                                                onAccess={(item) => {
                                                    fileUtils.changeAccess(
                                                        item
                                                    );
                                                }}
                                                onRename={(item) => {
                                                    fileUtils.renameFile(item);
                                                }}
                                                onInfo={(item) => {
                                                    fileUtils.onInfo(item);
                                                }}
                                            />
                                            <Buttons
                                                onFileCreation={
                                                    this.openCreateFileWindow
                                                }
                                                onFolderCreation={
                                                    this.openCreateFolderWindow
                                                }
                                                onFolderUpload={
                                                    this.uploadFolder
                                                }
                                                onFileUpload={this.uploadFile}
                                            ></Buttons>
                                        </Container>
                                    </div>
                                ) : (
                                    undefined
                                )}
                            </div>
                        )}
                    </div>
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
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        { setCurrentPath, sendNotification, fetchCurrentItems }
    )(Drive)
);
