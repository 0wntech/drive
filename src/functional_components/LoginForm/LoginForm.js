import React from 'react';
import styles from './LoginForm.module.css';
import IdentityProvider from '../IdentityProvider/IdentityProvider';

export default function LoginForm({ idps, onLogin }) {
    console.log(idps);
    return (
        <div className={styles.container}>
            <h1>Login</h1>
            Choose an identity provider:
            <div className={styles.idpList}>
                <IdentityProvider
                    description={
                        'Owntech is a german identity provider, dedicated to Data Ownership'
                    }
                    url={'https://owntech.de/'}
                    icon={'https://owntech.de/favicon.ico'}
                    title={'owntech.de'}
                    key="aa"
                    onLogin={onLogin}
                />
                {idps
                    ? idps.map((idp, index) => {
                          return (
                              <IdentityProvider
                                  description={idp.description}
                                  url={idp.url}
                                  icon={idp.icon}
                                  title={idp.title}
                                  key={index}
                                  onLogin={onLogin}
                              />
                          );
                      })
                    : ''}
            </div>
        </div>
    );
}
