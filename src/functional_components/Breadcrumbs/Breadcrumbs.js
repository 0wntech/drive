import React from 'react';
import url from 'url';
import styles from './Breadcrumbs.module.css';
import BreadcrumbItem from '../BreadcrumbItem/BreadcrumbItem';
import PropTypes from 'prop-types';
const Breadcrumbs = ({ currentPath, breadcrumbs, onClick, rootUrl, webId }) => {
    const { protocol, host } = url.parse(currentPath);
    const root = rootUrl ?? url.format({ protocol, host }) + '/';
    const breadcrumbMarkup = breadcrumbs
        ? breadcrumbs.map((currentBreadcrumb, currentIndex) => {
              if (currentIndex !== 0) {
                  // breadcrumb in the middle
                  let currentUrl = root;
                  for (let i = 0; i < currentIndex; i++) {
                      currentUrl = url.resolve(
                          currentUrl,
                          breadcrumbs[i + 1].replace('/', '') + '/'
                      );
                  }
                  const currentLabel = currentBreadcrumb.replace('/', '');
                  if (currentIndex + 1 === breadcrumbs.length) {
                      return (
                          <BreadcrumbItem
                              key={currentIndex}
                              label={currentLabel}
                              onClick={() => {
                                  onClick(currentUrl);
                              }}
                          />
                      );
                  } else {
                      return (
                          <BreadcrumbItem
                              seperator
                              key={currentIndex}
                              label={currentLabel}
                              onClick={() => {
                                  onClick(currentUrl);
                              }}
                          />
                      );
                  }
              } else {
                  // first breadcrumb
                  return (
                      <BreadcrumbItem
                          seperator
                          key={0}
                          label={
                              url.parse(webId).host ===
                              url.parse(currentPath).host
                                  ? 'Home'
                                  : url.parse(currentPath).host
                          }
                          onClick={() => onClick(root)}
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
