import React from 'react';

import styles from './InfoListItem.module.scss';

export const InfoListItem = ({ item }) => {
    return <div className={styles.container}>{item}</div>;
};
