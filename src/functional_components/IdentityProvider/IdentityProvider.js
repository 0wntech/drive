import React, { useState } from 'react';
import styles from './IdentityProvider.module.css';

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
    console.log(customIdp.lastIndexOf('https://') === -1);

    return (
        <button
            className={styles.container}
            onClick={() => {
                let idpUrl = customIdp;
                if (custom && customIdp != '') {
                    if (customIdp.lastIndexOf('https://') === -1) {
                        idpUrl = 'https://' + idpUrl;
                    }
                    idpUrl = customIdp.endsWith('/')
                        ? idpUrl + 'login'
                        : idpUrl + '/login';
                    console.log(idpUrl);
                    onLogin(idpUrl);
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
                        placeholder="Custom idp..."
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
