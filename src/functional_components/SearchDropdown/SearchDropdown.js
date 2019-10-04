import React from 'react';
import styles from './SearchDropdown.module.css';
import classNames from 'classnames';
import Select, { components } from 'react-select';
import Search from '../../assets/svgIcons/Search';
export default function SearchDropdown({
    items,
    formatOptionLabel,
    className,
    onChange,
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

    return (
        <div className={classNames(styles.container, className)}>
            <Select
                components={{ DropdownIndicator }}
                styles={customStyles}
                defaultValue={items[0]}
                formatOptionLabel={formatOptionLabel}
                options={items}
                onChange={onChange}
                className={className}
            />
        </div>
    );
}

const customStyles = {
    input: (provided) => ({
        ...provided,
        fontSize: '22px',
    }),
    placeholder: (provided) => ({
        ...provided,
        fontSize: '22px',
    }),
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
        borderRadius: '0 0 20px 20px',
        overflow: 'hidden',
        marginTop: 0,
        marginBottom: 0,
        zIndex: 1,
        boxShadow: '0 7px 6px 0 rgba(0, 0, 0, 0.25)',
        top: 'calc(100% - 3px)',
    }),
    menuList: (provided) => ({
        ...provided,
        paddingTop: '0px',
        paddinBottom: '0px',
    }),
    indicatorSeparator: (provided) => ({
        display: 'none',
    }),
    control: (provided, state) => ({
        // none of react-select's styles are passed to <Control />
        width: '100%',
        height: '100%',

        backgroundColor: state.isFocused ? '#ffffff' : '#F8F8F8',
        borderRadius: state.isFocused ? '20px 20px 0 0' : '20px',
        boxShadow: state.isFocused ? '0px 4px 6px rgba(0, 0, 0, 0.25)' : 'none',
        borderWidth: 0,
        display: 'flex',
        flexDirection: 'row-reverse',
        cursor: state.isFocused ? 'initial' : 'pointer',
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    },
};
