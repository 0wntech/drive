import React from 'react';
import PropTypes from 'prop-types';
import AppCard from '../AppCard';
import styles from './AppList.module.css';
import classNames from 'classnames';

const AppList = ({ apps, className, removeApp }) => {
    return (
        <div className={classNames(styles.container, className)}>
            {apps
                ? apps.map((app, index) => (
                      <AppCard
                          key={app.title + index}
                          iconSrc={app.icon || `${app.url}/favicon.ico`}
                          title={app.title}
                          url={app.url}
                          y
                          onClick={() => console.log('Implement on Click')}
                          removeApp={removeApp}
                      />
                  ))
                : null}
        </div>
    );
};

AppList.propTypes = {
    removeApp: PropTypes.func,
    className: PropTypes.string,
    apps: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string,
            url: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
            settings: PropTypes.string,
            contents: PropTypes.array,
            permissions: PropTypes.object,
        })
    ),
};

export default AppList;
