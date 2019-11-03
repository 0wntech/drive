import React from 'react';
import styles from './LoginForm.module.css';
import IdentityProvider from '../IdentityProvider/IdentityProvider';

export default function LoginForm({ idps, onLogin, getIdpStyles }) {
    return (
        <div className={styles.container}>
            <p>Choose an identity provider</p>
            <div className={styles.idpList}>
                {idps
                    ? idps.map((idp, index) => {
                          const { color, textColor } = getIdpStyles(idp.title);
                          return (
                              <IdentityProvider
                                  //   description={idp.description}
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
                <IdentityProvider custom onLogin={onLogin} />
            </div>
        </div>
    );
}
