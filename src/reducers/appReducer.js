import idps from '../constants/idps';

import {
    FETCH_CURRENT_ITEM,
    FETCH_CURRENT_ITEM_SUCCESS,
    FETCH_CURRENT_ITEM_FAIL,
    SET_CURRENT_PATH,
    SET_SELECTION,
    FETCH_NOTIFICATIONS,
    FETCH_NOTIFICATIONS_SUCCESS,
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
    OPEN_CREATE_FOLDER_WINDOW,
    CLOSE_CREATE_FOLDER_WINDOW,
    CREATE_FOLDER,
    CREATE_FOLDER_SUCCESS,
    CREATE_FOLDER_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
    loadNotifications: null,
    loadcurrentItem: null,
    loadDeletion: null,
    updatingFile: null,
    error: null,
    currentPath: null,
    currentItem: null,
    notifications: null,
    selectedItems: [],
    clipboard: [],
    loadPaste: null,
    idps: idps,
    isRenameWindowVisible: null,
    renamedItem: null,
    isCreateFileVisible: null,
    isCreateFolderVisible: null,
    isConsentWindowVisible: null,
    creatingFile: null,
    creatingFolder: null,
};

export default (state = INITIAL_STATE, action) => {
    const { payload, type } = action;
    console.log('App Reducer got action: ', type, '\nValue: ', payload);
    switch (type) {
        case SET_CURRENT_PATH:
            return { ...state, currentPath: payload, selectedItem: [] };
        case SET_SELECTION:
            return { ...state, selectedItems: [...payload] };
        case FETCH_CURRENT_ITEM:
            return { ...state, loadCurrentItem: true };
        case FETCH_CURRENT_ITEM_SUCCESS:
            return {
                ...state,
                loadCurrentItem: null,
                currentItem: payload,
                error: null,
            };
        case FETCH_CURRENT_ITEM_FAIL:
            return { ...state, loadCurrentItem: null, error: payload };
        case FETCH_NOTIFICATIONS:
            return {
                ...state,
                loadNotifications: true,
            };
        case FETCH_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loadNotifications: null,
                notifications: payload,
                error: null,
            };
        case FETCH_IDPS:
            return { ...state, loadIdps: true };
        case FETCH_IDPS_SUCCESS:
            return { ...state, idps: payload, loadIdps: null, error: null };
        case FETCH_IDPS_FAILED:
            return { ...state, error: payload, loadIdps: null };
        case OPEN_CONSENT_WINDOW:
            return { ...state, isConsentWindowVisible: true };
        case CLOSE_CONSENT_WINDOW:
            return { ...state, isConsentWindowVisible: null };
        case DELETE_ITEMS:
            return { ...state, loadDeletion: true };
        case DELETE_ITEMS_SUCCESS:
            return { ...state, loadDeletion: null, error: null };
        case DELETE_ITEMS_FAILURE:
            return { ...state, error: payload, loadDeletion: null };
        case COPY_ITEMS:
            return { ...state, clipboard: payload };
        case PASTE_ITEMS:
            return { ...state, loadPaste: true };
        case PASTE_ITEMS_SUCCESS:
            return { ...state, loadPaste: null, error: null };
        case PASTE_ITEMS_FAILURE:
            return { ...state, error: payload, loadPaste: null };
        case OPEN_RENAME_WINDOW:
            return {
                ...state,
                isRenameWindowVisible: true,
                renamedItem: payload,
            };
        case CLOSE_RENAME_WINDOW:
            return {
                ...state,
                isRenameWindowVisible: null,
                renamedItem: null,
            };
        case RENAME_ITEM:
            return { ...state, renamingItem: true };
        case RENAME_ITEM_SUCCESS:
            return { ...state, renamingItem: null, error: null };
        case RENAME_ITEM_FAILURE:
            return { ...state, renamingItem: null, error: payload };
        case UPDATE_FILE:
            return { ...state, updatingFile: true };
        case UPDATE_FILE_SUCCESS:
            return {
                ...state,
                updatingFile: null,
                currentItem: payload,
                error: null,
            };
        case UPDATE_FILE_FAILURE:
            return { ...state, updatingFile: null, error: payload };
        case OPEN_CREATE_FILE_WINDOW:
            return { ...state, isCreateFileVisible: true };
        case CLOSE_CREATE_FILE_WINDOW:
            return { ...state, isCreateFileVisible: null };
        case CREATE_FILE:
            return { ...state, creatingFile: true };
        case CREATE_FILE_SUCCESS:
            return { ...state, creatingFile: null, error: null };
        case CREATE_FILE_FAILURE:
            return { ...state, creatingFile: null, error: payload };
        case OPEN_CREATE_FOLDER_WINDOW:
            return { ...state, isCreateFolderVisible: true };
        case CLOSE_CREATE_FOLDER_WINDOW:
            return { ...state, isCreateFolderVisible: null };
        case CREATE_FOLDER:
            return { ...state, creatingFolder: true };
        case CREATE_FOLDER_SUCCESS:
            return { ...state, creatingFolder: null, error: null };
        case CREATE_FOLDER_FAILURE:
            return { ...state, creatingFolder: null };
        default:
            return state;
    }
};
