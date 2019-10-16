import React from 'react';
import PropTypes from 'prop-types';
import AppListItem from '../AppListItem';

const AppList = ({ apps }) => {
    return (
        <div>
            {apps
                ? apps.map((app, index) => (
                      <AppListItem iconSrc={app.logo} name={app.title} />
                  ))
                : null}
        </div>
    );
};

AppList.propTypes = {
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

export default AppList;
