import React from 'react';
import styles from './RegisterForm.module.css';

export default function RegisterForm() {
    return (
        <div className={styles.form}>
            <h1>Register</h1>
            <label htmlFor="username">
                <h6>Username</h6>
                <p>
                    This username will, together with our domain, form your
                    webId.
                </p>
                <input
                    id="username"
                    type="text"
                    placeholder="Enter your desired username..."
                />
            </label>
            <label htmlFor="username">
                <h6>Password</h6>
                <p>
                    Please choose a strong password to protect your account as
                    best as possible.
                </p>
                <input
                    id="username"
                    type="password"
                    placeholder="Enter your desired password..."
                />
            </label>
            <label htmlFor="username">
                <h6>Repeat Password</h6>
                <input
                    id="username"
                    type="password"
                    placeholder="Please repeat your password..."
                />
            </label>
            <label htmlFor="username">
                <h6>Email</h6>
                <p>This email will be used for account recovery only.</p>
                <input
                    id="username"
                    type="email"
                    placeholder="Enter your email..."
                />
            </label>
            <label htmlFor="username">
                <h6>Name</h6>
                <p>
                    This name will appear in your profile. Leave blank if you
                    want to fill it out later.
                </p>
                <input
                    id="username"
                    type="text"
                    placeholder="Enter a name for your profile..."
                />
            </label>
        </div>
    );
}
