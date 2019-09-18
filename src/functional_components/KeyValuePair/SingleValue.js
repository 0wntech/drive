import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './KeyValuePair.module.css';

const SingleValue = ({ value, editable, placeholder, setValue, className }) => {
    const [fallbackValue] = useState(value);

    const onFocusIn = (e) => {
        // make Placeholder visible
        if (editable) {
            setValue('');
        }
    };

    const onFocusOut = () => {
        // restore default if no change is made
        if (value == '' && editable) {
            setValue(fallbackValue);
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
};

export default SingleValue;
