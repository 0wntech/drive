module.exports = (api) => {
    const isTest = api.env('test');
    return isTest
        ? {
              presets: [
                  ['@babel/preset-env', { targets: { node: 'current' } }],
              ],
          }
        : { presets: ['@babel/env', '@babel/react'] };
};
