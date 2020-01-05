import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAIL,
    SET_WEBID,
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    CHANGE_PROFILE_PHOTO,
    CHANGE_PROFILE_PHOTO_SUCCESS,
    CHANGE_PROFILE_PHOTO_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
    webId: null,
    user: null,
    loadLogin: false,
    loadUser: false,
    session: null,
    updatingProfile: false,
    updateProfileError: false,
    updatingProfilePic: false,
    error: null,
};

export default (state = INITIAL_STATE, action) => {
    const { payload, type } = action;
    console.log('User Reducer got action: ', type, '\nValue: ', payload);
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
        case SET_WEBID:
            return { ...state, webId: payload };
        case UPDATE_PROFILE:
            return {
                ...state,
                updatingProfile: true,
                updateProfileError: false,
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                updatingProfile: false,
                updateProfileError: false,
            };
        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                updatingProfile: false,
                updateProfileError: true,
            };
        case CHANGE_PROFILE_PHOTO:
            return { ...state, updatingProfilePic: true };
        case CHANGE_PROFILE_PHOTO_SUCCESS:
            return { ...state, updatingProfilePic: false };
        case CHANGE_PROFILE_PHOTO_FAILURE:
            return { ...state, updatingProfilePic: false, error: payload };
        default:
            return state;
    }
};
