// require('babel-polyfill');

const { join, resolve } = require('path');
const { contextRoot } = require('config');
const contextPath = resolve(__dirname, '..', '..', 'src', 'client');
const outputPath = resolve(__dirname, '..', '..', 'www');

module.exports = {
    context: contextPath,
    // entry: ['babel-polyfill', './main.jsx'],
    entry: ['./index.jsx'],
    output: {
        path: outputPath,
        publicPath: `${contextRoot}/`,
        filename: '[name].bundle.js'
    },
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all'
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [process.env.NODE_PATH || join(__dirname, '..', '..', 'node_modules')],
        alias: {
            // for each alias add a key to moduleNameMapper object inside jest.json
            // '@components': resolve(contextPath, 'components'),
            // '@constants': resolve(contextPath, 'constants'),
            // '@redux': resolve(contextPath, 'redux')
        }
    }
};
