import React, { useState } from 'react';
import url from 'url';
import { Window } from '../Window';
import styles from './AccessWindow.module.scss';
import './AccessWindow.scss';
import { connect } from 'react-redux';
import { ClassicSpinner } from 'react-spinners-kit';

import {
    toggleAccessWindow,
    addAccess,
    deleteAccess,
} from '../../actions/appActions';
import SearchDropdown from '../SearchDropdown/SearchDropdown';
import AccessListItem from '../AccessListItem';
import BottomOverlay from '../BottomOverlay';
import ActionButton from '../ActionButton';
import { getUsernameFromWebId, isValidUrl } from '../../utils/url';
import Search from '../../assets/svgIcons/Search';
import DefaultIcon from '../DefaultIcon';
import { getInitialsFromUser } from '../../utils/helper';

const formatOptionLabel = ({ contact }) => {
    return (
        contact && (
            <div className={styles.optionContainer}>
                <div className={styles.iconContainer}>
                    {contact.picture && isValidUrl(contact.picture) ? (
                        <div
                            className={styles.contactIcon}
                            style={{
                                backgroundImage: `url('${contact.picture}')`,
                            }}
                        />
                    ) : (
                        <DefaultIcon
                            className={styles.defaultContactIcon}
                            initials={getInitialsFromUser(contact)}
                        />
                    )}
                </div>
                <span>
                    {contact.name
                        ? contact.name
                        : getUsernameFromWebId(contact.webId)}
                </span>
            </div>
        )
    );
};

export const AccessWindow = ({
    toggleAccessWindow,
    isAccessWindowVisible,
    currentAccessControl,
    defaultAclResource,
    contacts,
    contactSearchResult,
    searchingContacts,
    currentPath,
    addAccess,
    deleteAccess,
}) => {
    const [searchbar, setSetSearchbar] = useState(false);
    const getSearchDropdownOptions = () => {
        return contacts
            ? contactSearchResult && contactSearchResult.length > 0
                ? [...contactSearchResult, ...contacts].map((contact) => ({
                      value: getUsernameFromWebId(contact.webId),
                      type: 'contact',
                      contact,
                  }))
                : contacts.map((contact) => ({
                      value: getUsernameFromWebId(contact.webId),
                      type: 'contact',
                      contact,
                  }))
            : [];
    };

    const dropdownIndicator = searchingContacts ? (
        <ClassicSpinner size={16} color="#686769" loading={true} />
    ) : (
        <Search
            {...{
                viewBox: '0 0 24 24',
                width: 24,
                height: 24,
            }}
        />
    );

    return (
        <Window
            windowName={'Manage Access'}
            onClose={() => {
                const agentsWithoutAccess =
                    currentAccessControl &&
                    currentAccessControl
                        .filter(
                            (entity) =>
                                entity.type === 'Agent' &&
                                entity.access.length === 0
                        )
                        .map((agent) => agent.webId);
                if (agentsWithoutAccess && agentsWithoutAccess.length > 0)
                    deleteAccess(agentsWithoutAccess, currentPath);
                toggleAccessWindow();
            }}
            visible={isAccessWindowVisible}
            className={styles.window}
        >
            <div className={styles.body}>
                <SearchDropdown
                    indicator={dropdownIndicator}
                    className={styles.search}
                    items={getSearchDropdownOptions()}
                    placeholder="Add a user or group"
                    classNamePrefix="access-search"
                    toggleSearchbar={setSetSearchbar}
                    isSearchBarExpanded={searchbar}
                    onChange={(selected) => {
                        addAccess(selected.contact.webId, currentPath);
                    }}
                    formatOptionLabel={formatOptionLabel}
                />
                <div className={styles.entityWrapper}>
                    <div className={styles.entities}>
                        {currentAccessControl &&
                            currentAccessControl.map((entity) => (
                                <AccessListItem entity={entity} />
                            ))}
                    </div>
                </div>
                {url.parse(currentPath).pathname !== '/' && defaultAclResource && (
                    <BottomOverlay className={styles.buttonOverlay}>
                        <ActionButton
                            color="white"
                            label="Revert to default"
                            className={styles.resetButton}
                        />
                    </BottomOverlay>
                )}
            </div>
        </Window>
    );
};

const mapStateToProps = (state) => ({
    searchingContacts: state.contact.searchingContacts,
    contacts: state.contact.contacts,
    contactSearchResult: state.contact.contactSearchResult,
    isAccessWindowVisible: state.app.isAccessWindowVisible,
    currentAccessControl: state.app.currentAccessControl,
    defaultAclResource: state.app.defaultAclResource,
    currentPath: state.app.currentPath,
});

export default connect(mapStateToProps, {
    toggleAccessWindow,
    addAccess,
    deleteAccess,
})(AccessWindow);
