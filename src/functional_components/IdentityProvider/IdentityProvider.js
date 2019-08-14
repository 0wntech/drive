import React from 'react';
import styles from './IdentityProvider.module.css';

export default function IdentityProvider({
    title,
    url,
    description,
    icon,
    onLogin,
    color,
    textColor,
}) {
    return (
        <button
            className={styles.container}
            onClick={() => {
                onLogin(url + 'login');
            }}
            style={{ backgroundColor: `${color}` }}
        >
            <img src={icon} alt={description} />
            <div className={styles.info}>
                <p style={{ color: `${textColor}` }}>{title}</p>
            </div>
        </button>
    );
}
