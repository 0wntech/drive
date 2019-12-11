const path = require('path');

module.exports = {
    launch: {
        headless: true,
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
        host: 'localhost',
        port: 3000,
        usedPortAction: 'ignore',
    },
};
