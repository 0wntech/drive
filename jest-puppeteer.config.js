module.exports = {
    launch: {
        headless: false,
        slowMo: 100,
        userDataDir: './user_data',
        defaultViewport: {
            width: 1920,
            height: 1024,
        },
    },
    server: {
        command: 'BROWSER=none npm start',
        port: '3000',
        usedPortAction: 'ignore',
    },
};
