import {
    FETCH_APPS,
    FETCH_APPS_SUCCESS,
    FETCH_APPS_FAILURE,
    REMOVE_APP,
    REMOVE_APP_SUCCESS,
    REMOVE_APP_FAILURE,
} from './types';
import { logout } from './userActions';
import User from 'ownuser';

export const fetchApps = (webId) => {
    return (dispatch) => {
        dispatch({ type: FETCH_APPS });
        const user = new User(webId);
        user.getApps()
            .then((apps) => {
                dispatch({ type: FETCH_APPS_SUCCESS, payload: apps });
            })
            .catch((error) =>
                dispatch({ type: FETCH_APPS_FAILURE, payload: error })
            );
    };
};

export const removeApp = (apptoDelete, isDriveApp) => {
    return (dispatch, getState) => {
        dispatch({ type: REMOVE_APP });
        const { webId } = getState().user;
        const { apps } = getState().userApps;
        const newApps = apps.filter((app) => app !== apptoDelete);
        const user = new User(webId);
        user.setApps(newApps)
            .then(() => {
                dispatch({ type: REMOVE_APP_SUCCESS, payload: newApps });
                if (isDriveApp) {
                    dispatch(logout());
                }
            })
            .catch((error) =>
                dispatch({ type: REMOVE_APP_FAILURE, payload: error })
            );
    };
};
