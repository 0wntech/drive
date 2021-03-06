const path = require('path');

module.exports = {
    launch: {
        headless: true,
        slowMo: 10,
        defaultViewport: {
            width: 1920,
            height: 1024,
        },
        // fix for chromium bug
        args: [`--user-data-dir=${path.resolve(__dirname, 'user-data')}`],
    },
    server: {
        command: 'cross-env BROWSER=none PORT=3001 npm start',
        port: 3001,
        launchTimeout: 10000,
        usedPortAction: 'ignore',
    },
};
