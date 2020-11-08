import React from 'react';
import classnames from 'classnames';
import styles from './Window.module.scss';
import PropTypes from 'prop-types';
import X from '../../assets/svgIcons/X';
import { ClassicSpinner } from 'react-spinners-kit';

function Window({
    windowName,
    className,
    containerClassName,
    children,
    onClose,
    visible,
    loading,
}) {
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
            <div className={classnames(styles.container, containerClassName)}>
                <div className={styles.head}>
                    <span
                        className={styles.title}
                        data-test-id={`window-${windowName.replace(' ', '-')}`}
                    >
                        {windowName}
                    </span>
                    <X
                        className={styles.close}
                        preserveAspectRatio="none"
                        viewBox="5 4 24 24"
                        onClick={onClose}
                    />
                </div>
                <div className={classnames(styles.body, className)}>
                    {loading ? (
                        <ClassicSpinner
                            size={30}
                            color="#686769"
                            loading={loading}
                        />
                    ) : (
                        children
                    )}
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
