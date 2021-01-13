import auth from 'solid-auth-client';
import PodClient from 'ownfiles';
import AclClient from 'ownacl';
import User from 'ownuser';
import mime from 'mime';
import url from 'url';
import ns from 'solid-namespace';
import FileSaver from 'file-saver';

import {
    INDEX_STORAGE,
    INDEX_STORAGE_SUCCESS,
    INDEX_STORAGE_FAILURE,
    FETCH_CURRENT_ITEM,
    FETCH_CURRENT_ITEM_SUCCESS,
    FETCH_CURRENT_ITEM_FAILURE,
    SET_CURRENT_PATH,
    SET_SELECTION,
    TOGGLE_SELECTION_MODE,
    FETCH_NOTIFICATIONS,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_FAILURE,
    SEND_NOTIFICATION,
    SEND_NOTIFICATION_SUCCESS,
    SEND_NOTIFICATION_FAILURE,
    FETCH_IDPS,
    FETCH_IDPS_SUCCESS,
    // FETCH_IDPS_FAILURE,
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
    TOGGLE_SEARCHBAR,
    TOGGLE_DRIVE_MENU,
    TOGGLE_ERROR_WINDOW,
    TOGGLE_ACCESS_WINDOW,
    UPLOAD_FILE,
    UPLOAD_FILE_FAILURE,
    UPLOAD_FILE_SUCCESS,
    FETCH_CURRENT_ACCESS_CONTROL,
    FETCH_CURRENT_ACCESS_CONTROL_SUCCESS,
    FETCH_CURRENT_ACCESS_CONTROL_FAILURE,
    TOGGLE_ACCESS_MODE,
    TOGGLE_ACCESS_MODE_SUCCESS,
    TOGGLE_ACCESS_MODE_FAILURE,
    ADD_ACCESS,
    ADD_ACCESS_FAILURE,
    ADD_ACCESS_SUCCESS,
    DELETE_ACCESS,
    DELETE_ACCESS_FAILURE,
    DELETE_ACCESS_SUCCESS,
    TOGGLE_INFO_WINDOW,
    INDEX_STORAGE_PROGRESS,
    SEARCH_FILE,
    SEARCH_FILE_SUCCESS,
    SEARCH_FILE_FAILURE,
} from './types';

import idps from '../constants/idps.json';
import fileUtils, { getFileOrFolderName } from '../utils/fileUtils';
import { getRootFromWebId } from '../utils/url';

export const setCurrentPath = (newPath, options = {}) => {
    return (dispatch) => {
        newPath = encodeURI(newPath);
        dispatch({ type: SET_CURRENT_PATH, payload: newPath });
        dispatch({ type: SET_SELECTION, payload: [] });
        if (options.noFetch) {
            dispatch({
                type: FETCH_CURRENT_ITEM_SUCCESS,
                payload: { body: '', url: newPath },
            });
        } else {
            dispatch(fetchCurrentItem(newPath, newPath.endsWith('/')));
        }
        return dispatch(fetchCurrentAccessControl(newPath));
    };
};

export const fetchCurrentAccessControl = (file) => {
    return (dispatch) => {
        dispatch({ type: FETCH_CURRENT_ACCESS_CONTROL });
        const aclClient = new AclClient(file);
        return aclClient
            .readAccessControl()
            .then((accessControl) => {
                Promise.all(
                    accessControl.map(async (entity) => ({
                        ...entity,
                        ...(entity.type === 'Agent'
                            ? await new User(entity.name).getProfile()
                            : {}),
                    }))
                ).then((result) => {
                    dispatch({
                        type: FETCH_CURRENT_ACCESS_CONTROL_SUCCESS,
                        payload: {
                            accessControl: result,
                            aclResource: aclClient.aclResource,
                        },
                    });
                });
            })
            .catch((err) => {
                dispatch({
                    type: FETCH_CURRENT_ACCESS_CONTROL_FAILURE,
                });
            });
    };
};

export const addAccess = (agent, file) => {
    return (dispatch) => {
        dispatch({ type: ADD_ACCESS });
        const aclClient = new AclClient(file);
        return aclClient
            .addAgent({ name: agent, access: [] })
            .then(() => {
                dispatch({ type: ADD_ACCESS_SUCCESS });
                dispatch(fetchCurrentAccessControl(file));
            })
            .catch((err) => {
                dispatch({ type: ADD_ACCESS_FAILURE });
            });
    };
};

export const deleteAccess = (agent, file) => {
    return (dispatch) => {
        dispatch({ type: DELETE_ACCESS });
        const aclClient = new AclClient(file);
        const agents = Array.isArray(agent) ? agent : [agent];
        return Promise.all(
            agents.map((agent) =>
                aclClient.deleteAgent({ name: agent, access: [] })
            )
        )
            .then(() => {
                dispatch({ type: DELETE_ACCESS_SUCCESS });
                dispatch(fetchCurrentAccessControl(file));
            })
            .catch((err) => {
                dispatch({ type: DELETE_ACCESS_FAILURE });
            });
    };
};

export const toggleAccessMode = (item, entity, mode) => {
    return (dispatch) => {
        dispatch({ type: TOGGLE_ACCESS_MODE, payload: entity.name });
        const aclClient = new AclClient(item);
        entity.access = entity.access.includes(mode)
            ? entity.access.filter((access) => access !== mode)
            : [...entity.access, mode];

        let update;
        if (entity.type === 'Agent') {
            update = aclClient.addAgent({
                name: entity.webId,
                access: entity.access,
            });
        } else if (entity.type === 'AgentGroup') {
            update = aclClient.addAgentGroup({
                name: entity.name,
                access: entity.access,
            });
        }
        return Promise.resolve(update)
            .then(() => {
                dispatch({ type: TOGGLE_ACCESS_MODE_SUCCESS });
                dispatch(fetchCurrentAccessControl(item));
            })
            .catch((err) => {
                dispatch({ type: TOGGLE_ACCESS_MODE_FAILURE, payload: err });
            });
    };
};

export const toggleErrorWindow = (error) => {
    return { type: TOGGLE_ERROR_WINDOW, payload: error };
};

export const fetchCurrentItem = (itemUrl) => {
    return (dispatch) => {
        dispatch({ type: FETCH_CURRENT_ITEM });
        const fileClient = new PodClient();
        const options = {
            auth: auth,
            verbose: true,
            headers: {
                Accept: mime.getType(itemUrl) ?? 'text/turtle',
            },
        };

        return fileClient
            .read(itemUrl, options)
            .then((item) => {
                if (item && item.folders) {
                    const files = item.files.map((file) => {
                        return {
                            url: file.name,
                            name: getFileOrFolderName(file.name),
                            type: file.type,
                        };
                    });
                    const folder = item.folders.map((folder) => {
                        return {
                            url: folder,
                            name: getFileOrFolderName(folder),
                        };
                    });
                    dispatch({
                        type: FETCH_CURRENT_ITEM_SUCCESS,
                        payload: {
                            files: files,
                            folders: folder,
                        },
                    });
                } else if (item !== undefined) {
                    dispatch({
                        type: FETCH_CURRENT_ITEM_SUCCESS,
                        payload: {
                            body: item.body,
                            url: itemUrl,
                            type: item.type,
                        },
                    });
                } else {
                    dispatch({
                        type: FETCH_CURRENT_ITEM_FAILURE,
                        payload: new Error('File not found'),
                    });
                }
            })
            .catch((error) =>
                dispatch({
                    type: FETCH_CURRENT_ITEM_FAILURE,
                    payload: error,
                })
            );
    };
};

export const indexStorage = (folderUrl) => {
    return async (dispatch) => {
        dispatch({ type: INDEX_STORAGE });
        const fileClient = new PodClient();
        const index =
            (await fileClient.readIndex(folderUrl).catch(() => {})) ?? [];
        if (!index || index.length === 0) {
            dispatch({
                type: INDEX_STORAGE_PROGRESS,
                payload: 1,
            });
            return fileClient
                .createIndex(folderUrl, {
                    verbose: true,
                    foundCallback: (item) =>
                        dispatch({
                            type: INDEX_STORAGE_PROGRESS,
                            payload: item,
                        }),
                })
                .then((index) => {
                    dispatch({
                        type: INDEX_STORAGE_SUCCESS,
                        payload: index,
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: INDEX_STORAGE_FAILURE,
                        payload: err,
                    });
                });
        } else {
            dispatch({
                type: INDEX_STORAGE_SUCCESS,
                payload: index,
            });
        }
    };
};

export const downloadFile = (file) => {
    return (dispatch) => {
        dispatch({ type: DOWNLOAD_FILE });
        const fileClient = new PodClient();
        fileClient
            .read(file)
            .then((result) => {
                const fileType = mime.getType(file);
                if (fileType.includes('image')) {
                    FileSaver.saveAs(file, getFileOrFolderName(file));
                    dispatch({ type: DOWNLOAD_FILE_SUCCESS });
                } else {
                    const blob = new Blob([result], {
                        type: mime.getType(file),
                    });
                    FileSaver.saveAs(blob, getFileOrFolderName(file));
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

export const searchFile = (user, path) => {
    return (dispatch) => {
        const rootPath = !!user.storage
            ? user.storage
            : getRootFromWebId(user.webId);
        const searchPath = url.resolve(rootPath, path ?? '/');
        const fileClient = new PodClient();
        dispatch({
            type: SEARCH_FILE,
            payload: searchPath.replace('https://', ''),
        });
        fileClient
            .read(searchPath, {
                verbose: true,
                headOnly: true,
                headers: {
                    Accept: mime.getType(searchPath) ?? 'text/turtle',
                },
            })
            .then((folder) => {
                const result = folder.files
                    ? [...folder.files, ...folder.folders].map((item) =>
                          item.name
                              ? {
                                    types: item.type
                                        ? [item.type, ns().ldp('Resource')]
                                        : ['text/turtle', ns().ldp('Resource')],
                                    url: item.name,
                                    name: getFileOrFolderName(item.name),
                                }
                              : {
                                    url: item,
                                    name: getFileOrFolderName(item),
                                    types: [ns().ldp('Container')],
                                }
                      )
                    : [
                          {
                              types: folder.type
                                  ? [folder.type, ns().ldp('Resource')]
                                  : ['text/turtle', ns().ldp('Resource')],
                              url: folder.name,
                              name: getFileOrFolderName(folder.name),
                          },
                      ];
                dispatch({
                    type: SEARCH_FILE_SUCCESS,
                    payload: result,
                });
            })
            .catch((err) => {
                dispatch({ type: SEARCH_FILE_FAILURE, payload: err });
            });
    };
};

export const updateFile = (file, body) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_FILE });
        const fileClient = new PodClient();
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

export const toggleInfoWindow = () => {
    return { type: TOGGLE_INFO_WINDOW };
};

export const toggleSelectionMode = () => {
    return { type: TOGGLE_SELECTION_MODE };
};

export const fetchIdps = () => {
    return (dispatch) => {
        dispatch({ type: FETCH_IDPS });
        dispatch({ type: FETCH_IDPS_SUCCESS, payload: idps });
        // const request = { method: 'GET' };
        // fetch('https://solid.github.io/solid-idp-list/services.json', request)
        //     .then((response) => {
        //         response.json().then((body) => {
        //             body.idps = [
        //                 {
        //                     url: 'https://aws.owntech.de/',
        //                     icon: 'https://aws.owntech.de/favicon.ico',
        //                     icon_bg: '#fff',
        //                     title: 'aws.owntech.de',
        //                     title_color: '#000',
        //                     policyURL: 'https://aws.owntech.de',
        //                     description: `Owntech is a german identity provider, dedicated to Data Ownership`,
        //                     btn_bg: '#fff',
        //                     btn_color: '#000',
        //                 },
        //                 ...body.idps,
        //             ];
        //             if (body.idps)
        //                 body.idps.find((idp) => {
        //                     if (idp.title === 'solid.community') {
        //                         idp.url = 'https://solidcommunity.net/';
        //                     }
        //                 });
        //             dispatch({ type: FETCH_IDPS_SUCCESS, payload: body.idps });
        //         });
        //     })
        //     .catch((err) => {
        //         dispatch({ type: FETCH_IDPS_FAILURE, payload: err });
        //     });
    };
};

export const deleteItems = (items, currentPath = '/') => {
    return (dispatch) => {
        dispatch({ type: DELETE_ITEMS });
        const fileClient = new PodClient();
        fileClient
            .delete(items)
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
                const fileClient = new PodClient();
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

export const createFile = function (name, path) {
    return (dispatch) => {
        dispatch({ type: CREATE_FILE });
        const contentType = mime.getType(name) || 'text/plain';
        const fileClient = new PodClient();
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

export const renameItem = function (renamedItem, value) {
    return (dispatch) => {
        dispatch({ type: RENAME_ITEM });
        auth.currentSession().then((session) => {
            console.info(renamedItem, value);
            const fileClient = new PodClient();
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
                    dispatch(fetchCurrentItem(location + '/', true));
                })
                .catch((err) => {
                    dispatch({ type: RENAME_ITEM_FAILURE, payload: err });
                });
        });
    };
};

export const uploadFileOrFolder = ({ target }, currentPath) => {
    return (dispatch) => {
        dispatch({ type: UPLOAD_FILE });
        try {
            const files = target.files;
            if (files && files.length) {
                const uploads = [];
                for (const file of files) {
                    uploads.push(
                        fileUtils
                            .uploadFile(file, currentPath)
                            .catch((error) => {
                                dispatch({
                                    type: UPLOAD_FILE_FAILURE,
                                    payload: error,
                                });
                            })
                    );
                }
                Promise.all(uploads)
                    .then(() => {
                        dispatch({ type: UPLOAD_FILE_SUCCESS });
                        dispatch(fetchCurrentItem(currentPath, true));
                    })
                    .catch((error) => {
                        dispatch({
                            type: UPLOAD_FILE_FAILURE,
                            payload: error,
                        });
                    });
            }
        } catch (error) {
            dispatch({ type: UPLOAD_FILE_FAILURE, payload: error });
        }
    };
};

export const openCreateFileWindow = function () {
    return (dispatch) => {
        dispatch({ type: OPEN_CREATE_FILE_WINDOW });
    };
};

export const closeCreateFileWindow = function () {
    return (dispatch) => {
        dispatch({ type: CLOSE_CREATE_FILE_WINDOW });
    };
};

export const openCreateFolderWindow = function () {
    return (dispatch) => {
        dispatch({ type: OPEN_CREATE_FOLDER_WINDOW });
    };
};

export const closeCreateFolderWindow = function () {
    return (dispatch) => {
        dispatch({ type: CLOSE_CREATE_FOLDER_WINDOW });
    };
};

export const openConsentWindow = function () {
    return (dispatch) => {
        dispatch({ type: OPEN_CONSENT_WINDOW });
    };
};

export const closeConsentWindow = function () {
    return (dispatch) => {
        dispatch({ type: CLOSE_CONSENT_WINDOW });
    };
};

export const openRenameWindow = function (item) {
    return (dispatch) => {
        dispatch({ type: OPEN_RENAME_WINDOW, payload: item });
    };
};

export const closeRenameWindow = function () {
    return (dispatch) => {
        dispatch({ type: CLOSE_RENAME_WINDOW });
    };
};

export const toggleDriveMenu = function () {
    return (dispatch) => {
        dispatch({ type: TOGGLE_DRIVE_MENU });
    };
};

export const createFolder = function (name, path) {
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

export const toggleSearchbar = () => {
    return (dispatch) => {
        dispatch({ type: TOGGLE_SEARCHBAR });
    };
};

export const toggleAccessWindow = () => {
    return (dispatch) => {
        dispatch({ type: TOGGLE_ACCESS_WINDOW });
    };
};
