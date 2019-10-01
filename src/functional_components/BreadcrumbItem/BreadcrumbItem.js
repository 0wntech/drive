import React from 'react';
import styles from './BreadcrumbItem.module.css';
export default function BreadcrumbItem({ onClick, label }) {
    return (
        <div onClick={onClick} className={styles.container}>
            <div className={styles.breadcrumb}>{label}</div>
            <div className={styles.seperator}>/</div>
        </div>
    );
}
