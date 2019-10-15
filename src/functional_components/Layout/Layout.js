import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Layout.module.css';

const Layout = ({
    className,
    hideToolbar,
    children,
    toolbarChildrenRight,
    toolbarChildrenLeft,
    toolbarClassName,
    label,
}) => {
    return (
        <div className={classNames(styles.grid)}>
            {hideToolbar ? null : (
                <div
                    className={classNames(styles.toolbarArea, toolbarClassName)}
                >
                    <div className={styles.toolbarLeft}>
                        {toolbarChildrenLeft}
                    </div>
                    <div className={styles.header}>{label}</div>
                    <div className={styles.toolbarRight}>
                        {toolbarChildrenRight}
                    </div>
                </div>
            )}
            <div className={classNames(styles.content, className)}>
                {children}
            </div>
        </div>
    );
};

Layout.propTypes = {
    className: PropTypes.string,
    hideToolbar: PropTypes.bool,
    children: PropTypes.object,
    toolbarChildrenLeft: PropTypes.object,
    toolbarChildrenRight: PropTypes.object,
    label: PropTypes.string,
};

export default Layout;
