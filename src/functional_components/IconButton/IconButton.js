import React from 'react';
import PropTypes from 'prop-types';
import styles from '../ActionButton/ActionButton.module.css';
import classNames from 'classnames';

const IconButton = ({ children, className, onClick, color, size, dataId }) => {
    return (
        <div
            data-test-id={dataId}
            onClick={onClick}
            className={classNames(
                styles.container,
                className,
                styles[color],
                styles[size]
            )}
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
    color: PropTypes.oneOf(['red', 'green', 'blue', 'white']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    dataId: PropTypes.string,
};

export default IconButton;
