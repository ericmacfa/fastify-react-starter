const timeout = ms =>
    new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });

const combineArrays = (...arrays) =>
    arrays.reduce((combinedArray, nextArray) => combinedArray.concat(...nextArray), []);

const addPrefixToRoutes = (prefix, routes) =>
    routes.map(route => ({
        ...route,
        url: prefix + route.url
    }));

module.exports = { timeout, combineArrays, addPrefixToRoutes };
