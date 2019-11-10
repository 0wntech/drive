import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import url from 'url';
import { Layout } from '../Layout';
import styles from './FileView.module.css';
import { setCurrentPath } from '../../actions/appActions';
import { getBreadcrumbsFromUrl } from '../../utils/url';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

export const FileView = ({
    currentItem,
    currentPath,
    webId,
    setCurrentPath,
    history,
}) => {
    const fileParam = url
        .parse(window.location.href)
        .search.split('f=')[1]
        .split('&')[0];
    if (fileParam) {
        if (!currentPath || !currentItem.body) {
            setCurrentPath(fileParam);
        }
    }

    const toolbarLeft = (
        <div className={styles.breadcrumbsContainer}>
            <Breadcrumbs
                onClick={(path) => {
                    if (path !== currentPath && path !== currentPath + '/') {
                        console.log(path);
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

    return (
        <Layout className={styles.container} toolbarChildrenLeft={toolbarLeft}>
            {currentItem ? <div>{currentItem.body}</div> : null}
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        currentItem: state.app.currentItem,
        currentPath: state.app.currentPath,
        webId: state.user.webId,
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        { setCurrentPath }
    )(FileView)
);
