import React from 'react';
import classnames from 'classnames';

import styles from './AccessToggle.module.scss';

export const AccessToggle = ({ disabled, active, mode, onClick }) => (
    <div
        onClick={!disabled && onClick}
        className={classnames(styles.accessToggle, {
            [styles.active]: active,
            [styles.disabled]: disabled,
        })}
    >
        Can {mode}
    </div>
);

export default AccessToggle;
