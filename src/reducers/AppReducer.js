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
    FETCH_CONTACTS,
    FETCH_CONTACTS_FAILURE,
    FETCH_CONTACTS_SUCCESS,
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
    idps: null,
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
        default:
            return state;
    }
};
