import React from 'react';
import classnames from 'classnames';
import styles from './Window.module.scss';
import PropTypes from 'prop-types';
import X from '../../assets/svgIcons/X';

function Window({ windowName, className, children, onClose, visible }) {
    return visible ? (
        <div
            className={styles.wrapper}
            onClick={(e) => {
                if (
                    typeof e.target.className === 'string' &&
                    e.target.className.includes('Window_wrapper')
                )
                    onClose();
            }}
        >
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
                <div className={classnames(styles.body, className)}>
                    {children}
                </div>
            </div>
        </div>
    ) : null;
}

Window.propTypes = {
    windowName: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.array,
    onClose: PropTypes.func,
    visible: PropTypes.bool,
};

export default Window;
