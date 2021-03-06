import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './AppOverviewPage.module.scss';
import AppList from '../AppList';
import { fetchApps, removeApp } from '../../actions/userAppActions';
import { Layout } from '../Layout';
import { Window } from '../Window';
import url from 'url';
import ActionButton from '../ActionButton/ActionButton';
import { logout } from '../../actions/userActions';
import { handleError } from '../../utils/helper';

// remove me if user library functions return all the parameter
const fakeApps = (apps) => {
    if (!apps) return [];
    return apps.map((url) => {
        return {
            url,
            title: url,
            description: url,
            settings: url,
            icon: undefined,
            contents: [],
            permissions: {},
        };
    });
};

const isDriveApp = (apptoDelete) => {
    return window.location.host === url.parse(apptoDelete).host;
};

const AppOverviewPage = ({
    apps,
    fetchApps,
    webId,
    removeApp,
    loadApps,
    error,
}) => {
    useEffect(() => {
        fetchApps(webId);
    }, [fetchApps, webId]);
    handleError(error);

    const [dangerWindow, setDangerWindow] = useState(false);
    const [apptoDelete, setAppToDelete] = useState('');

    const openConsentWindow = (url) => {
        setAppToDelete(url);
        setDangerWindow(true);
    };

    return (
        <Layout label="Apps" className={styles.grid} isLoading={loadApps}>
            <Window
                visible={dangerWindow}
                onClose={() => setDangerWindow(false)}
                windowName={apptoDelete}
            >
                <div>
                    <p>
                        Are you sure that you want revoke access for this app?
                    </p>
                    {isDriveApp(apptoDelete) ? (
                        <p className={styles.dangerText}>
                            Warning: If you delete this app you will be
                            automatically logged out.
                        </p>
                    ) : null}
                </div>

                <div className={styles.windowButtonContainer}>
                    <ActionButton
                        type="secondary"
                        label="Cancel"
                        onClick={() => setDangerWindow(false)}
                    />
                    <ActionButton
                        className={styles.button}
                        type="danger"
                        label="Revoke Access"
                        onClick={() => {
                            removeApp(apptoDelete, isDriveApp(apptoDelete));
                            setDangerWindow(false);
                        }}
                    />
                </div>
            </Window>

            <AppList
                className={styles.appList}
                apps={fakeApps(apps)}
                removeApp={openConsentWindow}
            />
        </Layout>
    );
};

AppOverviewPage.propTypes = {
    apps: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string,
            title: PropTypes.string,
            icon: PropTypes.string,
            description: PropTypes.string,
            settings: PropTypes.string,
            contents: PropTypes.array,
            permissions: PropTypes.object,
        })
    ),
};

const mapStateToProps = (state) => ({
    apps: state.userApps.apps,
    error: state.userApps.error,
    loadApps: state.userApps.loadApps,
    webId: state.user.webId,
});

export default connect(mapStateToProps, { fetchApps, removeApp, logout })(
    AppOverviewPage
);
