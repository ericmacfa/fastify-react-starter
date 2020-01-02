const config = require('config');
const fastifyStatic = require('fastify-static');
const fs = require('fs');
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
        wildcard: false,
        root: buildLocation
    });

    app.get(`${config.get('contextRoot')}/*`, (request, response, next) => {
        response.type('text/html').send(fs.readFileSync(path.resolve(buildLocation, 'index.html')));
    });
};

module.exports = { withProductionConfig };
