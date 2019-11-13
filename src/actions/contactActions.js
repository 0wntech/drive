import {
    FETCH_CONTACTS,
    FETCH_CONTACTS_SUCCESS,
    FETCH_CONTACTS_FAILURE,
    ADD_CONTACT,
    REMOVE_CONTACT,
    SET_CURRENT_CONTACT,
    SEARCH_CONTACT,
    SEARCH_CONTACT_SUCCESS,
    SEARCH_CONTACT_FAILURE,
    FETCH_CONTACT_RECOMMENDATIONS,
    FETCH_CONTACT_RECOMMENDATIONS_SUCCESS,
    FETCH_CONTACT_RECOMMENDATIONS_FAILURE,
} from './types';
import User from 'ownuser';
import idps from '../constants/idps.json';
import auth from 'solid-auth-client';
import { getWebIdFromRoot } from '../utils/url';

export const setCurrentContact = (profile) => {
    return { type: SET_CURRENT_CONTACT, payload: profile };
};

export const addContact = (webId, contactWebId) => {
    return (dispatch) => {
        dispatch({ type: ADD_CONTACT });
        const user = new User(webId);
        user.addContact(contactWebId).then(() => {
            dispatch(fetchContacts(webId));
            dispatch(fetchContactRecommendations(webId));
        });
    };
};

export const removeContact = (webId, contactWebId) => {
    return (dispatch) => {
        dispatch({ type: REMOVE_CONTACT });
        const user = new User(webId);
        user.deleteContact(contactWebId).then(() =>
            dispatch(fetchContacts(webId))
        );
    };
};

export const fetchContacts = (webId) => {
    return (dispatch) => {
        dispatch({ type: FETCH_CONTACTS });
        const user = new User(webId);
        user.getContacts()
            .then((contacts) => {
                fetchDetailContacts(contacts).then((detailContacts) => {
                    dispatch({
                        type: FETCH_CONTACTS_SUCCESS,
                        payload: detailContacts,
                    });
                });
            })
            .catch((error) =>
                dispatch({ type: FETCH_CONTACTS_FAILURE, payload: error })
            );
    };
};

export const fetchContactRecommendations = (webId) => {
    return (dispatch) => {
        dispatch({ type: FETCH_CONTACT_RECOMMENDATIONS });
        console.log('IN FUNCTION');
        const user = new User(webId);
        user.getContactRecommendations() // TODO change this to the proper function
            .then((recommendations) => {
                fetchDetailContacts(recommendations).then((detailContacts) => {
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
    const requests = contacts.map((webid) => {
        const request = new Promise((resolve, reject) => {
            const contact = new User(webid);
            contact
                .getProfile()
                .then((profileData) => {
                    resolve(profileData);
                })
                .catch((error) => {
                    reject(error);
                });
        });
        return request;
    });
    return Promise.all(requests);
};

export const searchContact = (query) => {
    return (dispatch) => {
        dispatch({ type: SEARCH_CONTACT });
        const lookups = idps.map((idp) => {
            const url = idp.url.replace(idp.title, query + '.' + idp.title);
            return auth
                .fetch(url)
                .then((res) => {
                    if (res.status === 200) {
                        return url;
                    } else {
                        return null;
                    }
                })
                .catch((err) => {
                    return null;
                });
        });
        Promise.all(lookups)
            .then((urls) => {
                const result = [];
                urls.forEach((rootUrl) => {
                    if (rootUrl) {
                        const user = new User(getWebIdFromRoot(rootUrl));
                        result.push(user.getProfile());
                    }
                });
                if (result.length > 0) {
                    Promise.all(result)
                        .then((results) => {
                            dispatch({
                                type: SEARCH_CONTACT_SUCCESS,
                                payload: results,
                            });
                        })
                        .catch((err) => {
                            dispatch({
                                type: SEARCH_CONTACT_FAILURE,
                                payload: err,
                            });
                        });
                } else {
                    dispatch({
                        type: SEARCH_CONTACT_FAILURE,
                        payload: 'No Result',
                    });
                }
            })
            .catch((err) => {
                dispatch({ type: SEARCH_CONTACT_FAILURE, payload: err });
            });
    };
};
