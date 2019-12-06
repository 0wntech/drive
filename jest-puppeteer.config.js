module.exports = {
    launch: {
        headless: process.env.NODE_ENV === '',
        slowMo: 100,
        userDataDir: './user_data',
        defaultViewport: {
            width: 1920,
            height: 1024,
        },
    },
};
