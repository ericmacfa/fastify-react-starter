const webpack = require('webpack');
const commonLoaders = require('./common.loaders');
const commonPlugins = require('./common.plugins');
const baseConfig = require('./common.config');

module.exports = Object.assign(baseConfig, {
    mode: 'production',
    module: {
        rules: [...commonLoaders]
    },
    optimization: {
        minimize: true,
        nodeEnv: 'production'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        ...commonPlugins
    ]
});
