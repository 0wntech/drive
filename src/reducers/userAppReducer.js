import {
    FETCH_APPS,
    FETCH_APPS_SUCCESS,
    FETCH_APPS_FAILURE,
    REMOVE_APP,
    REMOVE_APP_SUCCESS,
    REMOVE_APP_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
    apps: null,
    loadApps: false,
    error: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case FETCH_APPS:
            return { ...state, loadApps: true };
        case FETCH_APPS_SUCCESS:
            return { ...state, apps: payload, loadApps: false };
        case FETCH_APPS_FAILURE:
            return { ...state, loadApps: false, error: payload };
        case REMOVE_APP:
            return { ...state, loadApps: true };
        case REMOVE_APP_SUCCESS:
            return { ...state, loadApps: false, apps: payload };
        case REMOVE_APP_FAILURE:
            return { ...state, loadApps: false, error: payload };
        default:
            return state;
    }
};
