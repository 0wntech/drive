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

    getIdpStyles(title) {
        const idp = {};
        switch (title) {
            case 'inrupt.net':
                idp.color = '#18A9E6';
                idp.textColor = '#fff';
                break;
            case 'solid.community':
                idp.color = '#7C4DFF';
                idp.textColor = '#fff';
                break;
            case 'solid.authing':
                idp.color = '#fff';
                idp.textColor = '#18A9E6';
        }
        return idp;
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
<<<<<<< HEAD
                    <LoginForm
                        idps={idps}
                        onLogin={this.onLogin}
                        getIdpStyles={this.getIdpStyles}
                    />
=======
                    <LoginForm idps={idps} onLogin={this.onLogin} />
>>>>>>> Remove register form
                ) : (
                    <LoginForm
                        idps={idps}
                        onLogin={this.onLogin}
                        getIdpStyles={this.getIdpStyles}
                    />
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
