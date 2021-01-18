import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ns from 'solid-namespace';
import mime from 'mime';

import styles from './SearchPage.module.scss';

import { searchContact } from '../../actions/contactActions';
import { searchFile } from '../../actions/appActions';
import { Layout } from '../Layout';
import ContactList from '../ContactList';
import ItemList from '../ItemList';
import {
    getContactFolderRoute,
    getFileRoute,
    getHomeRoute,
    getProfileRoute,
    getRootFromWebId,
} from '../../utils/url';
import folder from '../../assets/icons/Folder.png';
import fileIcon from '../../assets/icons/File.png';
import { getFileOrFolderName } from '../../utils/fileUtils';

const getUserSearchQuery = (query) =>
    query.includes('/') ? query.substr(0, query.indexOf('/')) : query;

const getFileSearchPath = (query) =>
    query.includes('/') ? query.substr(query.indexOf('/'), query.length) : '/';

export const SearchPage = ({
    history,
    fileHierarchy,
    webId,
    contactSearchResult,
    searchContact,
    searchFile,
    searchHistory,
    searchingContacts,
    searchingFile,
}) => {
    const [searching, setSearching] = useState(false);
    const query = new URLSearchParams(history.location.search)
        .get('q')
        .replace('https://', '');
    const userSearchQuery = getUserSearchQuery(query);
    const fileSearchPath = getFileSearchPath(query);

    const search = useCallback(() => {
        if (searching) clearTimeout(searching);
        if (
            query &&
            !searchHistory.includes(userSearchQuery + fileSearchPath)
        ) {
            setSearching(
                setTimeout(() => {
                    if (
                        !searchHistory.find(
                            (previousQuery) =>
                                getUserSearchQuery(query) ===
                                getUserSearchQuery(previousQuery)
                        )
                    ) {
                        searchContact(userSearchQuery, fileSearchPath);
                    } else if (
                        !searchHistory.find(
                            (previousQuery) =>
                                getFileSearchPath(query) ===
                                getFileSearchPath(previousQuery)
                        )
                    ) {
                        contactSearchResult.forEach((contact) => {
                            if (
                                contact.name?.includes(
                                    getUserSearchQuery(query)
                                ) ||
                                contact.webId.includes(
                                    getUserSearchQuery(query)
                                )
                            )
                                searchFile(contact, fileSearchPath);
                        });
                    }
                }, 1500)
            );
        }
    }, [query]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(search, [query]);

    const filteredContacts = useMemo(() => {
        return contactSearchResult?.filter(
            (contact) =>
                contact.name
                    ?.toLowerCase()
                    .includes(userSearchQuery.toLowerCase()) ||
                contact.webId
                    .toLowerCase()
                    .includes(userSearchQuery.toLowerCase())
        );
    }, [contactSearchResult, userSearchQuery]);

    const filteredFiles = useMemo(() => {
        return fileHierarchy
            .filter(
                (item) =>
                    item.types.includes(ns().ldp('Resource')) &&
                    item.url
                        .toLowerCase()
                        .includes(fileSearchPath.toLowerCase()) &&
                    item.url
                        .toLowerCase()
                        .includes(userSearchQuery.toLowerCase())
            )
            .map((item) => {
                const type = mime.getType(item.url);
                return {
                    url: item.url,
                    type: type ?? 'text/turtle',
                    name: getFileOrFolderName(item.url),
                };
            });
    }, [fileHierarchy, fileSearchPath, userSearchQuery]);

    const filteredFolders = useMemo(() => {
        return fileHierarchy
            .filter(
                (item) =>
                    item.types.includes(ns().ldp('Container')) &&
                    item.url
                        .toLowerCase()
                        .includes(fileSearchPath.toLowerCase()) &&
                    item.url
                        .toLowerCase()
                        .includes(userSearchQuery.toLowerCase())
            )
            .map((item) => {
                return {
                    url: item.url,
                    name: getFileOrFolderName(item.url),
                };
            });
    }, [fileHierarchy, fileSearchPath, userSearchQuery]);

    return (
        <Layout
            isLoading={searchingContacts || searchingFile}
            className={styles.container}
            label={'Search for ' + query}
        >
            {filteredContacts?.length > 0 && (
                <div className={styles.section}>
                    <div className={styles.sectionLabel}>
                        {query ? 'Users found:' : 'Last Users found:'}
                    </div>
                    <ContactList
                        withIdp
                        contacts={filteredContacts}
                        onItemClick={(contact) => {
                            history.push(getProfileRoute(contact));
                        }}
                    />
                </div>
            )}
            {filteredFolders?.length > 0 ||
            filteredFiles?.length > 0 ||
            searchingFile ? (
                <div className={styles.section}>
                    {!searchingFile && (
                        <div className={styles.sectionLabel}>
                            {query
                                ? 'Resources found:'
                                : 'Last Resources found:'}
                        </div>
                    )}
                    {searchingFile && (
                        <div className={styles.sectionLabel}>
                            Searching for files...
                        </div>
                    )}
                    <ItemList
                        items={filteredFolders}
                        image={folder}
                        onItemClick={(item) => {
                            if (item.includes(getRootFromWebId(webId))) {
                                history.push(getHomeRoute(item));
                            } else {
                                history.push(
                                    getContactFolderRoute(
                                        new URL(item).host,
                                        item
                                    )
                                );
                            }
                        }}
                    />
                    <ItemList
                        isFile
                        items={filteredFiles}
                        image={fileIcon}
                        onItemClick={(item) => {
                            history.push(
                                getFileRoute(new URL(item).host, item)
                            );
                        }}
                    />
                </div>
            ) : (
                <div className={styles.sectionLabel}>
                    No resources found that match {fileSearchPath}{' '}
                    {userSearchQuery ? `by ${userSearchQuery}` : ''}
                </div>
            )}
        </Layout>
    );
};

const mapStateToProps = (state) => ({
    webId: state.user.webId,
    fileHierarchy: state.app.fileHierarchy,
    contactSearchResult: state.contact.contactSearchResult,
    searchingContacts: state.contact.searchingContacts,
    searchingFile: state.app.searchingFile,
    searchHistory: state.app.searchHistory,
});

export default connect(mapStateToProps, { searchContact, searchFile })(
    withRouter(SearchPage)
);
