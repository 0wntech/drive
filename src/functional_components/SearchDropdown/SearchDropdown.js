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
    toggleSearchbar,
    isSearchBarExpanded,
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

    const handleMenuOpen = () => {
        // conditional because menu triggers this event at every key input
        // --> prevent unneccessary state updates
        if (!isSearchBarExpanded) {
            toggleSearchbar();
        }
    };

    const select = (
        <Select
            components={{ DropdownIndicator }}
            placeholder={placeholder}
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}
            options={loading ? [] : items}
            onChange={onChange}
            className={className}
            classNamePrefix="search"
            value={null}
            menuIsOpen={isSearchBarExpanded}
            onInputChange={onInputChange}
            filterOption={filterOption}
            openMenuOnClick={true}
            onMenuOpen={handleMenuOpen}
            noOptionsMessage={() =>
                loading ? 'Loading results...' : 'No search results'
            }
        />
    );

    return (
        <div className={classNames(styles.container, className)}>{select}</div>
    );
}

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        padding:
            state.data.type === 'separator'
                ? '8px 12px 3px 0'
                : '8px 12px 8px 0',
        height: state.data.type === 'separator' ? 25 : 64,
        display:
            state.data.type === 'separator' && state.data.loading
                ? 'none'
                : 'flex',
        alignItems: state.data.type === 'separator' ? 'flex-end' : 'center',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        left: state.selectProps.menuIsOpen ? '0' : 'unset',
        top: state.selectProps.menuIsOpen ? '50%' : 'unset',
        transform: state.selectProps.menuIsOpen
            ? 'translate(0, -50%)'
            : 'unset',

        position: state.selectProps.menuIsOpen ? 'absolute' : 'unset',
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        marginRight: state.selectProps.menuIsOpen ? '0' : '-48px',
        marginLeft: state.selectProps.menuIsOpen ? '64px' : '0',
    }),
    menu: (provided) => ({ ...provided, boxShadow: 'initial' }),
    control: (provided, state) => {
        return {
            width: '100%',
            height: '100%',
            backgroundColor: state.menuIsOpen ? '#ffffff' : '#F8F8F8',
            borderRadius: state.menuIsOpen ? '20px 20px 0 0' : '20px',
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
