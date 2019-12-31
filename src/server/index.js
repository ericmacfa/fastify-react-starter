const config = require('config');
const fastify = require('fastify');
const fs = require('fs');
const routes = require('./routes');
const { configureServeWebapp } = require('./withConfiguration');

const app = fastify({
    logger: config.get('server.logger'),
    http2: true,
    https: {
        allowHTTP1: true, // fallback support for HTTP1
        cert: fs.readFileSync(config.get('server.ssl.certificate')),
        key: fs.readFileSync(config.get('server.ssl.key'))
    }
});

// Add configurations
app.setNotFoundHandler(function(request, reply) {
    reply.status(404).send('Not Found');
});

configureServeWebapp(app);

// Register routes
for (const route of routes) {
    app.route(route);
}

const start = async () => {
    try {
        const port = config.get('server.ports.http2');

        await app.listen(port, '0.0.0.0');
        console.log(`server listening on ${app.server.address().port}`); // Use this if instance logging is off
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

const runOrExport = () => {
    // https://nodejs.org/api/modules.html#modules_accessing_the_main_module
    const fileWasExecuted = require.main === module;

    if (fileWasExecuted) {
        start();
    } else {
        module.exports = app;
    }
};

runOrExport();
