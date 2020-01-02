const config = require('config');
const fastify = require('fastify');
const fs = require('fs');
const routes = require('./routes');
const {
    configureDecorators,
    configureHooks,
    configurePlugins,
    configureServeWebapp,
    configureSso
} = require('./withConfiguration');

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
configurePlugins(app); // MUST be before SSO, since SSO requires sessions to be configured
configureSso(app);
configureDecorators(app);
configureHooks(app);
configureServeWebapp(app);

const checkAuthenticated = async function(request, reply, next) {
    const tokens = request.getSessionTokens();
    const tokenError = await this.isAuthenticated(tokens);

    if (tokenError) {
        reply.status(401).send('Not Authorized: please log in.');
    } else {
        next();
    }
};

// Register routes
for (const route of routes) {
    if (route.requireAuthenticated) {
        delete route.requireAuthenticated;
        if (route.preHandler) {
            route.preHandler = [checkAuthenticated, route.preHandler];
        } else {
            route.preHandler = checkAuthenticated;
        }
    }

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
