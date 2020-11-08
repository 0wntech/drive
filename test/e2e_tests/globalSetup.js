const PodClient = require('ownfiles').default;
const auth = require('solid-node-client');
const { setup: setupPuppeteer } = require('jest-environment-puppeteer');

const config = require('./testConfig.json');
const { cleanUp, login } = require('./utils');

module.exports = async function globalSetup(globalConfig) {
    await setupPuppeteer(globalConfig);
    // Your global setup
    const session = await login();
    console.log('Running e2e tests as ' + session.webId);
    const podClient = new PodClient();
    podClient.fetcher._fetch = auth.fetch;
    await cleanUp(podClient);
    await podClient.create(config.rootUrl + 'test/');
    await podClient.create(config.rootUrl + 'test.txt');
    await podClient.create(config.rootUrl + 'test.ttl');
    console.log('Finished setup...');
};
