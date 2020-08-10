import React from 'react';
import classnames from 'classnames';
import styles from './BottomOverlay.module.scss';

export const BottomOverlay = ({ children, className, hide = false }) => {
    return (
        <div
            className={classnames(styles.overlay, className, {
                [styles.hide]: hide,
            })}
        >
            {children}
        </div>
    );
};

export default BottomOverlay;
