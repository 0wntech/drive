import React from 'react';
import styles from './SearchDropdown.module.scss';
import './SearchDropdown.scss';
import classNames from 'classnames';
import Select, { components } from 'react-select';
import { ClassicSpinner } from 'react-spinners-kit';
import Search from '../../assets/svgIcons/Search';
export default function SearchDropdown({
    items,
    formatOptionLabel,
    className,
    onChange,
    placeholder,
    onInputChange,
    filterOption,
    loading,
}) {
    const DropdownIndicator = (props) => {
        return (
            components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                    {loading ? (
                        <ClassicSpinner
                            size={20}
                            color="#686769"
                            loading={loading}
                        />
                    ) : (
                        <Search />
                    )}
                </components.DropdownIndicator>
            )
        );
    };

    return (
        <div className={classNames(styles.container, className)}>
            <Select
                components={{ DropdownIndicator }}
                placeholder={placeholder}
                styles={customStyles}
                formatOptionLabel={formatOptionLabel}
                options={items}
                onChange={onChange}
                className={className}
                classNamePrefix="search"
                value={null}
                onInputChange={onInputChange}
                filterOption={filterOption}
            />
        </div>
    );
}

const customStyles = {
    placeholder: (provided) => ({
        ...provided,
        fontSize: '22px',
        marginLeft: '-9px',
    }),
    container: (provided) => ({
        ...provided,
        display: 'flex',
        height: '80%',
        width: '100%    ',
    }),
    input: (provided) => ({
        ...provided,
        fontSize: '22px',
        marginLeft: '-9px',
    }),
    option: (provided, state) => ({
        ...provided,
        padding:
            state.data.type === 'separator'
                ? '8px 12px 3px 0'
                : '8px 12px 8px 0',
        height: state.data.type === 'separator' ? 25 : 64,
        display: 'flex',
        alignItems: state.data.type === 'separator' ? 'flex-end' : 'center',
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
    indicatorsContainer: (provided) => ({
        ...provided,
        minWidth: 78,
        justifyContent: 'center',
    }),
    control: (provided, state) => {
        return {
            width: '100%',
            height: '100%',
            backgroundColor: state.menuIsOpen ? '#ffffff' : '#F8F8F8',
            borderRadius: state.menuIsOpen ? '20px 20px 0 0' : '20px',
            boxShadow: state.menuIsOpen
                ? '0px 4px 6px rgba(0, 0, 0, 0.25)'
                : 'none',
            borderWidth: 0,
            display: 'flex',
            flexDirection: 'row-reverse',
            cursor: state.isFocused ? 'initial' : 'pointer',
        };
    },
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        return { ...provided, opacity, transition };
    },
};
