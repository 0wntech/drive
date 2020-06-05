import React from 'react';
import { connect } from 'react-redux';
import styles from './LandingPage.module.css';
import ActionButton from '../ActionButton/ActionButton';
import { Layout } from '../Layout';

const LandingPage = ({ webId, history }) => {
    const login = function() {
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
                                    size="md"
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
                                    size="md"
                                    label="Login"
                                    color="blue"
                                    onClick={login}
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
