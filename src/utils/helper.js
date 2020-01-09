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

const getErrorsFromErrorState = (errors) => {
    const errorArray = [];
    if (typeof errors !== 'object') {
        return errorArray;
    }
    const keys = Object.keys(errors);
    console.log('keys', keys);
    console.log('errors', errors);
    for (let i = 0; i < keys.length; i++) {
        if (errors[keys[i]] !== false) {
            errorArray.push(errors[keys[i]]);
        }
    }
    return errorArray;
};

const convertArrayToString = (array) => {
    let arrayString = '';
    for (let i = 0; i < array.length; i++) {
        arrayString += array[i] + '\n';
        console.log('arrayString', arrayString);
    }
    return arrayString;
};

export { isCmdPressed, getErrorsFromErrorState, convertArrayToString };
