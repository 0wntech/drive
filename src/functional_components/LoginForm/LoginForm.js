import React from 'react';
import styles from './LoginForm.module.css';
import IdentityProvider from '../IdentityProvider/IdentityProvider';

export default function LoginForm({ idps }) {
    console.log(idps);
    return (
        <div className={styles.form}>
            <h1>Login</h1>
            Choose an idp provider:
            {idps
                ? idps.map((idp) => {
                      return (
                          <IdentityProvider
                              description={idp.description}
                              url={idp.url}
                              icon={idp.icon}
                              title={idp.title}
                          />
                      );
                  })
                : ''}
        </div>
    );
}
