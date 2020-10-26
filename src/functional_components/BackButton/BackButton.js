import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import url from 'url';

import styles from './Backbutton.module.scss';
import { setCurrentPath } from '../../actions/appActions';
import { getPreviousPath } from '../../utils/url';

export const BackButton = ({
    currentPath,
    rootUrl,
    history,
}) => {
    const [previousPath, setPreviousPath] = useState(currentPath);
    useEffect(() => {
        setPreviousPath(getPreviousPath(currentPath));
    }, [currentPath]);

    console.log(previousPath)

    return (
        currentPath && (
            <div
                className={classNames(styles.container, {
                    [styles.hidden]: currentPath && rootUrl === currentPath,
                })}
                onClick={() => {
                    history.push(
                        `/home/${encodeURIComponent(
                            url.parse(previousPath).pathname
                        )}`
                    );
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
