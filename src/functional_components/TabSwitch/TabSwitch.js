import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './TabSwitch.module.scss';

export const TabSwitch = ({ options, className }) => {
    const [selectedOption, setSelectedOption] = useState(0);
    return (
        <div className={classNames(styles.tabSwitch, className)}>
            <div className={styles.tabOptionContainer}>
                {options.map(({ name }, index) => (
                    <div
                        className={classNames(styles.tabOption, {
                            [styles.selectedTab]: selectedOption === index,
                        })}
                        onClick={() => setSelectedOption(index)}
                    >
                        {name}
                    </div>
                ))}
            </div>
            <div className={styles.tabChildrenContainer}>
                {options.map(({ children }, index) => (
                    <div
                        className={classNames(styles.tabChildren, {
                            [styles.selectedTabChildren]:
                                selectedOption === index,
                        })}
                    >
                        {children}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabSwitch;
