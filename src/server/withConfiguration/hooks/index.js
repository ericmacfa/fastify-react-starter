const configureHooks = (app) => {
    app.addHook('onError', function(request, reply, error, next) {
        console.log(error);
        next();
    });
};

module.exports = { configureHooks };
