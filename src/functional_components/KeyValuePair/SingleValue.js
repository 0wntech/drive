import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './KeyValuePair.module.css';

const SingleValue = ({
    dataKey,
    value,
    editable,
    placeholder,
    setValue,
    className,
}) => {
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
            data-test-id={`${dataKey}-input`}
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
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func,
    editable: PropTypes.bool,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    dataKey: PropTypes.string,
};

export default SingleValue;
