import React from 'react';
import styles from './LoginForm.module.css';
import IdentityProvider from '../IdentityProvider/IdentityProvider';

export default function LoginForm({ idps, onLogin, getIdpStyles }) {
    return (
        <div className={styles.container}>
            <div className={styles.idpList}>
                <h1>Login</h1>
                <p>Choose an identity provider</p>
                <IdentityProvider
                    description={
                        'Owntech is a german identity provider, dedicated to Data Ownership'
                    }
                    url={'https://owntech.de/'}
                    icon={'https://owntech.de/favicon.ico'}
                    title={'owntech.de'}
                    key="aa"
                    onLogin={onLogin}
                    color="#fff"
                    textColor={'#000'}
                />
                {idps
                    ? idps.map((idp, index) => {
                          const { color, textColor } = getIdpStyles(idp.title);
                          return (
                              <IdentityProvider
                                  description={idp.description}
                                  url={idp.url}
                                  icon={idp.icon}
                                  title={idp.title}
                                  key={index}
                                  onLogin={onLogin}
                                  color={color}
                                  textColor={textColor}
                              />
                          );
                      })
                    : ''}
            </div>
        </div>
    );
}
