import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './SettingsSection.module.scss';
import ActionButton from '../ActionButton/ActionButton';

export const SettingsSection = ({ label, options }) => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.label}>{label}</div>
            </div>
            {options.map((option, index) => {
                if (option.initialValue && option.onSubmit) {
                    return (
                        <div
                            className={classNames(
                                styles.optionContainer,
                                styles.inputContainer
                            )}
                        >
                            <div className={styles.optionDescription}>
                                {option.description}
                            </div>
                            <input
                                className={styles.input}
                                defaultValue={option.initialValue}
                                onBlur={({ target }) =>
                                    option.onSubmit(target.value)
                                }
                            />
                        </div>
                    );
                }
                return (
                    <div className={styles.optionContainer} key={index}>
                        <div className={styles.optionDescription}>
                            {option.description}
                        </div>
                        <ActionButton
                            label={option.label}
                            onClick={option.onClick}
                            color={option.color}
                            type={option.type}
                        />
                    </div>
                );
            })}
        </>
    );
};

SettingsSection.propTypes = {
    label: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            initialValue: PropTypes.string,
            description: PropTypes.string,
            label: PropTypes.string,
            onClick: PropTypes.func,
            onSubmit: PropTypes.func,
            color: PropTypes.oneOf(['red', 'green', 'blue', 'white']),
            type: PropTypes.oneOf(['primary', 'secondary']),
        })
    ),
};

export default SettingsSection;
