require('dotenv').config();

export const launchConfig = {
    headless: !!process.env.TRAVIS_PULL_REQUEST,
    slowMo: 0,
    defaultViewport: {
        width: 1920,
        height: 1024,
    },
    userDataDir: './user-data',
};

export const testServerUrl = 'http://localhost:3000';
