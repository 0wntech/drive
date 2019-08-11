import React from 'react';
import styles from './IdentityProvider.module.css';

export default function IdentityProvider({ title, url, description, icon }) {
    return (
        <div className={styles.container}>
            <img src={icon} />
        </div>
    );
}
