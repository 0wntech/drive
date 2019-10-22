import React from 'react';
import styles from './Window.module.css';
import closeIcon from '../../assets/icons/x.png';
import PropTypes from 'prop-types';

function Window({ windowName, className, children, onClose }) {
    return (
        <div className={className}>
            <div className={styles.container}>
                <div className={styles.head}>
                    <span className={styles.title}>{windowName}</span>
                    <img
                        className={styles.close}
                        src={closeIcon}
                        onClick={onClose}
                    />
                </div>
                <div className={styles.body}>{children}</div>
            </div>
            <div className={styles.opacity} />
        </div>
    );
}

Window.propTypes = {
    windowName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.array,
    onClose: PropTypes.func,
};

export default Window;
