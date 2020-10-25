import React from 'react';
import auth from 'solid-auth-client';
import { connect } from 'react-redux';
import styles from './LandingPage.module.css';
import ActionButton from '../ActionButton/ActionButton';
import { Layout } from '../Layout';

const onRegister = () => {
    auth.login('https://aws.owntech.de/', {
        popupUri: 'https://aws.owntech.de/register',
        callbackUri: window.location.href + 'login',
    });
};

const LandingPage = ({ webId, history }) => {
    const login = function () {
        history.push('/login');
    };

    return (
        <Layout className={styles.grid} hideToolbar>
            <div className={styles.mainArea}>
                <div className={styles.container}>
                    {webId ? (
                        <>
                            <div className={styles.slogan}>
                                You are on your own now. You are welcome.
                            </div>
                            <div className={styles.buttons}>
                                <ActionButton
                                    dataId="login_btn"
                                    size="lg"
                                    label="Go Home"
                                    color="blue"
                                    onClick={() => {
                                        history.push('/home');
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.slogan}>
                                Own your digital experience.
                            </div>
                            <div className={styles.buttons}>
                                <ActionButton
                                    dataId="login_btn"
                                    size="lg"
                                    label="Login"
                                    color="blue"
                                    onClick={login}
                                />
                                <ActionButton
                                    size="lg"
                                    label="Register"
                                    color="green"
                                    className={styles.registerButton}
                                    onClick={onRegister}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    webId: state.user.webId,
});

export default connect(mapStateToProps, {})(LandingPage);
