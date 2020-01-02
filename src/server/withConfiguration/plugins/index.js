const config = require('config');
const fastifyCookie = require('fastify-cookie');
const fastifyFormBody = require('fastify-formbody');
const fastifySession = require('fastify-session');
const MemoryStore = require('memorystore')(fastifySession);
const ms = require('ms');

const configurePlugins = (app) => {
    const maxAge = config.get('sso.cookies.maxAge');

    app.register(fastifyFormBody);
    app.register(fastifyCookie);
    app.register(fastifySession, {
        cookieName: 'id',
        secret: config.get('sso.cookies.key'),
        sessionMaxAge: maxAge,
        cookie: {
            maxAge,
            // domain: '.example.com',
            path: '/',
            secure: true,
            httpOnly: true,
            sameSite: true
        },
        store: new MemoryStore({
            checkPeriod: ms('1 minute'),
            ttl: maxAge
        })
    });
};

module.exports = { configurePlugins };
