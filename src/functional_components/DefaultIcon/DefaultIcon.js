import React from 'react';
import classNames from 'classnames';
import styles from './DefaultIcon.module.scss';

export const DefaultIcon = ({ initials, className, ...rest }) => {
    return (
        <div className={classNames(styles.container, className)} {...rest}>
            {initials}
        </div>
    );
};

export default DefaultIcon;
