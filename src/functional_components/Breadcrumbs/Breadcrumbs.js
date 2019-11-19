import React from 'react';
import styles from './Breadcrumbs.module.css';
import BreadcrumbItem from '../BreadcrumbItem/BreadcrumbItem';
import PropTypes from 'prop-types';
const Breadcrumbs = ({ webId, breadcrumbs, onClick }) => {
    const root = 'https://' + webId.split('/')[2];
    const breadcrumbMarkup = breadcrumbs
        ? breadcrumbs.map((currentBreadcrumb, currentIndex) => {
              if (currentIndex !== 0) {
                  let currentUrl = root;
                  for (let i = 0; i < currentIndex; i++) {
                      currentUrl += breadcrumbs[i + 1];
                  }
                  const currentLabel = currentBreadcrumb.replace('/', '');
                  return (
                      <BreadcrumbItem
                          key={currentIndex}
                          label={currentLabel}
                          onClick={() => {
                              onClick(currentUrl + '/');
                          }}
                      >
                          {currentBreadcrumb.replace('/', '')}
                      </BreadcrumbItem>
                  );
              } else {
                  return (
                      <BreadcrumbItem
                          key={0}
                          label={'Home'}
                          onClick={() => onClick(root + '/')}
                      ></BreadcrumbItem>
                  );
              }
          })
        : undefined;

    return <div className={styles.container}>{breadcrumbMarkup}</div>;
};

Breadcrumbs.propTypes = {
    webId: PropTypes.string.isRequired,
    breadcrumbs: PropTypes.array,
    onClick: PropTypes.func,
};

export default Breadcrumbs;
