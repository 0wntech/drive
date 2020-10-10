import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import classNames from 'classnames';

import styles from './Backbutton.module.scss';
import { setCurrentPath } from '../../actions/appActions';
import { getPreviousPath } from '../../utils/url';

export const BackButton = ({
    setCurrentPath,
    currentPath,
    rootUrl,
    history,
}) => {
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
                    setCurrentPath(previousPath);
                    history.push('/home');
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
