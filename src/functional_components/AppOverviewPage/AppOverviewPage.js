import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppList } from '../AppList';
import { connect } from 'react-redux';
import { fetchApps } from '../../actions/UserActions';

const AppOverviewPage = ({ apps, fetchApps }) => {
    useEffect(() => {
        fetchApps();
    }, []);

    return (
        <div>
            <AppList apps={apps} />
        </div>
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
