const auth = require('solid-node-client');
const config = require('./testConfig.json');
require('dotenv').config();

exports.initPage = async (browser, config) => {
    const timeout = process.env.DRIVE_TIMEOUT || config.timeout;
    jest.setTimeout(timeout);
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(timeout);
    return page;
};

exports.login = async () => {
    const session = await auth.currentSession();
    if (!session) {
        return await auth.login();
    } else {
        return session;
    }
};

exports.cleanUp = (podClient) => {
    return new Promise(async (resolve, reject) => {
        const pod = await podClient.read(config.rootUrl, {
            headOnly: true,
        });
        const cleanUps = [];
        pod.folders.forEach((element) => {
            if (!config.rootFolder.folders.includes(element)) {
                cleanUps.push(podClient.delete(element));
            }
        });
        pod.files.forEach((element) => {
            if (!config.rootFolder.files.includes(element)) {
                cleanUps.push(podClient.delete(element));
            }
        });

        await Promise.all(cleanUps)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            });
    });
};
