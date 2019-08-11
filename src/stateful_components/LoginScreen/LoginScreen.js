import React from 'react';
import styles from './LoginScreen.module.css';
import RegisterForm from '../../functional_components/RegisterForm/RegisterForm';
import LoginForm from '../../functional_components/LoginForm/LoginForm';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newAccount: {},
        };
    }

    render() {
        const register = window.location.href.includes('register');
        return (
            <div className={styles.container}>
                <h1>{register ? '🚀' : '👋'}</h1>
                {register ? <RegisterForm /> : <LoginForm />}
            </div>
        );
    }
}

export default LoginScreen;
