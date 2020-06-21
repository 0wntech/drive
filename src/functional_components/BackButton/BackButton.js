import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import classNames from 'classnames';

import styles from './Backbutton.module.scss';
import { setCurrentPath } from '../../actions/appActions';
import { getRootFromWebId, getPreviousPath } from '../../utils/url';

export const BackButton = ({ setCurrentPath, currentPath, webId, history }) => {
    const [previousPath, setPreviousPath] = useState(currentPath);
    useEffect(() => {
        console.log(currentPath, 'kaka');
        setPreviousPath(getPreviousPath(currentPath));
    }, [currentPath]);

    return (
        <div
            className={classNames(styles.container, {
                [styles.hidden]:
                    currentPath && getRootFromWebId(webId) === currentPath,
            })}
            onClick={() => {
                setCurrentPath(previousPath);
                history.push('/home');
            }}
        >
            Back
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentPath: state.app.currentPath,
        webId: state.user.webId,
    };
};

export default withRouter(
    connect(mapStateToProps, { setCurrentPath })(BackButton)
);
