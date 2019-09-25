import React from 'react';
import styles from './ActionButton.module.css';
import classNames from 'classnames';

export const ActionButton = ({ label, className, color }) => {
    console.log(color);
    switch (color) {
        case 'red':
            color = 'red';
            break;
        case 'green':
            color = 'green';
            break;
        default:
            color = 'blue';
            break;
    }
    console.log(color);

    return (
        <div className={classNames(styles.container, className, styles[color])}>
            {label}
        </div>
    );
};
