import React from 'react';
import PropTypes from 'prop-types';
import styles from './ActionButton.module.css';
import classNames from 'classnames';

const ActionButton = ({ label, className, color, onClick, size, disabled }) => {
    color = color ? color : 'blue';
    size = size ? size : 'lg';

    return (
        <div
            className={classNames(
                styles.container,
                className,
                styles[color],
                styles[size],
                {
                    [styles.disabled]: disabled,
                }
            )}
            onClick={onClick}
        >
            {label}
        </div>
    );
};

ActionButton.propTypes = {
    color: PropTypes.oneOf(['red', 'green', 'blue', 'white']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default ActionButton;
