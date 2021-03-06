const baseConfig = require('./common.config');
const commonLoaders = require('./common.loaders');
const commonPlugins = require('./common.plugins');

module.exports = Object.assign(baseConfig, {
    mode: 'development',
    devtool: 'inline-cheap-module-source-map',
    module: {
        rules: [...commonLoaders]
    },
    plugins: [...commonPlugins]
});
