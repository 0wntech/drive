require('dotenv').config();

export const launchConfig = {
    headless: false,
    slowMo: 0,
    defaultViewport: {
        width: 1920,
        height: 1024,
    },
    userDataDir: './user-data',
};

export const testServerUrl = 'http://localhost:3001';
