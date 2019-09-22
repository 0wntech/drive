import React from 'react';
import PropTypes from 'prop-types';
import styles from './KeyValuePair.module.css';

const KeyValuePair = ({ label, value }) => {
    const renderValues = (value) => {
        if (!value || (typeof 'object' && value.length === 0)) {
            return <div className={styles.value}>... add {label}</div>;
        }
        if (typeof value === 'object') {
            value.map((value) => <div className={styles.value}>{value}</div>);
        } else if (typeof value === 'string') {
            return <div className={styles.value}>{value}</div>;
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.keyLabel}>{label}</div>
            <div className={styles.valueContainer}>{renderValues(value)}</div>
        </div>
    );
};

KeyValuePair.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default KeyValuePair;
