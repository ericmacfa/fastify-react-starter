const { configureDecorators } = require('./decorators');
const { configureHooks } = require('./hooks');
const { configurePlugins } = require('./plugins');
const { configureServeWebapp } = require('./serveWebapp');
const { configureSso } = require('./sso');

module.exports = {
    configureDecorators,
    configureHooks,
    configurePlugins,
    configureServeWebapp,
    configureSso
};
