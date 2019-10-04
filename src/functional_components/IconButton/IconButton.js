import React from 'react';
import PropTypes from 'prop-types';
import styles from './IconButton.module.css';
import classNames from 'classnames';

import Plus from '../../assets/svgIcons/Plus';

const IconButton = ({ src, className, label, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={classNames(styles.container, className)}
        >
            <Plus className={styles.icon} />
            <div className={styles.label}>{label}</div>
        </div>
    );
};

IconButton.propTypes = {
    src: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
};

export default IconButton;
