import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ClassicSpinner } from 'react-spinners-kit';
import Navigation from './functional_components/Navigation';
import Drive from './stateful_components/Drive';
import LoginScreen from './stateful_components/LoginScreen';
import { ProfileSideBar } from './functional_components/ProfileSideBar';
import auth from 'solid-auth-client';
import User from 'your-user';
import { ErrorBoundary } from './stateful_components/ErrorBoundary';
import { ContactSidebar } from './functional_components/ContactSidebar';
import {
    login,
    fetchUser,
    setWebId,
    fetchContacts,
} from './actions/UserActions';
import PrivateRoute from './functional_components/PrivateRoute';
import styles from './App.module.css';
import NotificationsPage from './stateful_components/NotificationsPage';
import LandingPage from './stateful_components/LandingPage';

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
        const { isProfileExpanded } = this.state;
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
                        {webId && user ? (
                            <ProfileSideBar
                                user={user}
                                toggleSidebar={this.toggleSidebar}
                                isExpanded={isProfileExpanded}
                                onProfileUpdate={this.onProfileUpdate}
                                onPictureChange={(e) => {
                                    const user = new User(webId);
                                    user.setProfilePicture(
                                        e,
                                        webId,
                                        user.picture
                                    ).then(() => {
                                        user.getProfile().then((profile) => {
                                            console.log(
                                                'Loading updated Profile'
                                            );
                                            this.setState({
                                                user: profile,
                                            });
                                        });
                                    });
                                }}
                            />
                        ) : null}
                        <div className={styles.mainArea}>
                            <Switch>
                                <Route path="/" exact component={LandingPage} />
                                <PrivateRoute
                                    session={session}
                                    path="/home"
                                    component={<Drive webId={webId} />}
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
                                    path="/contacts"
                                    component={<ContactSidebar webId={webId} />}
                                />
                                <Route
                                    session={session}
                                    path="/login"
                                    component={() => <LoginScreen webId={webId} />}
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
        webId: state.app.webId,
        user: state.app.user,
        session: state.app.session,
        loadLogin: state.app.loadLogin,
        loadUser: state.app.loadUser,
        session: state.app.session,
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
            fetchContacts,
        }
    )(App)
);
