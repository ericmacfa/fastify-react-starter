const path = require('path');
const routes = require('./routes');

module.exports = routes.map(route => ({
    ...route,
    url: `/${path.basename(__dirname)}` + route.url
}));
