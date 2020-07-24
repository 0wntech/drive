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
        : names[0][0] + names[0][1].toLowerCase();
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

const convertArrayToString = (array) => {
    if (!Array.isArray(array)) {
        return undefined;
    }
    const arrayString = array.join('\n');
    return arrayString;
};

const handleError = (error) => {
    // accepts an object containing errors
    // { errorName: error}
    const errors = getErrorsFromErrorState(error);
    if (errors.length > 0) {
        throw new Error(convertArrayToString(errors));
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
    convertArrayToString,
    handleError,
    navigate,
    getInitialsFromUser,
};
