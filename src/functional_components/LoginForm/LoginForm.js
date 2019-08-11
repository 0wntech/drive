import React from 'react';
import styles from './LoginForm.module.css';

export default function LoginForm() {
    return (
        <div className={styles.form}>
            <h1>Login</h1>
            <label htmlFor="username">
                Username
                <input id="username" type="text" />
            </label>
            <label htmlFor="username">
                Password
                <input id="username" type="password" />
            </label>
        </div>
    );
}
