import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import auth from 'solid-auth-client';
import LoginForm from '../../functional_components/LoginForm/LoginForm';
import { Layout } from '../../functional_components/Layout';
import { fetchIdps } from '../../actions/appActions';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
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
        const {
            webId,
            loadIdps,
            idps,
            fetchIdps,
            history,
            location,
        } = this.props;

        if (!webId && !loadIdps && !idps) {
            const attemptedPath = history.location.state
                ? history.location.state.from.pathname
                : undefined;
            if (attemptedPath)
                localStorage.setItem(
                    'returnToUrl',
                    JSON.stringify(attemptedPath)
                );
            if (!attemptedPath) localStorage.removeItem('returnToUrl');
            fetchIdps();
        } else if (webId) {
            const cachedPath = localStorage.getItem('returnToUrl')
                ? JSON.parse(localStorage.getItem('returnToUrl'))
                : undefined;

            if (!!cachedPath) {
                history.push(cachedPath.pathname + cachedPath.search);
            } else if (location.state && location.state.from.pathname) {
                history.push(
                    location.state.from.pathname + location.state.from.search
                );
            } else {
                history.push('/home');
            }
        }
    }

    render() {
        const { idps } = this.props;
        return (
            <Layout label="Login">
                <LoginForm
                    idps={idps}
                    onLogin={auth.login}
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

export default connect(mapStateToProps, { fetchIdps })(withRouter(LoginScreen));
