import { CLEAR_ERROR } from '../actions/types';
import { getUsernameFromWebId } from './url';

const isCmdPressed = (event) => {
    // return if strg(windows/linux) or cmd(mac) is pressed as
    return (
        event.metaKey ||
        event.keyCode === 17 ||
        event.keyCode === 91 ||
        event.keyCode === 93 ||
        event.keyCode === 224 ||
        event.ctrlKey
    );
};

const getInitialsFromUser = (user) => {
    const names = user.name
        ? user.name.split(' ')
        : [getUsernameFromWebId(user.webId)];
    return names.length > 1
        ? names[0][0] + names[1][0].toLowerCase()
        : names[0].length > 1
        ? names[0][0].toUpperCase() + names[0][1].toLowerCase()
        : names[0][0].toUpperCase();
};

const getErrorsFromErrorState = (errors) => {
    const errorArray = [];
    if (typeof errors !== 'object') {
        return errorArray;
    }
    const keys = Object.keys(errors);
    for (let i = 0; i < keys.length; i++) {
        if (errors[keys[i]] !== false) {
            errorArray.push(errors[keys[i]]);
        }
    }
    return errorArray;
};

const handleError = (errors) => {
    // accepts an object containing errors
    // { errorName: error}
    const error = getErrorsFromErrorState(errors)[0];
    if (error && error.response) {
        if (error.response.status === 403) {
            throw new Error('You are not authorized to access this resource');
        }
    } else if (error) {
        throw new Error(error);
    }
};

const navigate = (to, history, dispatch, onNavigate) => {
    dispatch({ type: CLEAR_ERROR });
    if (onNavigate) onNavigate();
    history.push(to);
};

export {
    isCmdPressed,
    getErrorsFromErrorState,
    handleError,
    navigate,
    getInitialsFromUser,
};
