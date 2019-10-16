import React from 'react';
import PropTypes from 'prop-types';
import styles from './AppActions.module.css';

import Alert from '../../assets/svgIcons/Alert';
import Arrow from '../../assets/svgIcons/Arrow';
import Folder from '../../assets/svgIcons/Folder';
import Settings from '../../assets/svgIcons/Settings';

const AppActions = ({
    alert,
    onArrowClick,
    onFolderClick,
    onSettingsClick,
}) => {
    return (
        <div className={styles.container}>
            {alert ? <Alert /> : null}
            <Arrow onClick={onArrowClick} />
            <Folder onClick={onFolderClick} />
            <Settings onClick={onSettingsClick} />
        </div>
    );
};

AppActions.propTypes = {
    alert: PropTypes.bool,
    onArrowClick: PropTypes.string,
    onFolderClick: PropTypes.func,
    onSettingsClick: PropTypes.func,
};

export default AppActions;
