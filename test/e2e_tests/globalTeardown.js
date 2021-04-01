const PodClient = require('ownfiles').default;
const { teardown: teardownPuppeteer } = require('jest-environment-puppeteer');

const { cleanUp, login } = require('./utils');

module.exports = async function globalTeardown(globalConfig) {
    await teardownPuppeteer(globalConfig);
    // Your global teardown
    const podClient = new PodClient();
    const client = await login();
    podClient.fetcher._fetch = client.fetch.bind(client);
    await cleanUp(podClient);
    console.log('Finished teardown...');
};
