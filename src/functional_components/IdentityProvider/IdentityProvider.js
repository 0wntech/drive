import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './IdentityProvider.module.scss';
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
    className,
}) {
    const [customIdp, setIdp] = useState('');

    return (
        <button
            data-test-id={title}
            className={classNames(styles.container, className)}
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
                <div
                    className={classNames(
                        styles.wrapper,
                        styles.customIdpWrapper
                    )}
                >
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
                    <div
                        className={styles.icon}
                        style={{
                            backgroundImage: `url(${icon})`,
                        }}
                    >
                        <img
                            src={icon}
                            alt={description}
                            style={{ visibility: 'hidden' }}
                        />
                    </div>
                    <div className={styles.info}>
                        <p style={{ color: `${textColor}` }}>{title}</p>
                    </div>
                </div>
            )}
        </button>
    );
}
