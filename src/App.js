import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ClassicSpinner } from 'react-spinners-kit';
import Navigation from './functional_components/Navigation';
import { ErrorBoundary } from './ErrorBoundary';
import { login, fetchUser } from './actions/userActions';
import { fetchContactRecommendations } from './actions/contactActions';
import styles from './App.module.scss';
import { indexStorage } from './actions/appActions';
import SearchPage from './functional_components/SearchPage';
import Drive from './functional_components/Drive';
const LoginPage = lazy(() => import('./functional_components/LoginPage'));
const PrivateRoute = lazy(() => import('./functional_components/PrivateRoute'));
const LandingPage = lazy(() => import('./functional_components/LandingPage'));
const ProfilePage = lazy(() => import('./functional_components/ProfilePage'));
const AppOverviewPage = lazy(() =>
    import('./functional_components/AppOverviewPage')
);
const FileView = lazy(() => import('./functional_components/FileView'));
const SettingsPage = lazy(() => import('./functional_components/SettingsPage'));

export const App = ({
    login,
    webId,
    user,
    fileHierarchy,
    session,
    loadLogin,
    loadUser,
    loadContacts,
    indexStorage,
    indexingProgress,
    indexingStorage,
    contactRecommendations,
    loadContactRecommendations,
    fetchContactRecommendations,
}) => {
    const [errorKey, setError] = useState(0);
    useEffect(() => {
        if (!session) {
            login();
        } else if (user && user.storage) {
            indexStorage(user.storage);
            if (
                user.contacts &&
                !contactRecommendations &&
                !loadContactRecommendations
            ) {
                fetchContactRecommendations(webId);
            }
        }
    }, [session, user]);

    const resetError = () => {
        setError(errorKey + 1);
    };

    const loadingMessage = () => {
        if (indexingStorage && indexingProgress) {
            if (indexingProgress === 1) {
                return 'Index not found. Creating Index... ';
            } else {
                return `Updating Index with ${indexingProgress}...`;
            }
        } else if (loadContacts) {
            return 'Loading Contacts...';
        } else if (loadUser) {
            return 'Loading Profile...';
        } else if (loadContactRecommendations) {
            return 'Loading Profiles...';
        } else if (indexingStorage) {
            return 'Loading Index...';
        }
    };

    const suspenseView = (
        <div className={styles.spinner}>
            <ClassicSpinner size={30} color="#686769" />
            <div className={styles.loadingMessage}>{loadingMessage()}</div>
        </div>
    );

    if (
        webId &&
        (loadLogin ||
            (!user && loadUser) ||
            (!fileHierarchy && indexingStorage) ||
            indexingProgress ||
            loadContactRecommendations ||
            (!user?.contacts && loadContacts))
    ) {
        return suspenseView;
    } else {
        return (
            <div className={styles.grid}>
                <Suspense fallback={<></>}>
                    <div className={styles.navArea}>
                        <Navigation
                            resetError={resetError}
                            webId={webId}
                            picture={user ? user.picture : undefined}
                            username={user ? user.name : undefined}
                        />
                    </div>
                    <div className={styles.mainArea}>
                        <ErrorBoundary key={errorKey} resetError={resetError}>
                            <Switch>
                                <Route path="/" exact component={LandingPage} />
                                <PrivateRoute
                                    session={session}
                                    path="/home"
                                    exact
                                    component={<Drive />}
                                />
                                <PrivateRoute
                                    session={session}
                                    path="/home/:path"
                                    component={<Drive />}
                                />
                                <PrivateRoute
                                    session={session}
                                    path="/search"
                                    component={<SearchPage />}
                                />
                                <PrivateRoute
                                    session={session}
                                    path="/apps"
                                    component={<AppOverviewPage />}
                                />
                                <PrivateRoute
                                    session={session}
                                    path="/profile"
                                    exact
                                    component={<ProfilePage />}
                                />
                                <PrivateRoute
                                    session={session}
                                    path="/profile/:id"
                                    component={<ProfilePage />}
                                />
                                <PrivateRoute
                                    session={session}
                                    exact
                                    path="/contact/:id/:path"
                                    component={<Drive />}
                                />
                                <PrivateRoute
                                    session={session}
                                    exact
                                    path="/contact/:id/file/:path"
                                    component={<FileView />}
                                />
                                <PrivateRoute
                                    session={session}
                                    path="/settings"
                                    component={<SettingsPage />}
                                />
                                <PrivateRoute
                                    session={session}
                                    path="/file/:id/:path"
                                    component={<FileView />}
                                />
                                <Route
                                    session={session}
                                    path="/login"
                                    component={() => (
                                        <LoginPage webId={webId} />
                                    )}
                                />
                            </Switch>
                        </ErrorBoundary>
                    </div>
                </Suspense>
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
        loadContacts: state.contact.loadContacts,
        loadContactRecommendations: state.contact.loadContactRecommendations,
        contactRecommendations: state.contact.contactRecommendations,
        currentFolderTree: state.app.currentFolderTree,
        currentPath: state.app.currentPath,
        fileHierarchy: state.app.fileHierarchy,
        indexingStorage: state.app.indexingStorage,
        indexingProgress: state.app.indexingProgress,
    };
};

export default withRouter(
    connect(mapStateToProps, {
        login,
        fetchUser,
        indexStorage,
        fetchContactRecommendations,
    })(App)
);
