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
    updateProfile: false,
    updateProfileError: false,
    updateProfilePic: false,
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
        default:
            return state;
    }
};
