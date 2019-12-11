import React, { useState } from 'react';
import styles from './IdentityProvider.module.css';
import { getSafeLogin } from '../../utils/url';

export default function IdentityProvider({
    title,
    url,
    description,
    icon,
    onLogin,
    color,
    textColor,
    custom,
}) {
    const [customIdp, setIdp] = useState('');

    return (
        <button
            className={styles.container}
            onClick={() => {
                if (custom && customIdp !== '') {
                    onLogin(getSafeLogin(customIdp));
                } else if (!custom) {
                    onLogin(url + 'login');
                }
            }}
            style={{ backgroundColor: `${color}` }}
        >
            {custom ? (
                <div className={styles.wrapper}>
                    <input
                        className={styles.customIdp}
                        placeholder="Custom idp: e.g. inrupt.net"
                        onChange={(e) => {
                            setIdp(e.target.value);
                        }}
                    />
                </div>
            ) : (
                <div className={styles.wrapper}>
                    <img src={icon} alt={description} />
                    <div className={styles.info}>
                        <p style={{ color: `${textColor}` }}>{title}</p>
                    </div>
                </div>
            )}
        </button>
    );
}
