import idps from '../constants/idps';

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
    FETCH_CONTACTS_FAILURE,
    FETCH_CONTACTS_SUCCESS,
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    CHANGE_PROFILE_PHOTO,
    CHANGE_PROFILE_PHOTO_SUCCESS,
    CHANGE_PROFILE_PHOTO_FAILURE,
    SET_CURRENT_CONTACT,
    RENAME_ITEM,
    RENAME_ITEM_SUCCESS,
    RENAME_ITEM_FAILURE,
    SEARCH_CONTACT,
    SEARCH_CONTACT_SUCCESS,
    SEARCH_CONTACT_FAILURE,
    OPEN_CREATE_FILE_WINDOW,
    CLOSE_CREATE_FOLDER_WINDOW,
    OPEN_CREATE_FOLDER_WINDOW,
    CLOSE_CREATE_FILE_WINDOW,
    OPEN_RENAME_WINDOW,
    CLOSE_RENAME_WINDOW,
    OPEN_CONSENT_WINDOW,
    CLOSE_CONSENT_WINDOW,
    CREATE_FILE,
    CREATE_FILE_SUCCESS,
    CREATE_FILE_FAILURE,
    CREATE_FOLDER,
    CREATE_FOLDER_SUCCESS,
    CREATE_FOLDER_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
    webId: null,
    user: null,
    loadLogin: false,
    loadUser: false,
    loadContacts: false,
    loadFolderTree: false,
    loadNotifications: false,
    loadCurrentItems: false,
    loadDeletion: false,
    error: null,
    contacts: null,
    session: null,
    currentPath: null,
    currentItems: null,
    currentFolderTree: null,
    notifications: null,
    selectedItems: [],
    idps: idps,
    clipboard: [],
    loadPaste: false,
    idps: idps,
    currentContact: null,
    updateProfile: false,
    updateProfileError: false,
    updateProfilePic: false,
    contactSearchResult: null,
    searchingContacts: false,
    isRenameWindowVisible: false,
    renamedItem: null,
    isCreateFileVisible: false,
    isCreateFolderVisible: false,
    isConsentWindowVisible: false,
    creatingFile: false,
    creatingFolder: false,
    // [
    //     {
    //         name: 'testdata',
    //         webId: 'https://bejow.solid.community/profile/card#me',
    //     },
    //     {
    //         name: 'testdata2',
    //         webId: 'https://bejow.solid.community/profile/card#me',
    //     },
    // ],
};

export default (state = INITIAL_STATE, action) => {
    const { payload, type } = action;
    console.log('App Reducer got action: ', type, '\nValue: ', payload);
    switch (type) {
        case LOGIN:
            return { ...state, loadLogin: true };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loadLogin: false,
                webId: payload.webId,
                session: payload,
            };
        case LOGIN_FAIL:
            return { ...state, loadLogin: false, error: payload };
        case FETCH_USER:
            return { ...state, loadUser: true };
        case FETCH_USER_SUCCESS:
            return { ...state, loadUser: false, user: payload };
        case FETCH_USER_FAIL:
            return { ...state, loadUser: false, error: payload };
        case FETCH_CONTACTS:
            return { ...state, loadContacts: true };
        case FETCH_CONTACTS_SUCCESS:
            return { ...state, loadContacts: false, contacts: payload };
        case FETCH_CONTACTS_FAILURE:
            return { ...state, loadContacts: false, error: payload };
        case SET_WEBID:
            return { ...state, webId: payload };
        case SET_CURRENT_PATH:
            return { ...state, currentPath: payload, selectedItem: [] };
        case SET_SELECTION:
            return { ...state, selectedItems: [...payload] };
        case FETCH_CURRENT_ITEMS:
            return { ...state, loadFolder: true };
        case FETCH_CURRENT_ITEMS_SUCCESS:
            return { ...state, loadFolder: false, currentItems: payload };
        case FETCH_CURRENT_ITEMS_FAIL:
            return { ...state, loadFolder: false, error: payload };
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
        case UPDATE_PROFILE:
            return { ...state, updateProfile: true, updateProfileError: false };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                updateProfile: false,
                updateProfileError: false,
            };
        case UPDATE_PROFILE_FAILURE:
            return { ...state, updateProfile: false, updateProfileError: true };
        case CHANGE_PROFILE_PHOTO:
            return { ...state, updateProfilePic: true };
        case CHANGE_PROFILE_PHOTO_SUCCESS:
            return { ...state, updateProfilePic: false };
        case CHANGE_PROFILE_PHOTO_FAILURE:
            return { ...state, updateProfilePic: false, error: payload };
        case SET_CURRENT_CONTACT:
            return { ...state, currentContact: payload };
        case RENAME_ITEM:
            return { ...state, renamingItem: true };
        case RENAME_ITEM_SUCCESS:
            return { ...state, renamingItem: false };
        case RENAME_ITEM_FAILURE:
            return { ...state, renamingItem: false, error: payload };
        case SEARCH_CONTACT:
            return { ...state, searchingContacts: true };
        case SEARCH_CONTACT_SUCCESS:
            return {
                ...state,
                searchingContacts: false,
                contactsFound: payload,
            };
        case SEARCH_CONTACT_FAILURE:
            return { ...state, searchingContacts: false, error: payload };
        case OPEN_CREATE_FILE_WINDOW:
            return { ...state, isCreateFileVisible: true };
        case CLOSE_CREATE_FILE_WINDOW:
            return { ...state, isCreateFileVisible: false };
        case OPEN_CREATE_FOLDER_WINDOW:
            return { ...state, isCreateFolderVisible: true };
        case CLOSE_CREATE_FOLDER_WINDOW:
            return { ...state, isCreateFolderVisible: false };
        case OPEN_RENAME_WINDOW:
            return {
                ...state,
                isRenameWindowVisible: true,
                renamedItem: payload,
            };
        case CLOSE_RENAME_WINDOW:
            return {
                ...state,
                isRenameWindowVisible: false,
                renamedItem: null,
            };
        case OPEN_CONSENT_WINDOW:
            return { ...state, isConsentWindowVisible: true };
        case CLOSE_CONSENT_WINDOW:
            return { ...state, isConsentWindowVisible: false };
        case CREATE_FILE:
            return { ...state, creatingFile: true };
        case CREATE_FILE_SUCCESS:
            return { ...state, creatingFile: false };
        case CREATE_FILE_FAILURE:
            return { ...state, creatingFile: false };
        case CREATE_FOLDER:
            return { ...state, creatingFolder: true };
        case CREATE_FOLDER_SUCCESS:
            return { ...state, creatingFolder: false };
        case CREATE_FOLDER_FAILURE:
            return { ...state, creatingFolder: false };
        default:
            return state;
    }
};

// selectors

export const isContact = (state, webId) => {
    state.contacts.forEach((contact) => {
        if (contact.webId === webId) {
            return true;
        }
    });
    return false;
};
