import React from 'react';
import styles from './LoginScreen.module.css';
import RegisterForm from '../../functional_components/RegisterForm/RegisterForm';
import LoginForm from '../../functional_components/LoginForm/LoginForm';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webId: props.webId,
        };
    }

    render() {
        return (
            <div className={styles.container}>
                <RegisterForm />
                <LoginForm />
            </div>
        );
    }
}

export default LoginScreen;
