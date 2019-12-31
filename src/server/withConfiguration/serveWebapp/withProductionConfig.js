const config = require('config');
const fastifyStatic = require('fastify-static');

const path = require('path');

const withProductionConfig = (app) => {
    const buildLocation = path.join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        `/www-${config.get('appEnv')}`
    );

    app.register(fastifyStatic, {
        root: buildLocation
    });
};

module.exports = { withProductionConfig };
