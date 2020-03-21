import React from 'react';
import styles from './BreadcrumbItem.module.css';
import PropTypes from 'prop-types';

function BreadcrumbItem({ onClick, label, seperator }) {
    return (
        <div onClick={onClick} className={styles.container}>
            <div className={styles.breadcrumb}>{label}</div>
            {seperator ? <div className={styles.seperator}>/</div> : null}
        </div>
    );
}

BreadcrumbItem.propTypes = {
    onClick: PropTypes.func,
    label: PropTypes.string,
    seperator: PropTypes.bool,
};

export default BreadcrumbItem;
