// TODO: Update webpack to use mini-css-extract-plugin, then use fastify-webpack-hmr
const withDevelopmentConfig = app => {
    // Encapsulate require()s since these dependencies do not exist when running in production mode
    const history = require('connect-history-api-fallback');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackDevConfig = require('../../../../config/webpack/hmr.config');

    const webpackCompiler = webpack(webpackDevConfig);
    const devMiddleware = webpackDevMiddleware(webpackCompiler, {
        publicPath: webpackDevConfig.output.publicPath
    });
    const hotMiddleware = webpackHotMiddleware(webpackCompiler, {});

    app.use(history());

    // Run Webpack from Express
    app.use(devMiddleware);

    // Only recompile what changed
    app.use(hotMiddleware);

    app.decorate('webpack', {
        webpackCompiler,
        devMiddleware,
        hotMiddleware
    }).addHook('onClose', (instance, next) => {
        instance.webpack.devMiddleware.close(() => next);
    });
};

module.exports = { withDevelopmentConfig };
