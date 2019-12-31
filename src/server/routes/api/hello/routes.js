const { getHello } = require('./handlers');

const routes = [
    {
        method: 'GET',
        url: '',
        handler: getHello,
        requireAuthenticated: true
    },
    {
        method: 'GET',
        url: '/',
        handler: getHello,
        requireAuthenticated: true
    }
];

module.exports = routes;
