import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
    SET_WEBID,
    FETCH_FRIENDS,
    FETCH_FRIENDS_FAIL,
    FETCH_FRIENDS_SUCCESS,
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
} from './types';
import auth from 'solid-auth-client';
import User from 'your-user';
import fileUtils from '../utils/fileUtils';

export const login = (username, password) => {
    return (dispatch) => {
        dispatch({ type: LOGIN });
        auth.currentSession()
            .then((session) => {
                if (!session) {
                    dispatch({ type: LOGIN_FAIL });
                } else if (session) {
                    dispatch(setSessionInfo(session));
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
        console.log('in fetch user', webId);
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
        console.log('finish');
    };
};

export const fetchContacts = (yourUserObject) => {
    return (dispatch) => {
        dispatch({ type: FETCH_FRIENDS });
        yourUserObject
            .getFriends()
            .then((friends) => {
                dispatch({ type: FETCH_FRIENDS_SUCCESS, payload: friends });
            })
            .catch((error) => {
                dispatch({ type: FETCH_FRIENDS_FAIL, payload: error });
            });
    };
};

const convertFolderUrlToName = (folderUrl) => {
    return folderUrl.split('/').splice(-2)[0];
};

const convertFileUrlToName = (fileUrl) => {
    return fileUrl.split('/').splice(-1)[0];
};

export const fetchCurrentItems = (url) => {
    return (dispatch) => {
        dispatch({ type: FETCH_CURRENT_ITEMS });
        fileUtils
            .getFolderFiles(url)
            .then((items) => {
                console.log(items);
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

export const sendNotification = (webId, notification) => {
    return (dispatch) => {
        dispatch({ type: SEND_NOTIFICATION });
        fileUtils
            .sendNotification(webId, notification)
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
