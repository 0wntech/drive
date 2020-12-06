import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import url from 'url';

import styles from './Backbutton.module.scss';
import { setCurrentPath } from '../../actions/appActions';
import {
    getContactFolderRoute,
    getHomeRoute,
    getPreviousPath,
    getRootFromWebId,
} from '../../utils/url';

export const BackButton = ({ currentPath, rootUrl, history, webId }) => {
    const [previousPath, setPreviousPath] = useState(currentPath);
    useEffect(() => {
        setPreviousPath(getPreviousPath(currentPath));
    }, [currentPath]);

    return (
        currentPath && (
            <div
                className={classNames(styles.container, {
                    [styles.hidden]: currentPath && rootUrl === currentPath,
                })}
                onClick={() => {
                    const currentHost = url.parse(currentPath).host;
                    if (currentHost === url.parse(webId).host) {
                        history.push(getHomeRoute(previousPath));
                    } else {
                        console.info(
                            currentPath ===
                                url.format({
                                    protocol: 'https:',
                                    host: currentHost,
                                    pathname: '/',
                                })
                        );
                        if (
                            currentPath ===
                            url.format({
                                protocol: 'https:',
                                host: currentHost,
                                pathname: '/',
                            })
                        ) {
                            history.push(getHomeRoute(getRootFromWebId(webId)));
                        } else {
                            history.push(
                                getContactFolderRoute(currentHost, previousPath)
                            );
                        }
                    }
                }}
            >
                Back
            </div>
        )
    );
};

const mapStateToProps = (state) => {
    return {
        rootUrl: state.app.rootUrl,
        currentPath: state.app.currentPath,
        webId: state.user.webId,
    };
};

export default withRouter(
    connect(mapStateToProps, { setCurrentPath })(BackButton)
);
