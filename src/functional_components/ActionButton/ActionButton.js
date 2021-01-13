import React from 'react';
import PropTypes from 'prop-types';
import styles from './ActionButton.module.scss';
import classNames from 'classnames';

const ActionButton = ({
    label,
    className,
    color = 'blue',
    onClick,
    size = 'lg',
    type = 'primary',
    disabled,
    dataId,
    children,
}) => {
    return (
        <div
            data-test-id={dataId}
            className={classNames(
                styles.container,
                className,
                styles[color],
                styles[size],
                styles[type],
                {
                    [styles.disabled]: disabled,
                }
            )}
            onClick={onClick}
        >
            {label ? label : children}
        </div>
    );
};

ActionButton.propTypes = {
    primary: PropTypes.oneOf(['primary', 'secondary', 'confirm', 'danger']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    dataId: PropTypes.string,
};

export default ActionButton;
