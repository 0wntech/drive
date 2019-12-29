import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './AppOverviewPage.module.css';
import AppList from '../AppList';
import { fetchApps } from '../../actions/userAppActions';
import { Layout } from '../Layout';
import icon from '../../assets/icons/owntech.png';

const fakeApps = (apps) => {
    if (!apps) return [];
    return apps.map((url) => {
        return {
            url,
            title: url,
            description: url,
            settings: url,
            icon: icon,
            description: url,
            contents: [],
            permissions: {},
        };
    });
};

const AppOverviewPage = ({ apps, fetchApps, webId }) => {
    useEffect(() => {
        fetchApps(webId);
    }, []);

    return (
        <Layout label="App Overview" className={styles.grid}>
            <AppList className={styles.appList} apps={fakeApps(apps)} />
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
    webId: state.user.webId,
});

export default connect(mapStateToProps, { fetchApps })(AppOverviewPage);
