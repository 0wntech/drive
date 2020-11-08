const PodClient = require('ownfiles').default;
const auth = require('solid-node-client');
const { teardown: teardownPuppeteer } = require('jest-environment-puppeteer');

const { cleanUp, login } = require('./utils');

module.exports = async function globalTeardown(globalConfig) {
    await teardownPuppeteer(globalConfig);
    // Your global teardown
    const podClient = new PodClient();
    await login();
    podClient.fetcher._fetch = auth.fetch;
    await cleanUp(podClient);
    console.log('Finished teardown...');
};
