const path = require('path');
const hello = require('./hello');
const { combineArrays, addPrefixToRoutes } = require('../../utils');

const allRoutes = combineArrays(hello);
const allRoutesWithPrefix = addPrefixToRoutes(`/${path.basename(__dirname)}`, allRoutes);

module.exports = allRoutesWithPrefix;
