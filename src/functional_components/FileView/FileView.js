import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import { Layout } from '../Layout';
import styles from './FileView.module.css';
import { setCurrentPath, updateFile } from '../../actions/appActions';
import { getBreadcrumbsFromUrl, getFileParamFromUrl } from '../../utils/url';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import Edit from '../../assets/svgIcons/Edit';
import SvgCheck from '../../assets/svgIcons/Check';
import SvgX from '../../assets/svgIcons/X';
import { ClassicSpinner } from 'react-spinners-kit';

export const FileView = ({
    currentItem,
    currentPath,
    webId,
    setCurrentPath,
    updateFile,
    updatingFile,
    history,
}) => {
    const fileParam = getFileParamFromUrl(window.location.href);
    if (fileParam) {
        if (!currentPath || !currentItem.body) {
            setCurrentPath(fileParam);
        } else if (currentItem.files || currentItem.folders) {
            history.push('/home');
        }
    }

    const [isEditable, setEditable] = useState(true);
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
            toolbarChildrenRight={toolbarRight}
        >
            {updatingFile ? (
                <div className={styles.spinner}>
                    <ClassicSpinner
                        size={30}
                        color="#686769"
                        loading={updatingFile}
                    />
                </div>
            ) : currentItem.body ? (
                isEditable ? (
                    <textarea
                        autoFocus
                        className={classNames(styles.editor, {
                            [styles.enabled]: isEditable,
                        })}
                        value={
                            newBody === '' && currentItem.body !== ''
                                ? currentItem.body
                                : newBody
                        }
                        onChange={(e) => {
                            setNewBody(e.target.value);
                        }}
                        placeholder={currentItem.body}
                    />
                ) : (
                    <pre
                        className={classNames(styles.editor, {
                            [styles.enabled]: isEditable,
                        })}
                        onClick={() => {
                            setEditable(true);
                        }}
                    >
                        {newBody === '' ? currentItem.body : newBody}
                    </pre>
                )
            ) : null}
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        currentItem: state.app.currentItem,
        currentPath: state.app.currentPath,
        webId: state.user.webId,
        updatingFile: state.app.updatingFile,
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        { setCurrentPath, updateFile }
    )(FileView)
);
