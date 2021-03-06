import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import auth from 'solid-auth-client';
import LoginForm from '../LoginForm/LoginForm';
import { Layout } from '../Layout';
import { fetchIdps } from '../../actions/appActions';
import useWindowDimension from '../../hooks/useWindowDimension';
import { screen_l as screenL } from '../../styles/constants.scss';

const getIdpStyles = (title) => {
    const idp = {};
    switch (title) {
        case 'inrupt.net':
            idp.color = '#18A9E6';
            idp.textColor = '#fff';
            break;
        case 'solidcommunity.net':
            idp.color = '#7C4DFF';
            idp.textColor = '#fff';
            break;
        case 'solid.authing':
            idp.color = '#fff';
            idp.textColor = '#18A9E6';
            break;
        default:
            idp.color = '#fff';
            idp.textColor = '#333';
    }
    return idp;
};

const LoginPage = ({ webId, loadIdps, idps, fetchIdps, history, location }) => {
    const { width } = useWindowDimension();
    useEffect(() => {
        if (!loadIdps && !idps) fetchIdps();

        const returnToUrl = localStorage.getItem('returnToUrl');
        const cachedPath = returnToUrl ? JSON.parse(returnToUrl) : undefined;

        if (
            !webId &&
            history.location.state &&
            history.location.state.from.pathname
        ) {
            const attemptedPath = history.location.state.from;
            if (attemptedPath)
                localStorage.setItem(
                    'returnToUrl',
                    JSON.stringify(attemptedPath)
                );
        } else if (webId) {
            if (!!cachedPath) {
                history.push(cachedPath.pathname + cachedPath.search);
                localStorage.removeItem('returnToUrl');
            } else if (location.state && location.state.from.pathname) {
                if (history.pathname === '/') {
                    history.push('/home');
                } else {
                    history.push(
                        location.state.from.pathname +
                            location.state.from.search
                    );
                }
            } else {
                history.push('/home');
            }
        }
    });

    return (
        <Layout label="Login" hideToolbar={width < screenL}>
            <LoginForm
                idps={idps}
                onLogin={auth.login}
                getIdpStyles={getIdpStyles}
            />
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        loadIdps: state.app.loadIdps,
        webId: state.user.webId,
        idps: state.app.idps,
    };
};

export default connect(mapStateToProps, { fetchIdps })(withRouter(LoginPage));
