import React, { useRef, useState } from 'react';
import mime from 'mime';
import classNames from 'classnames';
import Select, { components } from 'react-select';
import { connect } from 'react-redux';

import styles from './SearchDropdown.module.scss';
import './SearchDropdown.scss';

import { searchContact } from '../../actions/contactActions';
import useClickOutside from '../../hooks/useClickOutside';

const customFilter = (option, searchText) => {
    const searchedFragments = searchText.split('/');
    const searchedUser = searchedFragments.shift();
    const searchedPath = searchedFragments.join('/');
    if (!option.value) {
        return true;
    }
    if (option.data.type === 'contact') {
        if (
            (option.data.contact.webId &&
                option.data.contact.webId
                    .toLowerCase()
                    .includes(searchText.toLowerCase())) ||
            (option.data.contact.name &&
                option.data.contact.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())) ||
            (option.data.contact.webId &&
                option.data.contact.webId
                    .toLowerCase()
                    .includes(searchedUser.toLowerCase())) ||
            (option.data.contact.name &&
                option.data.contact.name
                    .toLowerCase()
                    .includes(searchedUser.toLowerCase()))
        ) {
            return true;
        }
        return false;
    }
    if (
        option.value.toLowerCase().includes(searchText.toLowerCase()) ||
        (option.data.path.toLowerCase().includes(searchedPath.toLowerCase()) &&
            option.data.path.includes(searchedUser.toLowerCase())) ||
        (option.data.fileType &&
            mime
                .getType(option.data.fileType)
                ?.includes(searchText.toLowerCase()))
    ) {
        return true;
    }
    return false;
};

export function SearchDropdown({
    items,
    className,
    onChange,
    placeholder,
    toggleSearchbar,
    searchContact,
    searchingContacts,
    isSearchBarExpanded,
    classNamePrefix = 'search',
    noIndicator,
    indicator,
    formatOptionLabel,
    webId,
}) {
    const [typingTimer, setTypingTimer] = useState(null);
    const handleInputChange = (searchText) => {
        clearTimeout(typingTimer);
        if (searchText !== '') {
            const searchTextFragments = searchText.toLowerCase().split('/');
            const searchedUser = searchTextFragments.shift();
            const searchedPath = searchTextFragments.join('/');
            setTypingTimer(
                setTimeout(() => {
                    return searchContact(
                        searchedUser,
                        searchedPath !== '' ? searchedPath : '/'
                    );
                }, 1000)
            );
        }
    };

    const dropdownWrapper = useRef(null);
    const [menuRef, setMenuRef] = useState(null);
    useClickOutside(dropdownWrapper, () => {
        if (isSearchBarExpanded) toggleSearchbar();
    });

    const DropdownIndicator = (props) => {
        return (
            !noIndicator &&
            components.DropdownIndicator && (
                <components.DropdownIndicator {...props}>
                    {indicator}
                </components.DropdownIndicator>
            )
        );
    };

    const handleMenuOpen = () => {
        // conditional because menu triggers this event at every key input
        // --> prevent unneccessary state updates
        if (!isSearchBarExpanded) {
            toggleSearchbar();
            menuRef.focus();
        }
    };

    const select = (
        <Select
            isClearable
            components={{ DropdownIndicator }}
            placeholder={placeholder}
            styles={customStyles}
            formatOptionLabel={(option) => formatOptionLabel(option, webId)}
            options={searchingContacts ? items : items}
            onChange={onChange}
            className={className}
            classNamePrefix={classNamePrefix}
            value={null}
            menuIsOpen={isSearchBarExpanded}
            onInputChange={handleInputChange}
            filterOption={customFilter}
            openMenuOnClick={true}
            onMenuOpen={handleMenuOpen}
            ref={(ref) => {
                setMenuRef(ref);
            }}
            noOptionsMessage={() =>
                searchingContacts ? 'Loading results...' : 'No search results'
            }
        />
    );

    return (
        <div
            className={classNames(styles.container, className)}
            ref={dropdownWrapper}
        >
            {select}
        </div>
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
            backgroundColor: '#f4f4f4',
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

const mapStateToProps = (state) => {
    return {
        contacts: state.app.contacts,
        searchingContacts: state.contact.searchingContacts,
    };
};

export default connect(mapStateToProps, { searchContact })(SearchDropdown);
