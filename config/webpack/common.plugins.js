const baseConfig = require('./common.config');
const config = require('config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = [
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false // Enable to remove warnings about conflicting order
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
];
