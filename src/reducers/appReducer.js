import {
    DEEP_FETCH_CURRENT_ITEM,
    DEEP_FETCH_CURRENT_ITEM_SUCCESS,
    DEEP_FETCH_CURRENT_ITEM_FAILURE,
    FETCH_CURRENT_ITEM,
    FETCH_CURRENT_ITEM_SUCCESS,
    FETCH_CURRENT_ITEM_FAILURE,
    FETCH_CURRENT_ACCESS_CONTROL,
    FETCH_CURRENT_ACCESS_CONTROL_SUCCESS,
    FETCH_CURRENT_ACCESS_CONTROL_FAILURE,
    SET_SELECTION,
    FETCH_NOTIFICATIONS,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_IDPS,
    FETCH_IDPS_SUCCESS,
    FETCH_IDPS_FAILURE,
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
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAILURE,
    OPEN_CREATE_FOLDER_WINDOW,
    CLOSE_CREATE_FOLDER_WINDOW,
    CREATE_FOLDER,
    CREATE_FOLDER_SUCCESS,
    CREATE_FOLDER_FAILURE,
    CLEAR_ERROR,
    TOGGLE_SEARCHBAR,
    TOGGLE_DRIVE_MENU,
    SET_CURRENT_CONTACT,
    SET_CURRENT_PATH,
    TOGGLE_SELECTION_MODE,
    TOGGLE_ERROR_WINDOW,
    TOGGLE_ACCESS_WINDOW,
    TOGGLE_ACCESS_MODE,
    TOGGLE_ACCESS_MODE_SUCCESS,
    TOGGLE_ACCESS_MODE_FAILURE,
    TOGGLE_INFO_WINDOW,
    FETCH_USER_SUCCESS,
    SET_STORAGE_URL_SUCCESS,
} from '../actions/types';
import { getRootFromWebId } from '../utils/url';

const INITIAL_STATE = {
    loadNotifications: false,
    loadCurrentItem: false,
    loadCurrentAccessControl: false,
    currentAccessControl: null,
    defaultAclResource: null,
    loadDeletion: false,
    updatingFile: false,
    uploadingFiles: false,
    error: {
        UPLOAD_FILES: false,
        DOWNLOAD_FILE: false,
        CREATE_FILE: false,
        UPDATE_FILE: false,
        PASTE_ITEMS: false,
        DELETE_ITEMS: false,
        FETCH_IDPS: false,
        FETCH_CURRENT_ITEM: false,
        FETCH_CURRENT_ACCESS_CONTROL: false,
        TOGGLE_ACCESS_MODE: false,
    },
    currentPath: null,
    rootUrl: null,
    currentItem: null,
    fileHierarchy: [],
    notifications: null,
    selectedItems: [],
    selectionMode: false,
    clipboard: [],
    loadPaste: false,
    idps: null,
    isRenameWindowVisible: false,
    renamedItem: null,
    isCreateFileVisible: false,
    isCreateFolderVisible: false,
    isConsentWindowVisible: false,
    creatingFile: false,
    creatingFolder: false,
    isSearchBarExpanded: false,
    isDriveMenuVisible: false,
    isErrorWindowVisible: false,
    isAccessWindowVisible: false,
    isInfoWindowVisible: false,
    errorWindowError: null,
    managingAccess: false,
    managingAccessFor: null,
};

export default (state = INITIAL_STATE, action) => {
    const { payload, type } = action;
    console.log('App Reducer got action: ', type, '\nValue: ', payload);
    console.log(state);

    switch (type) {
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                rootUrl: payload.storage
                    ? payload.storage
                    : getRootFromWebId(payload.webId),
            };
        case CLEAR_ERROR:
            return { ...state, error: INITIAL_STATE.error };
        case SET_CURRENT_CONTACT:
            return { ...state, isSearchBarExpanded: false };
        case SET_STORAGE_URL_SUCCESS:
            return { ...state, rootUrl: payload };
        case SET_CURRENT_PATH:
            return {
                ...state,
                currentPath: payload,
                isSearchBarExpanded: false,
            };
        case SET_SELECTION:
            return {
                ...state,
                selectedItems: payload,
                selectionMode:
                    !payload || (payload && payload.length === 0)
                        ? false
                        : state.selectionMode,
            };
        case TOGGLE_SELECTION_MODE:
            return { ...state, selectionMode: !state.selectionMode };
        case DEEP_FETCH_CURRENT_ITEM:
            return {
                ...state,
                deepFetchCurrentItem: true,
                error: {
                    ...state.error,

                    DEEP_FETCH_CURRENT_ITEM: false,
                },
            };
        case DEEP_FETCH_CURRENT_ITEM_SUCCESS:
            return {
                ...state,
                fileHierarchy: payload,
                deepFetchCurrentItem: false,
                error: {
                    ...state.error,
                    FETCH_CURRENT_ITEM: false,
                },
            };
        case DEEP_FETCH_CURRENT_ITEM_FAILURE:
            return {
                ...state,
                deepFetchCurrentItem: false,
                error: {
                    ...state.error,
                    DEEP_FETCH_CURRENT_ITEM: false,
                },
            };
        case FETCH_CURRENT_ITEM:
            return {
                ...state,
                loadCurrentItem: true,
                error: { ...state.error, FETCH_CURRENT_ITEM: false },
            };
        case FETCH_CURRENT_ITEM_SUCCESS:
            return {
                ...state,
                loadCurrentItem: false,
                currentItem: payload,
                error: {
                    ...state.error,
                    FETCH_CURRENT_ITEM: false,
                },
            };
        case FETCH_CURRENT_ITEM_FAILURE:
            return {
                ...state,
                loadCurrentItem: false,
                error: { ...state.error, FETCH_CURRENT_ITEM: payload },
            };
        case FETCH_CURRENT_ACCESS_CONTROL:
            return {
                ...state,
                loadCurrentAccessControl: true,
                error: { ...state.error, FETCH_CURRENT_ACCESS_CONTROL: false },
            };
        case FETCH_CURRENT_ACCESS_CONTROL_SUCCESS:
            return {
                ...state,
                loadCurrentAccessControl: false,
                currentAccessControl: payload.accessControl,
                defaultAclResource: payload.defaultAclResource,
                error: {
                    ...state.error,
                    FETCH_CURRENT_ACCESS_CONTROL: false,
                },
            };
        case FETCH_CURRENT_ACCESS_CONTROL_FAILURE:
            return {
                ...state,
                loadCurrentAccessControl: false,
                currentAccessControl: null,
            };
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
            return {
                ...state,
                loadIdps: true,
                error: { ...state.error, FETCH_IDPS: false },
            };
        case FETCH_IDPS_SUCCESS:
            return {
                ...state,
                idps: payload,
                loadIdps: false,
                error: { ...state.error, FETCH_IDPS: false },
            };
        case FETCH_IDPS_FAILURE:
            return {
                ...state,
                loadIdps: false,
                error: { ...state.error, FETCH_IDPS: payload },
            };
        case OPEN_CONSENT_WINDOW:
            return { ...state, isConsentWindowVisible: true };
        case CLOSE_CONSENT_WINDOW:
            return { ...state, isConsentWindowVisible: false };
        case DELETE_ITEMS:
            return {
                ...state,
                loadDeletion: true,
                error: { ...state.error, DELETE_ITEMS: false },
            };
        case DELETE_ITEMS_SUCCESS:
            return {
                ...state,
                loadDeletion: false,
                error: { ...state.error, DELETE_ITEMS: false },
            };
        case DELETE_ITEMS_FAILURE:
            return {
                ...state,
                loadDeletion: false,
                error: { ...state.error, DELETE_ITEMS: payload },
            };
        case COPY_ITEMS:
            return { ...state, clipboard: payload };
        case PASTE_ITEMS:
            return {
                ...state,
                loadPaste: true,
                error: { ...state.error, PASTE_ITEMS: false },
            };
        case PASTE_ITEMS_SUCCESS:
            return {
                ...state,
                loadPaste: false,
                error: { ...state.error, PASTE_ITEMS: false },
            };
        case PASTE_ITEMS_FAILURE:
            return {
                ...state,
                loadPaste: false,
                error: { ...state.error, PASTE_ITEMS: payload },
            };
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
        case TOGGLE_DRIVE_MENU:
            return {
                ...state,
                isDriveMenuVisible: !state.isDriveMenuVisible,
            };
        case RENAME_ITEM:
            return {
                ...state,
                renamingItem: true,
                error: { ...state.error, RENAME_ITEM: false },
            };
        case RENAME_ITEM_SUCCESS:
            return {
                ...state,
                renamingItem: false,
                error: { ...state.error, RENAME_ITEM: false },
            };
        case RENAME_ITEM_FAILURE:
            return {
                ...state,
                renamingItem: false,
                error: { ...state.error, RENAME_ITEM: payload },
            };
        case UPDATE_FILE:
            return {
                ...state,
                updatingFile: true,
                error: { ...state.error, UPDATE_FILE: false },
            };
        case UPDATE_FILE_SUCCESS:
            return {
                ...state,
                updatingFile: false,
                currentItem: payload,
                error: { ...state.error, UPDATE_FILE: false },
            };
        case UPDATE_FILE_FAILURE:
            return {
                ...state,
                updatingFile: false,
                error: { ...state.error, UPDATE_FILE: payload },
            };
        case OPEN_CREATE_FILE_WINDOW:
            return { ...state, isCreateFileVisible: true };
        case CLOSE_CREATE_FILE_WINDOW:
            return { ...state, isCreateFileVisible: false };
        case CREATE_FILE:
            return {
                ...state,
                creatingFile: true,
                error: { ...state.error, CREATE_FILE: false },
            };
        case CREATE_FILE_SUCCESS:
            return {
                ...state,
                creatingFile: false,
                error: { ...state.error, CREATE_FILE: false },
            };
        case CREATE_FILE_FAILURE:
            return {
                ...state,
                creatingFile: false,
                error: { ...state.error, CREATE_FILE: payload },
            };
        case DOWNLOAD_FILE:
            return {
                ...state,
                downloadingFile: true,
                error: { ...state.error, DOWNLOAD_FILE: false },
            };
        case DOWNLOAD_FILE_SUCCESS:
            return {
                ...state,
                downloadingFile: false,
                error: { ...state.error, DOWNLOAD_FILE: false },
            };
        case DOWNLOAD_FILE_FAILURE:
            return {
                ...state,
                downloadingFile: false,
                error: { ...state.error, DOWNLOAD_FILE: payload },
            };
        case UPLOAD_FILE:
            return {
                ...state,
                uploadingFiles: true,
                error: { ...state.error, UPLOAD_FILES: false },
            };
        case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                uploadingFiles: false,
                error: { ...state.error, UPLOAD_FILES: false },
            };
        case UPLOAD_FILE_FAILURE:
            return {
                ...state,
                uploadingFiles: false,
                error: { ...state.error, UPLOAD_FILES: payload },
            };
        case OPEN_CREATE_FOLDER_WINDOW:
            return { ...state, isCreateFolderVisible: true };
        case CLOSE_CREATE_FOLDER_WINDOW:
            return { ...state, isCreateFolderVisible: false };
        case CREATE_FOLDER:
            return { ...state, creatingFolder: true };
        case CREATE_FOLDER_SUCCESS:
            return { ...state, creatingFolder: false };
        case CREATE_FOLDER_FAILURE:
            return { ...state, creatingFolder: false };
        case TOGGLE_ACCESS_MODE:
            return {
                ...state,
                managingAccess: true,
                managingAccessFor: payload,
            };
        case TOGGLE_ACCESS_MODE_SUCCESS:
            return { ...state, managingAccess: false, managingAccessFor: null };
        case TOGGLE_ACCESS_MODE_FAILURE:
            return {
                ...state,
                managingAccess: false,
                managingAccessFor: null,
                error: { ...state.error, TOGGLE_ACCESS_MODE: payload },
            };
        case TOGGLE_SEARCHBAR:
            return {
                ...state,
                isSearchBarExpanded: !state.isSearchBarExpanded,
            };
        case TOGGLE_ERROR_WINDOW:
            return {
                ...state,
                isErrorWindowVisible: !state.isErrorWindowVisible,
                errorWindowError: payload,
            };
        case TOGGLE_ACCESS_WINDOW:
            return {
                ...state,
                isAccessWindowVisible: !state.isAccessWindowVisible,
            };
        case TOGGLE_INFO_WINDOW:
            return {
                ...state,
                isInfoWindowVisible: !state.isInfoWindowVisible,
            };
        default:
            return state;
    }
};
