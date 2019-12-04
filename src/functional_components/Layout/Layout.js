import React from 'react';
import { connect } from 'react-redux';
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
    updatingFile,
    loadCurrentItem,
    loadDeletion,
    loadPaste,
    updatingProfile,
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
            <div
                onClick={onClick}
                className={classNames(styles.content, className)}
            >
                {loadCurrentItem ||
                loadDeletion ||
                loadPaste ||
                updatingFile ||
                updatingProfile ? (
                    <div className={styles.spinner}>
                        <ClassicSpinner
                            size={30}
                            color="#686769"
                            loading={
                                loadCurrentItem ||
                                loadDeletion ||
                                loadPaste ||
                                updatingFile ||
                                updatingProfile
                            }
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

const mapStateToProps = (state) => {
    return {
        loadCurrentItem: state.app.loadCurrentItem,
        loadDeletion: state.app.loadDeletion,
        loadPaste: state.app.loadPaste,
        updatingFile: state.app.updatingFile,
        updatingProfile: state.user.updatingProfile,
    };
};

export default connect(mapStateToProps, {})(Layout);
