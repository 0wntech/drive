import {
    FETCH_CONTACTS,
    FETCH_CONTACTS_SUCCESS,
    FETCH_CONTACTS_FAILURE,
    ADD_CONTACT,
    ADD_CONTACT_SUCCESS,
    ADD_CONTACT_FAILURE,
    REMOVE_CONTACT,
    REMOVE_CONTACT_SUCCESS,
    REMOVE_CONTACT_FAILURE,
    SET_CURRENT_CONTACT,
    SEARCH_CONTACT,
    SEARCH_CONTACT_SUCCESS,
    SEARCH_CONTACT_FAILURE,
    FETCH_CONTACT_RECOMMENDATIONS,
    FETCH_CONTACT_RECOMMENDATIONS_SUCCESS,
    FETCH_CONTACT_RECOMMENDATIONS_FAILURE,
    FETCH_CONTACT,
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_FAILURE,
    SEARCH_CONTACT_COMPLETED,
    FETCH_CURRENT_CONTACTS_SUCCESS,
} from './types';
import User from 'ownuser';
import auth from 'solid-auth-client';
import idps from '../constants/idps.json';
import { getWebIdFromRoot } from '../utils/url';
import { searchFile } from './appActions';

export const setCurrentContact = (profile) => {
    return (dispatch) => {
        dispatch({ type: SET_CURRENT_CONTACT, payload: profile });
        dispatch(fetchContactProfiles(profile.contacts ?? []));
    };
};

export const addContact = (webId, contact) => {
    return (dispatch) => {
        dispatch({ type: ADD_CONTACT });
        const user = new User(webId);
        user.addContact(contact.webId)
            .then(() => {
                dispatch({ type: ADD_CONTACT_SUCCESS, payload: contact });
            })
            .catch((err) => {
                dispatch({ type: ADD_CONTACT_FAILURE, payload: err });
            });
    };
};

export const removeContact = (webId, contact) => {
    return (dispatch) => {
        dispatch({ type: REMOVE_CONTACT });
        const user = new User(webId);
        user.deleteContact(contact.webId)
            .then(() => {
                dispatch({
                    type: REMOVE_CONTACT_SUCCESS,
                    payload: contact,
                });
            })
            .catch((err) => {
                dispatch({ type: REMOVE_CONTACT_FAILURE, payload: err });
            });
    };
};

export const fetchContact = (
    webId,
    { profileOnly } = { profileOnly: false }
) => {
    return (dispatch) => {
        dispatch({ type: FETCH_CONTACT });
        const user = new User(webId);
        user.getProfile()
            .then((profile) => {
                dispatch(setCurrentContact(profile));
                dispatch({ type: FETCH_CONTACT_SUCCESS });
                if (!profileOnly)
                    dispatch(fetchContactProfiles(profile.contacts ?? [], profile.webId));
            })
            .catch((error) => {
                dispatch({ type: FETCH_CONTACT_FAILURE, payload: error });
            });
    };
};

export const fetchContactProfiles = (contacts, webId = '') => {
    return (dispatch) => {
        dispatch({ type: FETCH_CONTACTS });
        return fetchDetailContacts(contacts.map((contact) => contact.replace('solid.community', 'solidcommunity.net')))
            .then(async (detailContacts) => {
                const loggedInUser = (await auth.currentSession()).webId;
                if (loggedInUser === webId) {
                    dispatch({
                        type: FETCH_CONTACTS_SUCCESS,
                        payload: detailContacts,
                    });
                } else {
                    dispatch({
                        type: FETCH_CURRENT_CONTACTS_SUCCESS,
                        payload: detailContacts,
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: FETCH_CONTACTS_FAILURE,
                    payload: error,
                });
            });
    };
};

export const fetchContactRecommendations = (webId) => {
    return (dispatch) => {
        dispatch({ type: FETCH_CONTACT_RECOMMENDATIONS });
        const user = new User(webId);
        user.getContactRecommendations()
            .then((recommendations) => {
                fetchDetailContacts(
                    recommendations.map(
                        (recommendation) =>
                            recommendation.replace('solid.community', 'solidcommunity.net')
                    )
                ).then((detailContacts) => {
                    dispatch({
                        type: FETCH_CONTACT_RECOMMENDATIONS_SUCCESS,
                        payload: detailContacts,
                    });
                });
            })
            .catch((error) =>
                dispatch({
                    type: FETCH_CONTACT_RECOMMENDATIONS_FAILURE,
                    payload: error,
                })
            );
    };
};

export const fetchDetailContacts = (contacts) => {
    const requests = contacts.map((webId) => {
        const request = new Promise((resolve, reject) => {
            if (webId.includes('solid.community')) {
                webId = webId.replace('solid.community', 'solidcommunity.net');
            }
            const contact = new User(webId);
            contact
                .getProfile()
                .then((profileData) => {
                    resolve(profileData);
                })
                .catch((error) => {
                    resolve({ webId: webId });
                });
        });
        return request;
    });
    return Promise.all(requests);
};

export const searchContact = (query, path) => {
    return (dispatch) => {
        dispatch({ type: SEARCH_CONTACT });
        const lookups = idps.map((idp) => {
            const url = idp.url.replace(idp.title, query + '.' + idp.title);
            return auth
                .fetch(url, { method: 'HEAD' })
                .then((res) => {
                    if (res.status !== 404) {
                        return url;
                    } else {
                        return undefined;
                    }
                })
                .catch((err) => {
                    return undefined;
                });
        });
        let foundSomething = false;
        lookups.forEach(async (lookup, index) => {
            const url = await Promise.resolve(lookup);
            if (url) {
                const user = new User(getWebIdFromRoot(url));
                await user
                    .getProfile()
                    .then((contactProfile) => {
                        foundSomething = true;
                        dispatch({
                            type: SEARCH_CONTACT_SUCCESS,
                            payload: contactProfile,
                        });
                        if (path) dispatch(searchFile(contactProfile, path));
                    })
                    .catch((err) => {
                        if (!foundSomething)
                            dispatch({
                                type: SEARCH_CONTACT_SUCCESS,
                                payload: { webId: url },
                            });
                    });
            }
            if (!foundSomething && index === lookups.length - 1) {
                dispatch({ type: SEARCH_CONTACT_FAILURE });
            } else if (index === lookups.length - 1) {
                dispatch({ type: SEARCH_CONTACT_COMPLETED });
            }
        });
    };
};
