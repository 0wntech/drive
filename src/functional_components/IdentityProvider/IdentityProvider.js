import React from 'react';
import styles from './IdentityProvider.module.css';

export default function IdentityProvider({
    title,
    url,
    description,
    icon,
    onLogin,
}) {
    return (
        <div className={styles.container}>
            <img src={icon} />
            <div className={styles.info}>
                <h5>{title}</h5>
                <p>{description}</p>
            </div>
            <div className={styles.buttons}>
                <button
                    onClick={() => {
                        onLogin(url + 'login');
                    }}
                >
                    Login
                </button>
                <a
                    href={
                        url +
                        'register?redirect_uri=http://localhost:3000/login'
                    }
                >
                    Register
                </a>
            </div>
        </div>
    );
}
