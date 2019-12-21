const path = require('path');

module.exports = {
    launch: {
        headless: false,
        slowMo: 20,
        defaultViewport: {
            width: 1920,
            height: 1024,
        },
        // fix for chromium bug
        args: [`--user-data-dir=${path.resolve(__dirname, 'user-data')}`],
    },
    server: {
        command: 'BROWSER=none npm start',
        port: 3001,
        launchTimeout: 15000,
        usedPortAction: 'ignore',
    },
};
