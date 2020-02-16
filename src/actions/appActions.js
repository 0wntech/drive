import {
    FETCH_CURRENT_ITEM,
    FETCH_CURRENT_ITEM_SUCCESS,
    FETCH_CURRENT_ITEM_FAIL,
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
    OPEN_CONSENT_WINDOW,
    CLOSE_CONSENT_WINDOW,
    DELETE_ITEMS,
    DELETE_ITEMS_SUCCESS,
    DELETE_ITEMS_FAILURE,
    COPY_ITEMS,
    PASTE_ITEMS,
    PASTE_ITEMS_SUCCESS,
    PASTE_ITEMS_FAILURE,
    OPEN_RENAME_WINDOW,
    CLOSE_RENAME_WINDOW,
    RENAME_ITEM,
    RENAME_ITEM_SUCCESS,
    RENAME_ITEM_FAILURE,
    OPEN_CREATE_FILE_WINDOW,
    CLOSE_CREATE_FILE_WINDOW,
    CREATE_FILE,
    CREATE_FILE_FAILURE,
    CREATE_FILE_SUCCESS,
    UPDATE_FILE,
    UPDATE_FILE_SUCCESS,
    UPDATE_FILE_FAILURE,
    DOWNLOAD_FILE,
    DOWNLOAD_FILE_SUCCESS,
    DOWNLOAD_FILE_FAILURE,
    OPEN_CREATE_FOLDER_WINDOW,
    CLOSE_CREATE_FOLDER_WINDOW,
    CREATE_FOLDER,
    CREATE_FOLDER_SUCCESS,
    CREATE_FOLDER_FAILURE,
} from './types';
import auth from 'solid-auth-client';
import fileUtils from '../utils/fileUtils';
import PodClient from 'ownfiles';
import mime from 'mime';
import url from 'url';
import FileSaver from 'file-saver';
import { convertFolderUrlToName, convertFileUrlToName } from '../utils/url';

export const setCurrentPath = (newPath, options = {}) => {
    return (dispatch) => {
        dispatch({ type: SET_CURRENT_PATH, payload: newPath });
        dispatch({ type: SET_SELECTION, payload: [] });
        if (options.noFetch) {
            return dispatch({
                type: FETCH_CURRENT_ITEM_SUCCESS,
                payload: { body: '', url: newPath },
            });
        } else {
            return dispatch(fetchCurrentItem(newPath, newPath.endsWith('/')));
        }
    };
};

export const fetchCurrentItem = (itemUrl, folder = false) => {
    return (dispatch) => {
        dispatch({ type: FETCH_CURRENT_ITEM });
        const fileClient = new PodClient({
            podUrl: 'https://' + url.parse(itemUrl).host + '/',
        });
        const options = {};
        if (folder) {
            options.auth = auth;
            options.headers = { Accept: 'text/turtle' };
        }
        return fileClient
            .read(itemUrl, options)
            .then((item) => {
                if (item && item.folders) {
                    const fileNames = item.files.map((file) => {
                        return convertFileUrlToName(file);
                    });
                    const folderNames = item.folders.map((folder) => {
                        return convertFolderUrlToName(folder);
                    });
                    dispatch({
                        type: FETCH_CURRENT_ITEM_SUCCESS,
                        payload: {
                            files: fileNames,
                            folders: folderNames,
                        },
                    });
                } else if (item && typeof item === 'string') {
                    dispatch({
                        type: FETCH_CURRENT_ITEM_SUCCESS,
                        payload: { body: item, url: itemUrl },
                    });
                }
            })
            .catch((error) =>
                dispatch({
                    type: FETCH_CURRENT_ITEM_FAIL,
                    payload: error,
                })
            );
    };
};

export const downloadFile = (file) => {
    return (dispatch) => {
        dispatch({ type: DOWNLOAD_FILE });
        const fileClient = new PodClient({});
        fileClient
            .read(file)
            .then((result) => {
                const fileType = mime.getType(file);
                if (fileType.includes('image')) {
                    console.log('saving as image');
                    FileSaver.saveAs(file, convertFileUrlToName(file));
                    dispatch({ type: DOWNLOAD_FILE_SUCCESS });
                } else {
                    const blob = new Blob([result], {
                        type: mime.getType(file),
                    });
                    FileSaver.saveAs(blob, convertFileUrlToName(file));
                    dispatch({ type: DOWNLOAD_FILE_SUCCESS });
                }
            })
            .catch((err) => {
                dispatch({ type: DOWNLOAD_FILE_FAILURE, payload: err });
            });
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

export const updateFile = (file, body) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_FILE });
        const fileClient = new PodClient({
            podUrl: 'https://' + url.parse(file).host + '/',
        });
        if (body !== '') {
            fileClient
                .update(file, body)
                .then(() => {
                    dispatch({
                        type: UPDATE_FILE_SUCCESS,
                        payload: { url: file, body: body },
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: UPDATE_FILE_FAILURE,
                        payload: err,
                    });
                });
        } else {
            dispatch({
                type: UPDATE_FILE_FAILURE,
                payload: "File can't be set to empty",
            });
        }
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
    return { type: SET_SELECTION, payload: selection };
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
                const fileClient = new PodClient({ podUrl: session.webId });
                const paste = new Promise((resolve, reject) => {
                    items.map((item, index) => {
                        if (index === items.length - 1) {
                            return fileClient.copy(item, location).then(() => {
                                resolve();
                            });
                        } else {
                            return fileClient.copy(item, location);
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

export const createFile = function(name, path) {
    return (dispatch) => {
        dispatch({ type: CREATE_FILE });
        const contentType = mime.getType(name);
        const fileClient = new PodClient({
            podUrl: 'https://' + url.parse(name).host + '/',
        });
        return fileClient
            .create(path + name, { contentType: contentType })
            .then(() => {
                dispatch({ type: CREATE_FILE_SUCCESS });
                dispatch(setCurrentPath(path));
            })
            .catch((err) => {
                dispatch({ type: CREATE_FILE_FAILURE, payload: err });
            });
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
                    dispatch(fetchCurrentItem(location + '/'));
                })
                .catch((err) => {
                    dispatch({ type: RENAME_ITEM_FAILURE, payload: err });
                });
        });
    };
};

export const openCreateFileWindow = function() {
    return (dispatch) => {
        dispatch({ type: OPEN_CREATE_FILE_WINDOW });
    };
};

export const closeCreateFileWindow = function() {
    return (dispatch) => {
        dispatch({ type: CLOSE_CREATE_FILE_WINDOW });
    };
};

export const openCreateFolderWindow = function() {
    return (dispatch) => {
        dispatch({ type: OPEN_CREATE_FOLDER_WINDOW });
    };
};

export const closeCreateFolderWindow = function() {
    return (dispatch) => {
        dispatch({ type: CLOSE_CREATE_FOLDER_WINDOW });
    };
};

export const openConsentWindow = function() {
    return (dispatch) => {
        dispatch({ type: OPEN_CONSENT_WINDOW });
    };
};

export const closeConsentWindow = function() {
    return (dispatch) => {
        dispatch({ type: CLOSE_CONSENT_WINDOW });
    };
};

export const openRenameWindow = function(item) {
    return (dispatch) => {
        dispatch({ type: OPEN_RENAME_WINDOW, payload: item });
    };
};

export const closeRenameWindow = function() {
    return (dispatch) => {
        dispatch({ type: CLOSE_RENAME_WINDOW });
    };
};

export const createFolder = function(name, path) {
    return (dispatch) => {
        dispatch({ type: CREATE_FOLDER });
        const fileClient = new PodClient();
        return fileClient
            .create(path + name + '/')
            .then(() => {
                dispatch({ type: CREATE_FOLDER_SUCCESS });
                dispatch(setCurrentPath(path));
            })
            .catch((err) => {
                dispatch({ type: CREATE_FOLDER_FAILURE, payload: err });
            });
    };
};
