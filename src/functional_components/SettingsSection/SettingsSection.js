import React from 'react';
import PropTypes from 'prop-types';
import styles from './SettingsSection.module.css';
import ActionButton from '../ActionButton/ActionButton';

export const SettingsSection = ({ label, options }) => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.label}>{label}</div>
            </div>
            {options.map((button, index) => {
                return (
                    <div className={styles.buttonContainer} key={index}>
                        <div className={styles.buttonDescription}>
                            {button.description}
                        </div>
                        <ActionButton
                            label={button.label}
                            onClick={button.onClick}
                            color={button.color}
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
            description: PropTypes.string,
            label: PropTypes.string,
            onClick: PropTypes.func,
            color: PropTypes.oneOf(['red', 'green', 'blue', 'white']),
        })
    ),
};

export default SettingsSection;
