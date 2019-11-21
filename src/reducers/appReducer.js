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
    DELETE_ITEMS,
    DELETE_ITEMS_SUCCESS,
    DELETE_ITEMS_FAILURE,
    COPY_ITEMS,
    PASTE_ITEMS,
    PASTE_ITEMS_SUCCESS,
    PASTE_ITEMS_FAILURE,
    RENAME_ITEM,
    RENAME_ITEM_SUCCESS,
    RENAME_ITEM_FAILURE,
    UPDATE_FILE,
    UPDATE_FILE_SUCCESS,
    UPDATE_FILE_FAILURE,
    CREATE_FILE,
    CREATE_FILE_SUCCESS,
    CREATE_FILE_FAILURE,
    DOWNLOAD_FILE,
    DOWNLOAD_FILE_SUCCESS,
    DOWNLOAD_FILE_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
    loadNotifications: false,
    loadcurrentItem: false,
    loadDeletion: false,
    updatingFile: false,
    error: null,
    currentPath: null,
    currentItem: null,
    notifications: null,
    selectedItems: [],
    clipboard: [],
    loadPaste: false,
    idps: idps,
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
                loadCurrentItem: false,
                currentItem: payload,
                error: false,
            };
        case FETCH_CURRENT_ITEM_FAIL:
            return { ...state, loadCurrentItem: false, error: payload };
        case FETCH_NOTIFICATIONS:
            return {
                ...state,
                loadNotifications: true,
            };
        case FETCH_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loadNotifications: false,
                notifications: payload,
            };
        case FETCH_IDPS:
            return { ...state, loadIdps: true };
        case FETCH_IDPS_SUCCESS:
            return { ...state, idps: payload, loadIdps: false };
        case FETCH_IDPS_FAILED:
            return { ...state, error: payload, loadIdps: false };
        case DELETE_ITEMS:
            return { ...state, loadDeletion: true };
        case DELETE_ITEMS_SUCCESS:
            return { ...state, loadDeletion: false };
        case DELETE_ITEMS_FAILURE:
            return { ...state, error: payload, loadDeletion: false };
        case COPY_ITEMS:
            return { ...state, clipboard: payload };
        case PASTE_ITEMS:
            return { ...state, loadPaste: true };
        case PASTE_ITEMS_SUCCESS:
            return { ...state, loadPaste: false };
        case PASTE_ITEMS_FAILURE:
            return { ...state, error: payload, loadPaste: false };
        case RENAME_ITEM:
            return { ...state, renamingItem: true };
        case RENAME_ITEM_SUCCESS:
            return { ...state, renamingItem: false };
        case RENAME_ITEM_FAILURE:
            return { ...state, renamingItem: false, error: payload };
        case UPDATE_FILE:
            return { ...state, updatingFile: true };
        case UPDATE_FILE_SUCCESS:
            return { ...state, updatingFile: false, currentItem: payload };
        case UPDATE_FILE_FAILURE:
            return { ...state, updatingFile: false, error: payload };
        case CREATE_FILE:
            return { ...state, creatingFile: true };
        case CREATE_FILE_SUCCESS:
            return { ...state, creatingFile: false };
        case CREATE_FILE_FAILURE:
            return { ...state, creatingFile: false, error: payload };
        case DOWNLOAD_FILE:
            return { ...state, downloadingFile: true };
        case DOWNLOAD_FILE_SUCCESS:
            return { ...state, downloadingFile: false };
        case DOWNLOAD_FILE_FAILURE:
            return { ...state, downloadingFile: false, error: payload };
        default:
            return state;
    }
};
