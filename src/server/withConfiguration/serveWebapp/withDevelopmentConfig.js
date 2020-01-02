const config = require('config');
const path = require('path');

const withDevelopmentConfig = (app) => {
    // Encapsulate require()s since these dependencies do not exist when running in production mode
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const webpackDevConfig = require('../../../../config/webpack/hmr.config');

    const webpackCompiler = webpack(webpackDevConfig);
    const devMiddleware = webpackDevMiddleware(webpackCompiler);
    const hotMiddleware = webpackHotMiddleware(webpackCompiler, {});

    // Run Webpack from Fastify
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

    // Handle react-router routes
    app.get(`${config.get('contextRoot')}/*`, function(request, response) {
        const indexPath = path.join(webpackDevConfig.output.path, 'index.html');
        const index = devMiddleware.fileSystem.readFileSync(indexPath);

        response.type('text/html').send(index);
    });
};

module.exports = { withDevelopmentConfig };
