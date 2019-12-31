const api = require('./api');
const management = require('./management');
const { combineArrays } = require('../utils');

const allRoutes = combineArrays(management, api);

module.exports = allRoutes;
