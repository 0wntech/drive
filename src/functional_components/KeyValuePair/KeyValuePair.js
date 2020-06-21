import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'react-collapse';

import styles from './KeyValuePair.module.scss';
import classNames from 'classnames';
import MultipleValue from './MultipleValue';
import SingleValue from './SingleValue';

const showAddButton = (value, editable) => {
    // multiple values possible (array) and at least one is already filled
    return typeof value === 'object' && editable;
};

const KeyValuePair = ({
    dataKey,
    editable,
    label,
    placeholder,
    setValue,
    value,
    maxInput,
}) => {
    console.log(value);
    const renderValues = (value) => {
        if (typeof value === 'object') {
            // is an array
            return (
                <MultipleValue
                    dataKey={dataKey}
                    values={value}
                    editable={editable}
                    setValue={setValue}
                    placeholder={placeholder}
                />
            );
        } else {
            // is a single value
            return (
                <SingleValue
                    setValue={(value) => setValue(dataKey, value)}
                    dataKey={dataKey}
                    value={value}
                    placeholder={placeholder}
                    editable={editable}
                    maxInput={maxInput}
                />
            );
        }
    };

    return value || editable ? (
        <div className={styles.container}>
            <div className={styles.keyValueContainer}>
                <div className={styles.keyLabel}>{label}</div>
                <div className={styles.valueContainer}>
                    {renderValues(value)}
                </div>
            </div>

            <Collapse isOpened={showAddButton(value, editable)}>
                <div
                    className={classNames(
                        styles.containerFooter,
                        styles.addLabel,
                        { [styles.active]: editable }
                    )}
                    onClick={() => setValue(dataKey, [...value, ''])}
                >
                    + Add
                </div>
            </Collapse>
        </div>
    ) : null;
};

KeyValuePair.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    dataKey: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    setValue: PropTypes.func,
    editable: PropTypes.bool,
};

export default KeyValuePair;
