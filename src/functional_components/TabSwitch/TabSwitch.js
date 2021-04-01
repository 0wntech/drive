import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './TabSwitch.module.scss';

export const TabSwitch = ({ options, className }) => {
    const [selectedOption, setSelectedOption] = useState(
        options.findIndex((option) => !!option.children)
    );
    return (
        <div className={classNames(styles.tabSwitch, className)}>
            <div className={styles.tabOptionContainer}>
                {options.map(
                    ({ name, children }, index) =>
                        children && (
                            <div
                                key={index}
                                className={classNames(styles.tabOption, {
                                    [styles.selectedTab]:
                                        selectedOption === index,
                                })}
                                data-test-id={`tab-${name}`}
                                onClick={() => setSelectedOption(index)}
                            >
                                {name}
                            </div>
                        )
                )}
            </div>
            <div className={styles.tabChildrenContainer}>
                {options.map(
                    ({ children }, index) =>
                        children && (
                            <div
                                key={index}
                                className={classNames(styles.tabChildren, {
                                    [styles.selectedTabChildren]:
                                        selectedOption === index,
                                })}
                            >
                                {children}
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default TabSwitch;
