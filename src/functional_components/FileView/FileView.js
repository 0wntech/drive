import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import mime from 'mime';
import { Layout } from '../Layout';
import styles from './FileView.module.scss';
import {
    setCurrentPath,
    updateFile,
    toggleErrorWindow,
} from '../../actions/appActions';
import {
    getBreadcrumbsFromUrl,
    getParamsFromUrl,
    convertFileUrlToName,
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

const getPlaceholder = (body) => {
    if (body && body !== '') return body;

    return 'Empty';
};

export const FileView = ({
    loadCurrentItem,
    currentItem,
    currentPath,
    webId,
    setCurrentPath,
    updateFile,
    updatingFile,
    history,
    error,
    isErrorWindowVisible,
    errorWindowError,
    toggleErrorWindow,
}) => {
    useEffect(() => {
        const fileParam = getParamsFromUrl(window.location.href).f;
        if (fileParam) {
            if (
                !currentItem ||
                typeof currentItem.body !== 'string' ||
                !currentPath
            ) {
                let options = {};
                if (
                    mime.getType(fileParam) &&
                    isImageType(mime.getType(fileParam))
                ) {
                    options = { noFetch: true };
                }
                setCurrentPath(fileParam, options);
            } else if (currentItem.files || currentItem.folders) {
                history.push('/home');
            }
        }
    }, []);

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
                onClick={(path) => {
                    if (path !== currentPath && path !== currentPath + '/') {
                        setCurrentPath(path);
                        history.push('/home');
                    }
                }}
                breadcrumbs={
                    currentPath ? getBreadcrumbsFromUrl(currentPath) : null
                }
                webId={webId}
            />
        </div>
    );

    const toolbarRight = (
        <div className={styles.editIconWrapper}>
            {isEditable ? (
                <div className={styles.editButtons}>
                    <SvgX
                        viewBox="0 0 32 32"
                        onClick={onCancel}
                        className={styles.icon}
                    />{' '}
                    <SvgCheck
                        viewBox="0 0 32 32"
                        className={styles.icon}
                        onClick={onSubmit}
                    />
                </div>
            ) : (
                <Edit
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
                currentItem &&
                currentItem.url &&
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
                            edit={isEditable}
                            value={newBody}
                            onChange={(e) => {
                                setNewBody(e.target.value);
                            }}
                            placeholder={getPlaceholder(currentItem.body)}
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
                        <div
                            className={classNames(styles.file, {
                                [styles.enabled]: isEditable,
                            })}
                        >
                            {newBody ? newBody : 'Empty'}
                        </div>
                    )
                ) : (
                    <img
                        src={currentItem.url}
                        alt="file"
                        className={styles.image}
                        onClick={() => window.open(currentItem.url)}
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
        currentPath: state.app.currentPath,
        webId: state.user.webId,
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
