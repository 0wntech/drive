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
    CLEAR_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
    webId: null,
    user: null,
    loadLogin: false,
    loadUser: false,
    session: null,
    updatingProfile: false,
    updatingProfilePic: false,
    error: {
        LOGIN: false,
        FETCH_USER: false,
        UPDATE_PROFILE: false,
        CHANGE_PROFILE_PHOTO: false,
    },
};

export default (state = INITIAL_STATE, action) => {
    const { payload, type } = action;
    console.log('User Reducer got action: ', type, '\nValue: ', payload);
    switch (type) {
        case CLEAR_ERROR:
            return { ...state, error: INITIAL_STATE.error };
        case LOGIN:
            return {
                ...state,
                loadLogin: true,
                error: { ...state.error, LOGIN: false },
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loadLogin: false,
                webId: payload.webId,
                session: payload,
                error: { ...state.error, LOGIN: false },
            };
        case LOGIN_FAIL:
            return {
                ...state,
                loadLogin: false,
                error: { ...state.error, LOGIN: payload },
            };
        case FETCH_USER:
            return {
                ...state,
                loadUser: true,
                error: { ...state.error, FETCH_USER: false },
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loadUser: false,
                user: payload,
                error: { ...state.error, FETCH_USER: false },
            };
        case FETCH_USER_FAIL:
            return {
                ...state,
                loadUser: false,
                error: { ...state.error, FETCH_USER: payload },
            };
        case SET_WEBID:
            return { ...state, webId: payload };
        case UPDATE_PROFILE:
            return {
                ...state,
                updatingProfile: true,
                updateProfileError: false,
                error: { ...state.error, UPDATE_PROFILE: false },
            };
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                updatingProfile: false,
                updateProfileError: false,
                error: { ...state.error, UPDATE_PROFILE: false },
            };
        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                updatingProfile: false,
                error: { ...state.error, UPDATE_PROFILE: payload },
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
