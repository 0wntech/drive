import React from 'react';
import PropTypes from 'prop-types';
import styles from './ActionButton.module.css';
import classNames from 'classnames';

const ActionButton = ({ label, className, color, onClick, size }) => {
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
    
    switch (size) {
        case 'sm':
            size = 'sm';
            break;
        case 'md':
            size = 'md';
            break;
        default:
            size = 'lg';
            break;
    }

    return (
        <div
            className={classNames(styles.container, className, styles[color], styles[size])}
            onClick={onClick}
        >
            {label}
        </div>
    );
};

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ActionButton;
