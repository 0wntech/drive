import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Layout.module.css';
import { ClassicSpinner } from 'react-spinners-kit';

export const Layout = ({
    className,
    hideToolbar,
    children,
    toolbarChildrenRight,
    toolbarChildrenLeft,
    toolbarClassName,
    label,
    onClick,
    isLoading,
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
                    {label && (
                        <div className={styles.header} data-test-id="header">
                            {label}
                        </div>
                    )}
                    <div className={styles.toolbarRight}>
                        {toolbarChildrenRight}
                    </div>
                </div>
            )}
            <div
                onClick={onClick}
                className={classNames(styles.content, className)}
            >
                {isLoading ? (
                    <div className={styles.spinner}>
                        <ClassicSpinner
                            size={30}
                            color="#686769"
                            loading={isLoading}
                        />
                    </div>
                ) : (
                    children
                )}
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
