const config = require('config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const baseConfig = require('./common.config');
const commonLoaders = require('./common.loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
        new ExtractTextPlugin('[name].bundle.[hash].css'),
        // Minify CSS
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new HtmlWebpackPlugin({
            title: 'Fastify React App',
            template: './template/index.ejs',
            favicon: './template/favicon.ico'
        }),
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify(baseConfig.output.publicPath),
            APP_URL: JSON.stringify(config.get('appUrl'))
        })
    ]
});
