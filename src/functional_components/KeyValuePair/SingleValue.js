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
        if (value == '' && editable) {
            setValue(fallbackValue);
        }
        if (value != '') {
            console.log('target value', e.target.value);
            setFallbackValue(e.target.value);
        }
    };

    return (
        <input
            readOnly={!editable}
            className={classNames(className, styles.value, {
                [styles.active]: editable,
            })}
            value={value}
            placeholder={
                placeholder ? placeholder : value ? value : 'enter value'
            }
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
