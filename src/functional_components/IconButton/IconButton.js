import React from 'react';
import PropTypes from 'prop-types';
import styles from './IconButton.module.css';
import classNames from 'classnames';

const IconButton = ({ children, className, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={classNames(styles.container, className)}
        >
            {children}
        </div>
    );
};

IconButton.propTypes = {
    children: PropTypes.array,
    className: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
};

export default IconButton;
