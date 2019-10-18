import React from 'react';
import PropTypes from 'prop-types';
import styles from './AppListItem.module.css';

import X from '../../assets/svgIcons/X';
import AppActions from '../AppActions/AppActions';

const AppListItem = ({ iconSrc, name }) => {
    return (
        <div className={styles.container}>
            <div className={styles.deleteButton}>
                <X />
            </div>
            <div
                className={styles.appIcon}
                style={{ backgroundImage: `url('${iconSrc}')` }}
            />
            <div className={styles.name}>{name}</div>
            <AppActions />
        </div>
    );
};

AppListItem.propTypes = {
    iconSrc: PropTypes.string,
    name: PropTypes.string,
    permissions: PropTypes.object,
};

export default AppListItem;
