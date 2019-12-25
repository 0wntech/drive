import React from 'react';
import PropTypes from 'prop-types';
import styles from './AppActions.module.css';

import Alert from '../../assets/svgIcons/Alert';
import Arrow from '../../assets/svgIcons/ArrowRight';
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
            {!alert ? (
                <div className={styles.alertIcon}>
                    <Alert viewBox="0 0 25 25" width={17} height={17} />
                </div>
            ) : null}
            <div className={styles.icon} onClick={onArrowClick}>
                <Arrow viewBox="0 0 21 21" width={17} height={17} />
            </div>
            <div className={styles.icon} onClick={onFolderClick}>
                <Folder viewBox="0 0 21 21" width={17} height={17} />
            </div>
            <div className={styles.icon} onClick={onSettingsClick}>
                <Settings viewBox="0 0 25 25" width={17} height={17} />
            </div>
        </div>
    );
};

AppActions.propTypes = {
    alert: PropTypes.bool,
    onArrowClick: PropTypes.func,
    onFolderClick: PropTypes.func,
    onSettingsClick: PropTypes.func,
};

export default AppActions;
