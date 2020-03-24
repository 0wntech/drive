import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import mime from 'mime';
import { Layout } from '../Layout';
import styles from './FileView.module.css';
import { setCurrentPath, updateFile } from '../../actions/appActions';
import {
    getBreadcrumbsFromUrl,
    getFileParamsFromUrl,
    convertFileUrlToName,
} from '../../utils/url';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Edit from '../../assets/svgIcons/Edit';
import SvgCheck from '../../assets/svgIcons/Check';
import SvgX from '../../assets/svgIcons/X';
import { FileEditor } from '../FileEditor/FileEditor';

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
}) => {
    useEffect(() => {
        const fileParam = getFileParamsFromUrl(window.location.href).f;
        console.log('CURRENT ITEM', currentItem);
        if (currentItem && currentItem.body) {
            setNewBody(currentItem.body);
        }
        if (fileParam) {
            if (!currentItem || !currentItem.body || !currentPath) {
                let options = {};
                if (
                    mime.getType(fileParam) &&
                    mime.getType(fileParam).includes('image')
                ) {
                    options = { noFetch: true };
                }
                setCurrentPath(fileParam, options);
            } else if (currentItem.files || currentItem.folders) {
                history.push('/home');
            }
        }
    }, [currentItem]);

    const fileType = currentItem ? mime.getType(currentItem.url) : undefined;
    const isImage = fileType ? fileType.includes('image') : null;

    const [isEditable, setEditable] = useState(false);
    const [newBody, setNewBody] = useState('');

    const onCancel = () => {
        setNewBody(currentItem.body);
        setEditable(false);
    };

    const onSubmit = () => {
        console.log('BOOODY', newBody);
        if (currentItem.body !== newBody) updateFile(currentItem.url, newBody);
        setEditable(false);
        setCurrentPath(getFileParamsFromUrl(window.location.href).f);
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
                    viewBox="0 0 32 32"
                    width="100%"
                    className={styles.icon}
                    onClick={() => setEditable(!isEditable)}
                />
            )}
        </div>
    );

    return (
        <Layout
            className={styles.container}
            toolbarChildrenLeft={toolbarLeft}
            toolbarChildrenRight={!isImage && currentItem ? toolbarRight : null}
            label={
                currentItem &&
                currentItem.url &&
                convertFileUrlToName(currentItem.url)
            }
            isLoading={updatingFile || loadCurrentItem}
            label={currentItem.url && convertFileUrlToName(currentItem.url)}
        >
            {error.FETCH_CURRENT_ITEM ? (
                <>
                    {console.log('error:', error)}
                    <div>Sorry, we cannot load this file.</div>
                    <p className={styles.error}>
                        Error: {error.FETCH_CURRENT_ITEM.message}
                    </p>
                </>
            ) : currentItem && currentItem.body !== undefined ? (
                !isImage ? (
                    isEditable ? (
                        <FileEditor
                            edit={isEditable}
                            value={newBody}
                            onChange={(e) => {
                                setNewBody(e.target.value);
                            }}
                            placeholder={getPlaceholder(currentItem.body)}
                        />
                    ) : (
                        <pre
                            className={classNames(styles.file, {
                                [styles.enabled]: isEditable,
                            })}
                            onClick={() => {
                                setEditable(true);
                            }}
                        >
                            {newBody}
                        </pre>
                    )
                ) : (
                    <img
                        src={currentItem.url}
                        alt="file"
                        className={styles.image}
                    />
                )
            ) : (
                <p>TEST</p>
            )}
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
    };
};

export default withRouter(
    connect(mapStateToProps, { setCurrentPath, updateFile })(FileView)
);
