import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './KeyValuePair.module.scss';

const SingleValue = ({
    dataKey,
    value,
    editable,
    placeholder,
    setValue,
    className,
    maxInput,
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
    if (!value || value === '') {
        return null;
    } else if (!editable) {
        return (
            <div className={classNames(styles.value, className)}>{value}</div>
        );
    }

    return maxInput ? (
        <TextareaAutosize
            readOnly={!editable}
            data-test-id={`${dataKey}-input`}
            className={classNames(styles.value, className, {
                [styles.active]: editable,
            })}
            value={value}
            placeholder={fallbackValue ? fallbackValue : placeholder}
            onBlur={onFocusOut}
            onChange={(e) => {
                if (e.target.value.length < 256) setValue(e.target.value);
            }}
            maxLength={256}
        />
    ) : (
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
