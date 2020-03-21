import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import SvgDropdown from '../../assets/svgIcons/Dropdown';
import styles from './DropdownMenu.module.css';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';

function DropdownMenu({
    menuHead,
    options,
    renderOption,
    isExpanded,
    setExpanded,
}) {
    const dropdownWrapper = useRef(null);
    const headArea = useRef(null);
    useEffect(() => {
        if (dropdownWrapper.current && headArea.current) {
            headArea.current.style.height = `${dropdownWrapper.current.clientHeight}px`;
        }
    }, []);
    useClickOutside(dropdownWrapper, () => {
        setExpanded(false);
    });

    const defaultRender = (option) => {
        return (
            <div
                key={option.label}
                onClick={() => {
                    option.onClick();
                    setExpanded(!isExpanded);
                }}
                className={styles.option}
            >
                {option.label}
            </div>
        );
    };

    return (
        <div ref={dropdownWrapper} className={styles.dropdownWrapper}>
            <div
                className={classNames(styles.container, {
                    [styles.active]: isExpanded,
                })}
            >
                <div
                    onClick={() => setExpanded(!isExpanded)}
                    className={styles.head}
                    ref={headArea}
                >
                    {menuHead}
                    <div className={styles.iconWrapper}>
                        <SvgDropdown
                            className={styles.icon}
                            onClick={() => setExpanded(!isExpanded)}
                        />
                    </div>
                </div>
                <div
                    className={classNames(styles.dropdownContent, {
                        [styles.hide]: !isExpanded,
                    })}
                >
                    {renderOption
                        ? options.map((option, index) => (
                              <div key={index} className={styles.option}>
                                  {renderOption(option)}
                              </div>
                          ))
                        : options.map((option) => defaultRender(option))}
                </div>
            </div>
        </div>
    );
}

DropdownMenu.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
        })
    ),
    renderOption: PropTypes.func,
};

export default DropdownMenu;
