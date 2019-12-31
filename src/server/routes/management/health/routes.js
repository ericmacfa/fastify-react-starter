const { getHealth } = require('./handlers');

// TODO: convert to using fastify.register() and setting the route prefix (then add prefixTrailingSlash to these route configs)
const routes = [
    {
        method: 'GET',
        url: '',
        handler: getHealth
    },
    {
        method: 'GET',
        url: '/',
        handler: getHealth
    }
];

module.exports = routes;
