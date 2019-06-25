import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './functional_components/Navigation';
import Container from 'react-bootstrap/Container';
import Home from './stateful_components/Home';
import Drive from './stateful_components/Drive';
import LoginScreen from './stateful_components/LoginScreen';
import { ProfileSideBar } from './functional_components/ProfileSideBar';
import auth from 'solid-auth-client';
import User from 'your-user';
import { ErrorBoundary } from './stateful_components/ErrorBoundary';
import { editProfile } from './utils/profileRDF';

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
            this.setState(
                {
                    webId: undefined,
                },
                () => {
                    window.location.href = '/';
                }
            );
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
        auth.trackSession((session) => {
            if (!session) {
                console.log('You are logged out');
            } else {
                console.log('You are logged in, fetching data now');
                const currUser = new User(session.webId);
                currUser.getProfile().then((profile) => {
                    this.setState({
                        webId: session.webId,
                        user: profile,
                    });
                });
            }
        });
    }

    render() {
        const { webId, user, isProfileExpanded } = this.state;
        return (
            <div style={{ height: '100%' }}>
                <ErrorBoundary>
                    <BrowserRouter>
                        <Navigation
                            toggleSidebar={this.toggleSidebar}
                            onLogout={this.logout}
                            onLogin={this.login}
                            webId={webId}
                            picture={user ? user.picture : undefined}
                        />
                        {webId ? (
                            <ProfileSideBar
                                user={user}
                                toggleSidebar={this.toggleSidebar}
                                isExpanded={isProfileExpanded}
                                onProfileUpdate={this.onProfileUpdate}
                                onPictureChange={(e) => {
                                    const user = new User(this.state.webId);
                                    user.setProfilePicture(
                                        e,
                                        this.state.webId,
                                        this.state.user.picture
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
                            <Route
                                path="/"
                                exact
                                component={
                                    user
                                        ? () => (
                                              <Drive webId={this.state.webId} />
                                          )
                                        : LoginScreen
                                }
                            />
                            <Route
                                path="/home"
                                component={
                                    user
                                        ? () => (
                                              <Drive webId={this.state.webId} />
                                          )
                                        : LoginScreen
                                }
                            />
                            <Route
                                path="/chat"
                                component={
                                    this.state.user
                                        ? () => (
                                              <Drive webId={this.state.webId} />
                                          )
                                        : LoginScreen
                                }
                            />
                            <Route
                                path="/drive"
                                component={
                                    this.state.user
                                        ? () => (
                                              <Drive webId={this.state.webId} />
                                          )
                                        : LoginScreen
                                }
                            />
                        </Switch>
                    </BrowserRouter>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;
