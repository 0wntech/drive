import { FETCH_APPS, FETCH_APPS_SUCCESS, FETCH_APPS_FAILURE } from './types';
import User from 'ownuser';

// setApp([urls of apps])
// { getApps, setApps }
export const fetchApps = (webId) => {
    return (dispatch) => {
        dispatch({ type: FETCH_APPS });
        const user = new User(webId);
        user.getApps()
            .then((apps) => {
                console.log(apps);
                dispatch({ type: FETCH_APPS_SUCCESS, payload: apps });
            })
            .catch((error) =>
                dispatch({ type: FETCH_APPS_FAILURE, payload: error })
            );
    };
};
