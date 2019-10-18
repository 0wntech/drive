import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './AppOverviewPage.module.css';
import { AppList } from '../AppList';
import { fetchApps } from '../../actions/UserActions';
import { Layout } from '../Layout';

const AppOverviewPage = ({ apps, fetchApps }) => {
    useEffect(() => {
        fetchApps();
    }, []);

    return (
        <Layout label="App Overview" className={styles.grid}>
            <AppList className={styles.appList} apps={apps} />
        </Layout>
    );
};

AppOverviewPage.propTypes = {
    apps: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
            settings: PropTypes.string,
            contents: PropTypes.string,
            permissions: PropTypes.object,
        })
    ),
};

const mapStateToProps = (state) => ({
    apps: state.app.apps,
});

export default connect(
    mapStateToProps,
    { fetchApps }
)(AppOverviewPage);
