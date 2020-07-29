import React from 'react';
import styles from './BottomOverlay.module.scss';

export const BottomOverlay = ({ children }) => {
    return <div className={styles.overlay}>{children}</div>;
};

export default BottomOverlay;
