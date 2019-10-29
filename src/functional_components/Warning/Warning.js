import React from 'react';
import styles from './Warning.module.css';

export const Warning = ({ message }) => {
    return <p className={styles.text}>{message}</p>;
};

export default Warning;
