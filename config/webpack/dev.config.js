const baseConfig = require('./common.config');
const commonLoaders = require('./common.loaders');
const config = require('config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = Object.assign(baseConfig, {
    mode: 'development',
    devtool: 'inline-cheap-module-source-map',
    module: {
        rules: [...commonLoaders]
    },
    plugins: [
        new ExtractTextPlugin('[name].bundle.[hash].css'),
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
