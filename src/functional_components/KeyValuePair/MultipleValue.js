import React from 'react';
import PropTypes from 'prop-types';

import X from '../../assets/svgIcons/X';
import SingleValue from './SingleValue';
import styles from './KeyValuePair.module.css';

const MultipleValue = ({
    dataKey,
    values,
    editable,
    setValue,
    placeholder,
}) => {
    return (
        <div className={styles.multiValueContainer}>
            {values.map((value, index) => (
                <div className={styles.valueWrapper}>
                    <SingleValue
                        dataKey={dataKey}
                        value={value}
                        editable={editable}
                        setValue={(value) => {
                            const valueCopy = [...values];
                            valueCopy[index] = value;
                            setValue(dataKey, valueCopy);
                        }}
                        placeholder={placeholder}
                    />
                    <X
                        className={styles.deleteIcon}
                        onClick={() => {
                            const valueCopy = [...values];
                            valueCopy.splice(index, 1);
                            setValue(dataKey, valueCopy);
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

MultipleValue.propTypes = {
    dataKey: PropTypes.string,
    values: PropTypes.array,
    editable: PropTypes.bool,
    setValue: PropTypes.func,
    placeholder: PropTypes.string,
};

export default MultipleValue;