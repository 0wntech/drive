import React from 'react';
import classnames from 'classnames';
import styles from './BottomOverlay.module.scss';

export const BottomOverlay = ({ children, className }) => {
    return (
        <div className={classnames(styles.overlay, className)}>{children}</div>
    );
};

export default BottomOverlay;
