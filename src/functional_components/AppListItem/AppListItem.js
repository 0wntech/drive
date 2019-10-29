import React from 'react';
import PropTypes from 'prop-types';
import styles from './AppListItem.module.css';
import useHover from '../../hooks/useHover';

import X from '../../assets/svgIcons/X';
import AppActions from '../AppActions/AppActions';

const AppListItem = ({ iconSrc, name, onClick }) => {
    const [hoverRef, isHovered] = useHover();
    return (
        <div ref={hoverRef} onClick={onClick} className={styles.container}>
            {isHovered ? (
                <div className={styles.deleteButton}>
                    <X viewBox="0 0 32 32" className={styles.xIcon} />
                </div>
            ) : null}
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