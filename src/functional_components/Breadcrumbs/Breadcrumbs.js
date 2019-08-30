import React from 'react';
import styles from './Breadcrumbs.module.css';
import BreadcrumbItem from '../BreadcrumbItem/BreadcrumbItem';

const Breadcrumbs = (props) => {
    console.log(props.breadcrumbs);
    const root = 'https://' + props.webId.split('/')[2];
    let currentUrl = root;
    const breadcrumbMarkup = props.breadcrumbs
        ? props.breadcrumbs.map((currentBreadcrumb, currentIndex) => {
              if (currentBreadcrumb !== '/') {
                  currentUrl = currentUrl + currentBreadcrumb;
                  const currentLabel = currentBreadcrumb.replace('/', '');
                  return (
                      <BreadcrumbItem
                          key={currentIndex}
                          label={currentLabel}
                          onClick={() => {
                              console.log('currentURRRRRL', currentUrl);
                              props.onClick(currentUrl);
                          }}
                      >
                          {console.log(
                              'current breadcrumb',
                              currentUrl,
                              currentBreadcrumb
                          )}
                          {currentBreadcrumb.replace('/', '')}
                      </BreadcrumbItem>
                  );
              } else {
                  return (
                      <BreadcrumbItem
                          key={0}
                          label={'Home'}
                          onClick={() => props.onClick(root + '/')}
                      ></BreadcrumbItem>
                  );
              }
          })
        : undefined;

    return <div className={styles.container}>{breadcrumbMarkup}</div>;
};

export default Breadcrumbs;
