import React from 'react';
import { connect } from 'react-redux';
import styles from './LandingPage.module.css';
import Slogan from '../../assets/svgIcons/Slogan';
import ActionButton from '../ActionButton/ActionButton';

const LandingPage = ({ webId, history }) => {
    const login = function() {
        history.push('/login');
    };

    const register = function() {
        window.location.href = `https://owntech.de/register?returnToUrl=${window.location.href}login`;
    };

    console.log(webId);

    return (
        <div className={styles.grid}>
            <div className={styles.mainArea}>
                <div className={styles.container}>
                    <Slogan width="100%" viewBox="0 0 971 219" />
                    {webId ? null : (
                        <div className={styles.buttons}>
                            <ActionButton
                                label="Register"
                                color="green"
                                size="md"
                                onClick={register}
                            />
                            <p>or</p>
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
        </div>
    );
};

const mapStateToProps = (state) => ({
    webId: state.app.webId,
});

export default connect(
    mapStateToProps,
    {}
)(LandingPage);
