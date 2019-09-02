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

export { isCmdPressed };
