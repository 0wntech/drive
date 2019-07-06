import React from 'react';
import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {ClassicSpinner} from 'react-spinners-kit';
import Navigation from './functional_components/Navigation';
import Container from 'react-bootstrap/Container';
import Drive from './stateful_components/Drive';
import LoginScreen from './stateful_components/LoginScreen';
import {ProfileSideBar} from './functional_components/ProfileSideBar';
import auth from 'solid-auth-client';
import User from 'your-user';
import {ErrorBoundary} from './stateful_components/ErrorBoundary';
import {ContactScreen} from './functional_components/ContactScreen';
import {
    login,
    fetchUser,
    setWebId,
    fetchFolderTree,
} from './actions/UserActions';
import PrivateRoute from './functional_components/PrivateRoute';
import styles from './App.module.css';
import NotificationsPage from './stateful_components/NotificationsPage';
import {getCurrentDirectory} from './utils/url';

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
            await auth.login('https://solid.community');
        } else {
            this.setState({
                webId: session.webId,
            });
        }
    }

    logout() {
        auth.logout().then(() => {
            this.setState({
                webId: undefined,
            });
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
        const {login, session} = this.props;
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
        const {isProfileExpanded} = this.state;
        const {
            webId,
            user,
            session,
            loadLogin,
            loadUser,
            loadFolderTree,
            currentFolderTree,
            currentPath,
        } = this.props;
        if (currentFolderTree) {
            getCurrentDirectory(currentFolderTree, currentPath);
        }
        if (loadLogin || loadUser || loadFolderTree) {
            return (
                <div className={styles.spinner}>
                    <ClassicSpinner
                        size={100}
                        color="#686769"
                        loading={loadLogin || loadUser || loadFolderTree}
                    />
                </div>
            );
        } else {
            return (
                <div style={{height: '100%'}}>
                    <ErrorBoundary>
                        <Navigation
                            toggleSidebar={this.toggleSidebar}
                            onLogout={this.logout}
                            onLogin={this.login}
                            webId={webId}
                            picture={user ? user.picture : undefined}
                        />
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
                        <Switch>
                            <Route path="/" exact component={LoginScreen} />
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
                                component={<ContactScreen webId={webId} />}
                            />
                        </Switch>
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
        loadFolderTree: state.app.loadFolderTree,
        session: state.app.session,
        currentFolderTree: state.app.currentFolderTree,
        currentPath: state.app.currentPath,
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        {login, fetchUser, setWebId, fetchFolderTree}
    )(App)
);
