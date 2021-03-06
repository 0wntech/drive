import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    SET_WEBID,
    SET_STORAGE_URL,
    SET_STORAGE_URL_SUCCESS,
    SET_STORAGE_URL_FAILURE,
    UPDATE_PROFILE,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_SUCCESS,
    CHANGE_PROFILE_PHOTO,
    CHANGE_PROFILE_PHOTO_SUCCESS,
    CHANGE_PROFILE_PHOTO_FAILURE,
    FETCH_CONTACTS_SUCCESS,
} from './types';
import User from 'ownuser';
import { Graphs } from 'webql-client';
import auth from 'solid-auth-client';
import * as rdf from 'rdflib';
import { fetchContactProfiles } from './contactActions';

export const login = () => {
    return (dispatch) => {
        dispatch({ type: LOGIN });
        auth.currentSession()
            .then((session) => {
                if (!session) {
                    dispatch({ type: LOGIN_FAIL, payload: 'No Session' });
                } else if (session) {
                    dispatch(setSessionInfo(session));
                }
            })
            .catch((error) => {
                dispatch({ type: LOGIN_FAIL, payload: error });
            });
    };
};

export const logout = () => {
    return (dispatch) => {
        auth.logout().then(() => {
            dispatch(setWebId(null));
            window.localStorage.removeItem('solid-auth-client');
            window.location = '/';
        });
    };
};

const setSessionInfo = (session) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_SUCCESS, payload: session });
        dispatch({ type: SET_WEBID, payload: session.webId });
        dispatch(fetchUser(session.webId));
    };
};

export const setWebId = (webId) => {
    return { type: SET_WEBID, payload: webId };
};

export const setStorageUrl = (url, webId) => {
    return (dispatch) => {
        dispatch({ type: SET_STORAGE_URL });
        const user = new User(webId);
        user.setStorage(url)
            .then(() => {
                dispatch({ type: SET_STORAGE_URL_SUCCESS, payload: url });
            })
            .catch((err) => {
                dispatch({ type: SET_STORAGE_URL_FAILURE, payload: err });
            });
    };
};

export const fetchUser = (webId) => {
    return (dispatch) => {
        dispatch({ type: FETCH_USER });
        const graph = new Graphs(webId);
        return graph
            .load()
            .then((graph) => {
                const user = graph['#me'];
                const profile = {
                    name: user['foaf#name'],
                    bio: user['vcard#note'],
                    job: user['vcard#role'],
                    picture: user['vcard#hasPhoto'],
                    storage: user['space#storage'],
                    apps: Array.isArray(user['acl#trustedApp'])
                        ? user['acl#trustedApp'].map((app) => app['acl#origin'])
                        : user['acl#trustedApp']['acl#origin'],
                    emails: Array.isArray(user['vcard#hasEmail'])
                        ? user['vcard#hasEmail'].map((email) =>
                              email['vcard#value'].replace('mailto:', '')
                          )
                        : user['vcard#hasEmail']
                        ? [
                              user['vcard#hasEmail']['vcard#value'].replace(
                                  'mailto:',
                                  ''
                              ),
                          ]
                        : undefined,
                    telephones: Array.isArray(user['vcard#hasTelephone'])
                        ? user['vcard#hasTelephone'].map((telephone) =>
                              telephone['vcard#value'].replace('tel:', '')
                          )
                        : user['vcard#hasTelephone']
                        ? [
                              user['vcard#hasTelephone']['vcard#value'].replace(
                                  'tel:',
                                  ''
                              ),
                          ]
                        : undefined,
                    webId: user.id,
                    contacts: user['foaf#knows'],
                };
                dispatch({
                    type: FETCH_USER_SUCCESS,
                    payload: profile,
                });
                if (user['foaf#knows']) {
                    dispatch(
                        fetchContactProfiles(
                            Array.isArray(user['foaf#knows'])
                                ? user['foaf#knows']
                                : [user['foaf#knows']],
                            webId
                        )
                    );
                } else {
                    dispatch({
                        type: FETCH_CONTACTS_SUCCESS,
                        payload: [],
                    });
                }
            })
            .catch((error) =>
                dispatch({ type: FETCH_USER_FAILURE, payload: error })
            );
    };
};

const updateOrDeleteValue = (value, shapeFunction, linkPrefix) => {
    return value
        ? shapeFunction(linkPrefix ? linkPrefix + value : value)
        : Object.assign(
              {},
              ...Object.keys(shapeFunction()).map((field) => ({
                  [field]: undefined,
              }))
          );
};

export const updateProfile = (profileData, webId) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_PROFILE });
        const graph = new Graphs(webId);
        graph
            .patch({
                [webId]: {
                    ...updateOrDeleteValue(profileData.name, (value) => ({
                        'vcard#name': value,
                    })),
                    ...updateOrDeleteValue(profileData.bio, (value) => ({
                        'vcard#note': value,
                    })),
                    ...updateOrDeleteValue(profileData.job, (value) => ({
                        'vcard#role': value,
                    })),
                    ...updateOrDeleteValue(
                        profileData.emails,
                        (value) => ({
                            'vcard#hasEmail': {
                                'vcard#value': value,
                            },
                        }),
                        'mailto:'
                    ),
                    ...updateOrDeleteValue(
                        profileData.telephones,
                        (value) => ({
                            'vcard#hasTelephone': {
                                'vcard#value': value,
                            },
                        }),
                        'tel:'
                    ),
                },
            })
            .catch((error) =>
                dispatch({
                    type: UPDATE_PROFILE_FAILURE,
                    payload: error,
                })
            )
            .then((e) => {
                dispatch({ type: UPDATE_PROFILE_SUCCESS, profileData });
            });
    };
};

export const changeProfilePhoto = (e, webId) => {
    return (dispatch) => {
        dispatch({ type: CHANGE_PROFILE_PHOTO });
        const currUser = new User(webId);
        const file = e.target.files[0];
        const reader = new FileReader();
        const store = rdf.graph();
        const fetcher = new rdf.Fetcher(store);
        reader.onload = function () {
            const data = this.result;
            const contentType = file.type;
            const pictureUrl = webId.replace(
                'card#me',
                encodeURIComponent(file.name)
            );

            fetcher
                .webOperation('PUT', pictureUrl, {
                    data: data,
                    contentType: contentType,
                })
                .then((res) => {
                    if (res.status === 201) {
                        currUser
                            .setPicture(pictureUrl)
                            .then(() => {
                                dispatch({
                                    type: CHANGE_PROFILE_PHOTO_SUCCESS,
                                });
                                dispatch(fetchUser(webId));
                            })
                            .catch((err) => {
                                dispatch({
                                    type: CHANGE_PROFILE_PHOTO_FAILURE,
                                    payload: err,
                                });
                            });
                    }
                })
                .catch((err) => {
                    dispatch({
                        type: CHANGE_PROFILE_PHOTO_FAILURE,
                        payload: err,
                    });
                });
        };
        reader.readAsArrayBuffer(file);
    };
};
