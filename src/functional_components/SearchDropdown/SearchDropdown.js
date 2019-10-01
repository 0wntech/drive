import React from 'react';
import styles from './SearchDropdown.module.css';
import classNames from 'classnames';
import Select, { components } from 'react-select';
import Search from '../../assets/svgIcons/Search';
export default function SearchDropdown({
    items,
    formatOptionLabel,
    className,
}) {
    const DropdownIndicator = (props) => {
        return (
            components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                    <Search />
                </components.DropdownIndicator>
            )
        );
    };

    const Control = (props) => {
        return (
            components.Control && (
                <components.Control {...props}></components.Control>
            )
        );
    };

    const customStyles = {
        container: (provided) => ({
            ...provided,
            display: 'flex',
            height: '80%',
            width: '100%    ',
        }),
        option: (provided, state) => ({
            ...provided,
        }),
        menu: (provided) => ({
            // none of react-select's styles are passed to <Control />
            ...provided,
            borderRadius: '20px',
            overflow: 'hidden',
            marginTop: 0,
            marginBottom: 0,
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)',
        }),
        menuList: (provided) => ({
            ...provided,
            paddingTop: '0px',
            paddinBottom: '0px',
        }),
        indicatorSeparator: (provided) => ({
            display: 'none',
        }),
        control: (provided) => ({
            // none of react-select's styles are passed to <Control />
            width: '100%',
            height: '100%',

            backgroundColor: '#F8F8F8',
            borderRadius: '20px',
            borderWidth: 0,
            display: 'flex',
            flexDirection: 'row-reverse',
        }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return { ...provided, opacity, transition };
        },
    };

    return (
        <div className={classNames(styles.container, className)}>
            <Select
                components={{ DropdownIndicator, Control }}
                styles={customStyles}
                defaultValue={items[0]}
                formatOptionLabel={formatOptionLabel}
                options={items}
                className={className}
            />
        </div>
    );
}
