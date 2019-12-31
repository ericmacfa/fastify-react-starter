const config = require('config');
const { withDevelopmentConfig } = require('./withDevelopmentConfig');
const { withProductionConfig } = require('./withProductionConfig');

const configureServeWebapp = (app, handleAuthentication) => {
    if (config.get('appEnv') === 'local' && process.env.DISABLE_HMR !== 'true') {
        // Webpack HMR
        // return withDevelopmentConfig(app, handleAuthentication);
        return withDevelopmentConfig(app);
    } else {
        // Serve static bundle
        // return withProductionConfig(app, handleAuthentication);
        return withProductionConfig(app);
    }
};

module.exports = { configureServeWebapp };
