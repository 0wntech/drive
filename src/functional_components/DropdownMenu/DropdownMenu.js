import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SvgDropdown from '../../assets/svgIcons/Dropdown';
import styles from './DropdownMenu.module.css';
import classNames from 'classnames';
import useHeight from '../../hooks/useHeight';

function DropdownMenu({ options, renderOption, isExpanded, setExpanded }) {
    const [ref, height] = useHeight();
    console.log('height', height);
    const defaultRender = (option) => {
        return (
            <div onClick={option.onClick} className={styles.option}>
                {console.log(option.label)}
                {option.label}
            </div>
        );
    };

    return (
        <Fragment>
            <SvgDropdown
                className={styles.icon}
                onClick={() => setExpanded(!isExpanded)}
            />
            <div
                className={classNames(styles.dropdownContent, {
                    [styles.hide]: !isExpanded,
                })}
                ref={ref}
                style={{ bottom: -height }}
            >
                {renderOption
                    ? options.map((option) => (
                          <div className={styles.option}>
                              {renderOption(option)}
                          </div>
                      ))
                    : options.map((option) => defaultRender(option))}
            </div>
        </Fragment>
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
