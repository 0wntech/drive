import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ClassicSpinner } from 'react-spinners-kit';
import Navigation from './functional_components/Navigation';
import { ErrorBoundary } from './ErrorBoundary';
import { login, fetchUser, setWebId, logout } from './actions/userActions';
import styles from './App.module.scss';
import { deepFetchCurrentItem } from './actions/appActions';
import { getRootFromWebId } from './utils/url';
const LoginScreen = lazy(() => import('./functional_components/LoginScreen'));
const Drive = lazy(() => import('./functional_components/Drive'));
const PrivateRoute = lazy(() => import('./functional_components/PrivateRoute'));
const LandingPage = lazy(() => import('./functional_components/LandingPage'));
const ProfilePage = lazy(() => import('./functional_components/ProfilePage'));
const ContactsPage = lazy(() => import('./functional_components/ContactsPage'));
const ContactProfilePage = lazy(() =>
    import('./functional_components/ContactProfilePage')
);
const AppOverviewPage = lazy(() =>
    import('./functional_components/AppOverviewPage')
);
const FileView = lazy(() => import('./functional_components/FileView'));
const SettingsPage = lazy(() => import('./functional_components/SettingsPage'));

export const App = ({
    login,
    webId,
    user,
    session,
    loadLogin,
    loadUser,
    logout,
    deepFetchCurrentItem,
}) => {
    const [errorKey, setError] = useState(0);
    useEffect(() => {
        if (!session) {
            login();
        } else {
            deepFetchCurrentItem(getRootFromWebId(session.webId));
        }
    }, [session]);

    const resetError = () => {
        setError(errorKey + 1);
    };

    const suspenseView = (
        <div className={styles.spinner}>
            <ClassicSpinner
                size={30}
                color="#686769"
                loading={loadLogin || loadUser}
            />
        </div>
    );

    if (loadLogin || loadUser) {
        return suspenseView;
    } else {
        return (
            <div className={styles.grid}>
                <div className={styles.navArea}>
                    <Navigation
                        resetError={resetError}
                        onLogout={logout}
                        onLogin={login}
                        webId={webId}
                        picture={user ? user.picture : undefined}
                        username={user ? user.name : undefined}
                    />
                </div>
                <div className={styles.mainArea}>
                    <ErrorBoundary key={errorKey}>
                        <Suspense fallback={suspenseView}>
                            <Switch>
                                <Route path="/" exact component={LandingPage} />
                                <PrivateRoute
                                    session={session}
                                    path="/home"
                                    component={<Drive />}
                                />
                                <PrivateRoute
                                    session={session}
                                    path="/settings"
                                    component={<SettingsPage />}
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
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </div>
        );
    }
};

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
        logout,
        login,
        fetchUser,
        setWebId,
        deepFetchCurrentItem,
    })(App)
);
