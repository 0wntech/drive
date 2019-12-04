import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import mime from 'mime';
import { ClassicSpinner } from 'react-spinners-kit';
import { Layout } from '../Layout';
import styles from './FileView.module.css';
import { setCurrentPath, updateFile } from '../../actions/appActions';
import { getBreadcrumbsFromUrl, getFileParamsFromUrl } from '../../utils/url';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Edit from '../../assets/svgIcons/Edit';
import SvgCheck from '../../assets/svgIcons/Check';
import SvgX from '../../assets/svgIcons/X';
import { FileEditor } from '../FileEditor/FileEditor';

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
        if (fileParam) {
            if (!currentItem.body || !currentPath) {
                setCurrentPath(fileParam);
            } else if (currentItem.files || currentItem.folders) {
                history.push('/home');
            }
        }
    });

    const fileType = mime.getType(currentItem.url);
    const isImage = fileType && fileType.split('/')[0] === 'image';

    const [isEditable, setEditable] = useState(false);
    const [newBody, setNewBody] = useState('');

    const onCancel = () => {
        setNewBody(currentItem.body);
        setEditable(false);
    };

    const onSubmit = () => {
        if (currentItem.body !== newBody) updateFile(currentItem.url, newBody);
        setEditable(false);
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
        >
            {(updatingFile, loadCurrentItem) ? (
                <div className={styles.spinner}>
                    <ClassicSpinner
                        size={30}
                        color="#686769"
                        loading={(updatingFile, loadCurrentItem)}
                    />
                </div>
            ) : error ? (
                <>
                    <div>Sorry, we cannot load this file.</div>
                    <p className={styles.error}>{error.message}</p>
                </>
            ) : currentItem.body || currentItem.body === '' ? (
                !isImage ? (
                    isEditable ? (
                        <FileEditor
                            edit={isEditable}
                            value={
                                newBody === '' &&
                                currentItem.body &&
                                currentItem.body !== ''
                                    ? currentItem.body
                                    : newBody
                            }
                            onChange={(e) => {
                                setNewBody(e.target.value);
                            }}
                            placeholder={
                                currentItem.body && currentItem.body !== ''
                                    ? currentItem.body
                                    : 'Empty'
                            }
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
                            {newBody === '' ? currentItem.body : newBody}
                        </pre>
                    )
                ) : (
                    <img
                        src={currentItem.url}
                        alt="file"
                        className={styles.image}
                    />
                )
            ) : null}
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
    connect(
        mapStateToProps,
        { setCurrentPath, updateFile }
    )(FileView)
);
