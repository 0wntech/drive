import React from 'react';
import styles from './Window.module.css';
import PropTypes from 'prop-types';
import X from '../../assets/svgIcons/X';

function Window({ windowName, className, children, onClose, visible }) {
    return visible ? (
        <div className={className}>
            <div className={styles.container}>
                <div className={styles.head}>
                    <span className={styles.title}>{windowName}</span>
                    <X
                        className={styles.close}
                        preserveAspectRatio="none"
                        viewBox="5 4 24 24"
                        onClick={onClose}
                    />
                </div>
                <div className={styles.body}>{children}</div>
            </div>
            <div onClick={onClose} className={styles.opacity} />
        </div>
    ) : null;
}

Window.propTypes = {
    windowName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.array,
    onClose: PropTypes.func,
};

export default Window;
