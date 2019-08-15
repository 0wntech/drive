import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import auth from 'solid-auth-client';
import styles from './LoginScreen.module.css';
import LoginForm from '../../functional_components/LoginForm/LoginForm';
import { fetchIdps, login } from '../../actions/UserActions';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.onLogin = this.onLogin.bind(this);
    }

    onLogin(loginUrl) {
        const { login } = this.props;
        auth.login(loginUrl).then(() => {
            login();
        });
    }

    componentDidMount() {
        const { webId, loadIdps, idps, fetchIdps } = this.props;
        if (!webId && !loadIdps && !idps) {
            fetchIdps();
        } else if (webId) {
            this.props.history.push('/home');
        }
    }

    render() {
        const { register, idps } = this.props;
        return (
            <div className={styles.container}>
                <h1>{register ? '👋' : '🚀'}</h1>
                {register ? (
                    <LoginForm idps={idps} onLogin={this.onLogin} />
                ) : (
                    <LoginForm idps={idps} onLogin={this.onLogin} />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        idps: state.app.idps,
        loadIdps: state.app.loadIdps,
        webId: state.app.webId,
    };
};

export default connect(
    mapStateToProps,
    { fetchIdps, login }
)(withRouter(LoginScreen));
