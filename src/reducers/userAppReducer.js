import {
    FETCH_APPS,
    FETCH_APPS_SUCCESS,
    FETCH_APPS_FAILURE,
    REMOVE_APP,
    REMOVE_APP_SUCCESS,
    REMOVE_APP_FAILURE,
    CLEAR_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
    apps: null,
    loadApps: false,
    error: {
        FETCH_APPS_FAILURE: false,
        REMOVE_APP_FAILURE: false,
    },
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case CLEAR_ERROR:
            return { ...state, error: INITIAL_STATE.error };
        case FETCH_APPS:
            return {
                ...state,
                loadApps: true,
                error: { ...state.error, FETCH_APPS_FAILURE: false },
            };
        case FETCH_APPS_SUCCESS:
            return {
                ...state,
                apps: payload,
                loadApps: false,
            };
        case FETCH_APPS_FAILURE:
            return {
                ...state,
                loadApps: false,
                error: { ...state.error, FETCH_APPS_FAILURE: payload },
            };
        case REMOVE_APP:
            return {
                ...state,
                loadApps: true,
                error: { ...state.error, REMOVE_APP: false },
            };
        case REMOVE_APP_SUCCESS:
            return { ...state, loadApps: false, apps: payload };
        case REMOVE_APP_FAILURE:
            return {
                ...state,
                loadApps: false,
                error: { ...state.error, REMOVE_APP: payload },
            };
        default:
            return state;
    }
};
