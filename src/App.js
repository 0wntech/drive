import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ClassicSpinner } from 'react-spinners-kit';
import Navigation from './functional_components/Navigation';
import Drive from './stateful_components/Drive';
import LoginScreen from './stateful_components/LoginScreen';
import auth from 'solid-auth-client';
import User from 'your-user';
import { ErrorBoundary } from './stateful_components/ErrorBoundary';
import { login, fetchUser, setWebId } from './actions/userActions';
import PrivateRoute from './functional_components/PrivateRoute';
import styles from './App.module.css';
import NotificationsPage from './stateful_components/NotificationsPage';
import LandingPage from './functional_components/LandingPage';
import { ProfilePage } from './functional_components/ProfilePage';
import { ContactsPage } from './functional_components/ContactsPage';
import { ContactProfilePage } from './functional_components/ContactProfilePage';
import { FileView } from './functional_components/FileView/FileView';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            webId: undefined,
            user: undefined,
            isProfileExpanded: false,
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.onProfileUpdate = this.onProfileUpdate.bind(this);
    }

    async login() {
        const session = await auth.currentSession();
        if (!session) {
            const idp = window.prompt(
                'Please enter the domain of your identity provider',
                'solid.community'
            );
            await auth.login(`https://${idp}`);
        } else {
            this.setState({
                webId: session.webId,
            });
        }
    }

    logout() {
        const { setWebId } = this.props;
        auth.logout().then(() => {
            setWebId(undefined);
            this.props.history.push('/');
        });
    }

    toggleSidebar() {
        this.setState({
            isProfileExpanded: !this.state.isProfileExpanded,
        });
    }

    onProfileUpdate(key, value, prevValues, webId) {
        const user = new User(this.state.webId);
        return user.editProfile(key, value, prevValues, webId).then(() => {
            user.getProfile().then((profile) => {
                console.log('Loading updated Profile');
                this.setState({
                    user: profile,
                });
            });
        });
    }

    componentDidMount() {
        const { login } = this.props;
        login();
        // auth.trackSession((session) => {
        //     if (!session) {
        //         this.props.login();
        //     } else {
        //         console.log('You are logged in, fetching data now');
        //         setWebId(session.webId);
        //         fetchUser(session.webId);
        //     }
        // });
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
                                webId={webId}
                                picture={user ? user.picture : undefined}
                                username={user ? user.name : undefined}
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
    connect(
        mapStateToProps,
        {
            login,
            fetchUser,
            setWebId,
        }
    )(App)
);
