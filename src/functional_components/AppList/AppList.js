import React from 'react';
import PropTypes from 'prop-types';
import { AppListItem } from '../AppListItem';
import styles from './AppList.module.css';
import classNames from 'classnames';

const AppList = ({ apps, className }) => {
    return (
        <div className={classNames(styles.container, className)}>
            {apps
                ? apps.map((app, index) => (
                      <AppListItem
                          key={app.title + index}
                          iconSrc={app.icon}
                          title={app.title}
                          url={app.url}
                          onClick={() => console.log('Implement on Click')}
                      />
                  ))
                : null}
        </div>
    );
};

AppList.propTypes = {
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
