import React from 'react';
import { connect } from 'react-redux';
import styles from './LandingPage.module.css';
import Slogan from '../../assets/svgIcons/Slogan';
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
                    <Slogan width="100%" viewBox="0 0 971 219" />
                    {webId ? null : (
                        <div className={styles.buttons}>
                            <ActionButton
                                size="md"
                                label="Login"
                                color="blue"
                                onClick={login}
                            />
                        </div>
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
