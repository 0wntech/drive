import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ClassicSpinner } from 'react-spinners-kit';
import Navigation from './functional_components/Navigation';
import Drive from './functional_components/Drive';
import LoginScreen from './stateful_components/LoginScreen';
import { ErrorBoundary } from './stateful_components/ErrorBoundary';
import { login, fetchUser, setWebId } from './actions/userActions';
import PrivateRoute from './functional_components/PrivateRoute';
import styles from './App.module.css';
import NotificationsPage from './stateful_components/NotificationsPage';
import LandingPage from './functional_components/LandingPage';
import { ProfilePage } from './functional_components/ProfilePage';
import { ContactsPage } from './functional_components/ContactsPage';
import { ContactProfilePage } from './functional_components/ContactProfilePage';
import AppOverviewPage from './functional_components/AppOverviewPage';
import FileView from './functional_components/FileView/FileView';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { login } = this.props;
        login();
    }

    render() {
        const { webId, user, session, loadLogin, loadUser } = this.props;
        if (loadLogin || loadUser) {
            return (
                <div className={styles.spinner}>
                    <ClassicSpinner
                        size={30}
                        color="#686769"
                        loading={loadLogin || loadUser}
                    />
                </div>
            );
        } else {
            console.log(user);
            return (
                <div
                    className={styles.grid}
                    style={{ height: '100%', overflowY: 'hidden' }}
                >
                    <ErrorBoundary>
                        <div className={styles.navArea}>
                            <Navigation
                                toggleSidebar={this.toggleSidebar}
                                onLogout={this.logout}
                                onLogin={this.login}
                            />
                        </div>

                        <div className={styles.mainArea}>
                            <Switch>
                                <Route path="/" exact component={LandingPage} />
                                <PrivateRoute
                                    session={session}
                                    path="/home"
                                    component={<Drive />}
                                />
                                <PrivateRoute
                                    session={session}
                                    path="/apps"
                                    component={<AppOverviewPage />}
                                />
                                <PrivateRoute
                                    session={session}
                                    path="/profile"
                                    component={<ProfilePage />}
                                />
                                <PrivateRoute
                                    session={session}
                                    path="/contacts"
                                    component={<ContactsPage />}
                                />
                                <PrivateRoute
                                    session={session}
                                    path="/contact"
                                    component={<ContactProfilePage />}
                                />
                                <PrivateRoute
                                    session={session}
                                    path="/notifications"
                                    component={<NotificationsPage />}
                                />
                                <PrivateRoute
                                    session={session}
                                    path="/drive"
                                    component={<Drive webId={webId} />}
                                />
                                <PrivateRoute
                                    session={session}
                                    path="/file"
                                    component={<FileView />}
                                />
                                <Route
                                    session={session}
                                    path="/login"
                                    component={() => (
                                        <LoginScreen webId={webId} />
                                    )}
                                />
                            </Switch>
                        </div>
                    </ErrorBoundary>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        webId: state.user.webId,
        user: state.user.user,
        session: state.user.session,
        loadLogin: state.user.loadLogin,
        loadUser: state.user.loadUser,
        currentFolderTree: state.app.currentFolderTree,
        currentPath: state.app.currentPath,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        login,
        fetchUser,
        setWebId,
    })(App)
);
