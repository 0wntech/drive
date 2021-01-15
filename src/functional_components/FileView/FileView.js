import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import ns from 'solid-namespace';
import mime from 'mime';
import url from 'url';

import { Layout } from '../Layout';
import styles from './FileView.module.scss';
import {
    setCurrentPath,
    updateFile,
    toggleErrorWindow,
} from '../../actions/appActions';
import {
    getBreadcrumbsFromUrl,
    useParamsFromUrl,
    convertFileUrlToName,
    getHomeRoute,
    getContactFolderRoute,
} from '../../utils/url';
import fileUtils from '../../utils/fileUtils';
import Breadcrumbs from '../Breadcrumbs';
import Edit from '../../assets/svgIcons/Edit';
import SvgCheck from '../../assets/svgIcons/Check';
import SvgX from '../../assets/svgIcons/X';
import { FileEditor } from '../FileEditor';
import { isImageType } from '../../utils/fileUtils';
import BackButton from '../BackButton';
import ErrorWindow from '../ErrorWindow';
import MarkdownView from 'react-showdown';
import AccessDisplay from '../AccessDisplay/AccessDisplay';
import AccessWindow from '../AccessWindow';
import BottomOverlay from '../BottomOverlay/BottomOverlay';

export const FileView = ({
    loadCurrentItem,
    currentItem,
    currentItemAccessControl,
    currentPath,
    webId,
    rootUrl,
    setCurrentPath,
    updateFile,
    updatingFile,
    history,
    error,
    isErrorWindowVisible,
    errorWindowError,
    toggleErrorWindow,
}) => {
    const { id, path: currentFilePath } = useParamsFromUrl();
    const routeUrl =
        currentFilePath &&
        url.resolve((id && `https://${id}/`) ?? rootUrl, currentFilePath ?? '');

    useEffect(() => {
        if (routeUrl) {
            if (
                !currentItem ||
                typeof currentItem.body !== 'string' ||
                !currentPath
            ) {
                let options = {};
                if (
                    mime.getType(routeUrl) &&
                    isImageType(mime.getType(routeUrl))
                ) {
                    options = { noFetch: true };
                }
                setCurrentPath(routeUrl, options);
            } else if (currentItem.files || currentItem.folders) {
                if (id !== url.parse(webId).host) {
                    history.push(getContactFolderRoute(id, currentPath));
                } else {
                    history.push(getHomeRoute(currentPath));
                }
            }
        }
    }, [
        id,
        currentFilePath,
        webId,
        currentItem,
        currentPath,
        history,
        routeUrl,
        setCurrentPath,
    ]);

    useEffect(() => {
        if (currentItem && typeof currentItem.body === 'string')
            setNewBody(currentItem.body);
    }, [currentItem]);

    const fileType = currentItem ? mime.getType(currentItem.url) : undefined;
    const isImage = isImageType(fileType);

    const [isEditable, setEditable] = useState(false);
    const [newBody, setNewBody] = useState(
        currentItem && currentItem.body ? currentItem.body : ''
    );

    const onCancel = () => {
        setNewBody(currentItem.body);
        setEditable(false);
    };

    const onSubmit = () => {
        let correctSyntax = false;
        try {
            correctSyntax = fileUtils.syntaxCheckRdf(
                newBody,
                mime.getType(currentItem.url),
                currentItem.url
            );
        } catch (err) {
            toggleErrorWindow({ action: 'Update', error: err });
        }
        if (currentItem.body !== newBody && correctSyntax) {
            updateFile(currentItem.url, newBody);
            setEditable(false);
        } else if (currentItem.body === newBody) {
            setEditable(false);
        }
    };

    const toolbarLeft = (
        <div className={styles.breadcrumbsContainer}>
            <Breadcrumbs
                webId={webId}
                onClick={(path) => {
                    if (id !== url.parse(webId).host) {
                        history.push(getContactFolderRoute(id, path));
                    } else {
                        history.push(getHomeRoute(path));
                    }
                }}
                breadcrumbs={
                    currentPath ? getBreadcrumbsFromUrl(currentPath) : null
                }
                currentPath={currentPath ?? routeUrl}
                rootUrl={rootUrl}
            />
        </div>
    );

    const toolbarRight = ((currentItemAccessControl &&
        currentItemAccessControl.find(
            (entity) =>
                entity.webId === webId &&
                entity.access.includes(ns().acl('Write'))
        )) ||
        id === url.parse(webId).host) && (
        <div className={styles.editIconWrapper}>
            {isEditable ? (
                <div className={styles.editButtons}>
                    <SvgX
                        data-test-id="cancel-edit-file"
                        viewBox="0 0 32 32"
                        onClick={onCancel}
                        className={styles.icon}
                    />{' '}
                    <SvgCheck
                        data-test-id="save-file"
                        viewBox="0 0 32 32"
                        className={styles.icon}
                        onClick={onSubmit}
                    />
                </div>
            ) : (
                <Edit
                    data-test-id="edit-file"
                    viewBox="0 0 24 24"
                    width="100%"
                    className={styles.icon}
                    onClick={() => setEditable(!isEditable)}
                />
            )}
        </div>
    );

    return (
        <Layout
            className={classNames(styles.container, {
                [styles.editable]: isEditable,
            })}
            toolbarChildrenLeft={toolbarLeft}
            toolbarChildrenRight={!isImage && currentItem ? toolbarRight : null}
            label={
                currentItem?.url &&
                decodeURIComponent(convertFileUrlToName(currentItem.url))
            }
            showLabel
            isLoading={updatingFile || loadCurrentItem}
        >
            {error.FETCH_CURRENT_ITEM ? (
                <>
                    <div>Sorry, we cannot load this file.</div>
                    <p className={styles.error}>
                        Error: {error.FETCH_CURRENT_ITEM.message}
                    </p>
                </>
            ) : currentItem ? (
                !isImage && currentItem.url ? (
                    isEditable ? (
                        <FileEditor
                            editable
                            value={newBody}
                            onChange={(_, _a, value) => {
                                setNewBody(value);
                            }}
                        />
                    ) : mime.getExtension(fileType) === 'markdown' ? (
                        <MarkdownView
                            style={{
                                textAlign: 'left',
                                width: 'calc(100% - 2em)',
                                height: 'max-content',
                                paddingBottom: '8em',
                            }}
                            markdown={currentItem.body}
                        />
                    ) : (
                        <FileEditor
                            dataId="file-body"
                            value={newBody ? newBody : 'Empty'}
                        />
                    )
                ) : (
                    <img
                        data-test-id="file-image"
                        src={routeUrl}
                        alt="file"
                        className={styles.image}
                        onClick={() => window.open(routeUrl)}
                    />
                )
            ) : null}
            <BottomOverlay className={styles.overlay}>
                <AccessDisplay />
                <BackButton />
            </BottomOverlay>
            <AccessWindow />
            <ErrorWindow
                visible={isErrorWindowVisible}
                onClose={toggleErrorWindow}
                windowName={
                    errorWindowError && errorWindowError.action + ' Failed'
                }
                error={errorWindowError && errorWindowError.error}
            />
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        loadCurrentItem: state.app.loadCurrentItem,
        currentItem: state.app.currentItem,
        currentItemAccessControl: state.app.currentItemAccessControl,
        currentPath: state.app.currentPath,
        webId: state.user.webId,
        rootUrl: state.app.rootUrl,
        updatingFile: state.app.updatingFile,
        error: state.app.error,
        isErrorWindowVisible: state.app.isErrorWindowVisible,
        errorWindowError: state.app.errorWindowError,
    };
};

export default withRouter(
    connect(mapStateToProps, { setCurrentPath, updateFile, toggleErrorWindow })(
        FileView
    )
);
