import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
    SET_WEBID,
    FETCH_CURRENT_ITEMS,
    FETCH_CURRENT_ITEMS_SUCCESS,
    FETCH_CURRENT_ITEMS_FAIL,
    SET_CURRENT_PATH,
    SET_SELECTION,
    FETCH_NOTIFICATIONS,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_FAILURE,
    SEND_NOTIFICATION,
    SEND_NOTIFICATION_SUCCESS,
    SEND_NOTIFICATION_FAILURE,
    FETCH_IDPS,
    FETCH_IDPS_SUCCESS,
    FETCH_IDPS_FAILED,
    DELETE_ITEMS,
    DELETE_ITEMS_SUCCESS,
    DELETE_ITEMS_FAILURE,
    COPY_ITEMS,
    PASTE_ITEMS,
    PASTE_ITEMS_SUCCESS,
    PASTE_ITEMS_FAILURE,
    FETCH_CONTACTS,
    FETCH_CONTACTS_SUCCESS,
    FETCH_CONTACTS_FAILURE,
    ADD_CONTACT,
    REMOVE_CONTACT,
    UPDATE_PROFILE,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_SUCCESS,
    CHANGE_PROFILE_PHOTO,
    CHANGE_PROFILE_PHOTO_SUCCESS,
    CHANGE_PROFILE_PHOTO_FAILURE,
    SET_CURRENT_CONTACT,
    RENAME_ITEM,
    RENAME_ITEM_SUCCESS,
    RENAME_ITEM_FAILURE,
    FETCH_APPS_SUCCESS,
    FETCH_APPS,
} from './types';
import User from 'ownuser';
import auth from 'solid-auth-client';
import rdf from 'rdflib';
import fileUtils from '../utils/fileUtils';
import PodClient from 'ownfiles';
import { apps } from '../constants/appsMock';

export const login = (username, password) => {
    return (dispatch) => {
        dispatch({ type: LOGIN });
        auth.currentSession()
            .then((session) => {
                if (!session) {
                    dispatch({ type: LOGIN_FAIL });
                } else if (session) {
                    dispatch(setSessionInfo(session));
                    dispatch(fetchContacts(session.webId));
                }
            })
            .catch((error) => {
                dispatch({ type: LOGIN_FAIL, payload: error });
            });
    };
};

const setSessionInfo = (session) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_SUCCESS, payload: session });
        dispatch({ type: SET_WEBID, payload: session.webId });
        dispatch(setCurrentPath(session.webId.replace('profile/card#me', '')));
        dispatch(fetchUser(session.webId));
    };
};

export const setWebId = (webId) => {
    return { type: SET_WEBID, payload: webId };
};

export const setCurrentPath = (newPath) => {
    return (dispatch) => {
        dispatch({ type: SET_CURRENT_PATH, payload: newPath });
        dispatch({ type: SET_SELECTION, payload: [] });
        dispatch(fetchCurrentItems(newPath));
    };
};

export const fetchUser = (webId) => {
    return (dispatch) => {
        dispatch({ type: FETCH_USER });
        const currUser = new User(webId);
        currUser
            .getProfile()
            .then((profile) => {
                dispatch({ type: FETCH_USER_SUCCESS, payload: profile });
            })
            .catch((error) =>
                dispatch({ type: FETCH_USER_FAIL, payload: error })
            );
    };
};

const convertFolderUrlToName = (folderUrl) => {
    return folderUrl.split('/').splice(-2)[0];
};

const convertFileUrlToName = (fileUrl) => {
    return fileUrl.split('/').splice(-1)[0];
};

export const setCurrentContact = (profile) => {
    return (dispatch) => {
        dispatch({ type: SET_CURRENT_CONTACT, payload: profile });
    };
};

export const fetchCurrentItems = (url) => {
    return (dispatch) => {
        dispatch({ type: FETCH_CURRENT_ITEMS });
        fileUtils
            .getFolderFiles(url)
            .then((items) => {
                const fileNames = items.files.map((file) => {
                    return convertFileUrlToName(file);
                });
                const folderNames = items.folders.map((folder) => {
                    return convertFolderUrlToName(folder);
                });
                dispatch({
                    type: FETCH_CURRENT_ITEMS_SUCCESS,
                    payload: { files: fileNames, folders: folderNames },
                });
            })
            .catch((error) =>
                dispatch({ type: FETCH_CURRENT_ITEMS_FAIL, payload: error })
            );
    };
};

export const fetchNotifications = (webId) => {
    return (dispatch) => {
        dispatch({ type: FETCH_NOTIFICATIONS });
        fileUtils
            .getNotificationFiles(webId)
            .then((notifications) => {
                dispatch({
                    type: FETCH_NOTIFICATIONS_SUCCESS,
                    payload: notifications,
                });
            })
            .catch((err) => {
                dispatch({
                    type: FETCH_NOTIFICATIONS_FAILURE,
                });
            });
    };
};

export const sendNotification = (to, notification) => {
    return (dispatch) => {
        dispatch({ type: SEND_NOTIFICATION });
        fileUtils
            .sendNotification(to, notification)
            .then(() => {
                dispatch({
                    type: SEND_NOTIFICATION_SUCCESS,
                });
            })
            .catch((err) => {
                dispatch({
                    type: SEND_NOTIFICATION_FAILURE,
                    payload: err,
                });
            });
    };
};

export const setSelection = (selection) => {
    return (dispatch) => {
        dispatch({ type: SET_SELECTION, payload: selection });
    };
};

export const fetchIdps = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_IDPS });
        const request = { method: 'GET' };
        fetch('https://solid.github.io/solid-idp-list/services.json', request)
            .then((response) => {
                response.json().then((idps) => {
                    dispatch({ type: FETCH_IDPS_SUCCESS, payload: idps.idps });
                });
            })
            .catch((err) => {
                dispatch({ type: FETCH_IDPS_FAILED, payload: err });
            });
    };
};

export const deleteItems = (items, currentPath = '/') => {
    return (dispatch) => {
        dispatch({ type: DELETE_ITEMS });
        fileUtils
            .deleteItems(items)
            .then(() => {
                // To avoid reloading when not everything has been deleted
                setTimeout(() => {
                    dispatch({ type: DELETE_ITEMS_SUCCESS });
                    dispatch(setCurrentPath(currentPath));
                }, 2000);
            })
            .catch((err) => {
                dispatch({ type: DELETE_ITEMS_FAILURE, payload: err });
            });
    };
};

export const copyItems = (items) => {
    return (dispatch) => {
        dispatch({ type: COPY_ITEMS, payload: items });
    };
};

export const pasteItems = (items, location) => {
    return (dispatch) => {
        dispatch({ type: PASTE_ITEMS });
        auth.currentSession()
            .then((session) => {
                const pod = new PodClient({ podUrl: session.webId });
                const paste = new Promise((resolve, reject) => {
                    items.map((item, index) => {
                        if (index == items.length - 1) {
                            return pod.copy(item, location).then(() => {
                                resolve();
                            });
                        } else {
                            return pod.copy(item, location);
                        }
                    });
                    Promise.all(items).catch((err) => {
                        reject(err);
                    });
                });
                Promise.resolve(paste)
                    .then(() => {
                        dispatch({ type: PASTE_ITEMS_SUCCESS });
                        dispatch(setCurrentPath(location));
                    })
                    .catch((err) => {
                        dispatch({ type: PASTE_ITEMS_FAILURE, payload: err });
                    });
            })
            .catch((err) => {
                dispatch({ type: PASTE_ITEMS_FAILURE, payload: err });
            });
    };
};

export const addContact = (webId, contactWebId) => {
    return (dispatch) => {
        dispatch({ type: ADD_CONTACT });
        const user = new User(webId);
        user.addContact(contactWebId).then(() =>
            dispatch(fetchContacts(webId))
        );
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
export const updateProfile = (profileData, webId) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_PROFILE });
        const currUser = new User(webId);
        currUser
            .setProfile(profileData)
            .then(() => {
                dispatch({ type: UPDATE_PROFILE_SUCCESS });
                dispatch(fetchUser(webId));
            })
            .catch(dispatch({ type: UPDATE_PROFILE_FAILURE }));
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
        reader.onload = function() {
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
                    if (res.status == 201) {
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

export const fetchApps = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_APPS });
        dispatch({ type: FETCH_APPS_SUCCESS, payload: apps });
    };
};

export const renameItem = function(renamedItem, value) {
    return (dispatch) => {
        dispatch({ type: RENAME_ITEM });
        auth.currentSession().then((session) => {
            const fileClient = new PodClient({ podUrl: session.webId });
            const rename = new Promise((resolve, reject) => {
                if (renamedItem.endsWith('/')) {
                    fileClient
                        .renameFolder(renamedItem, value)
                        .then(() => {
                            resolve();
                        })
                        .catch((err) => {
                            reject(err);
                        });
                } else {
                    fileClient
                        .renameFile(renamedItem, value)
                        .then(() => {
                            resolve();
                        })
                        .catch((err) => {
                            reject(err);
                        });
                }
            });
            Promise.resolve(rename)
                .then(() => {
                    let location = renamedItem.split('/');
                    if (renamedItem.endsWith('/')) {
                        location.pop();
                        location.pop();
                    } else {
                        location.pop();
                    }

                    location = location.join('/');
                    dispatch({ type: RENAME_ITEM_SUCCESS });
                    dispatch(setCurrentPath(location + '/'));
                })
                .catch((err) => {
                    dispatch({ type: RENAME_ITEM_FAILURE, payload: err });
                });
        });
    };
};
