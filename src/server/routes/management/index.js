const path = require('path');
const health = require('./health');
const { combineArrays, addPrefixToRoutes } = require('../../utils');

const allRoutes = combineArrays(health);
const allRoutesWithPrefix = addPrefixToRoutes(`/${path.basename(__dirname)}`, allRoutes);

module.exports = allRoutesWithPrefix;
