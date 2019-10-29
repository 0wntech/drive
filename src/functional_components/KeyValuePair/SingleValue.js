import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './KeyValuePair.module.css';

const SingleValue = ({ value, editable, placeholder, setValue, className }) => {
    const [fallbackValue, setFallbackValue] = useState(value);

    const onFocusIn = (e) => {
        // make Placeholder visible
        if (editable) {
            setValue('');
        }
    };

    const onFocusOut = (e) => {
        // restore default if no change is made
        if (value === '' && editable) {
            setValue(fallbackValue);
        }
        // set new fallback value
        if (value !== '') {
            setFallbackValue(e.target.value);
        }
    };

    return (
        <input
            readOnly={!editable}
            className={classNames(styles.value, className, {
                [styles.active]: editable,
            })}
            value={value}
            placeholder={fallbackValue ? fallbackValue : placeholder}
            onFocus={onFocusIn}
            onBlur={onFocusOut}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

SingleValue.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string.isRequired,
    editable: PropTypes.bool,
    dataKey: PropTypes.string,
    className: PropTypes.string,
};

export default SingleValue;
