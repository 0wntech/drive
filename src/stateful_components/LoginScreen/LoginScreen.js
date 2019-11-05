import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import auth from 'solid-auth-client';
import LoginForm from '../../functional_components/LoginForm/LoginForm';
import { Layout } from '../../functional_components/Layout';
import { login } from '../../actions/userActions';
import { fetchIdps } from '../../actions/appActions';

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
                break;
            default:
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
        const { idps } = this.props;
        return (
            <Layout label="Login">
                <LoginForm
                    idps={idps}
                    onLogin={this.onLogin}
                    getIdpStyles={this.getIdpStyles}
                />
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loadIdps: state.app.loadIdps,
        webId: state.user.webId,
        idps: state.app.idps,
    };
};

export default connect(
    mapStateToProps,
    { fetchIdps, login }
)(withRouter(LoginScreen));
