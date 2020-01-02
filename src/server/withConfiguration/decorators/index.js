const rootDecorators = {
    isAuthenticated: async function({ access_token, id_token }) {
        if (!access_token || !id_token) {
            return { message: 'Missing access_token or id_token' };
        }
        const tokenError = null;
        // const tokenError = await this.validateNmJwt(id_token);

        return tokenError;
    }
};

const requestDecorators = {
    setSessionTokens: function(tokens) {
        this.session.tokens = tokens;
    },
    getSessionTokens: function() {
        return this.session && this.session.tokens ? this.session.tokens : {};
    },
    setRedirectedFrom: function(url) {
        this.session.redirectedFrom = url;
    },
    getRedirectedFrom: function() {
        return this.session.redirectedFrom;
    },
    clearRedirectedFrom: function() {
        delete this.session.redirectedFrom;
    }
};

const responseDecorators = {
    startLogin: function() {
        this.redirect('/login');
    }
};

const configureDecorators = (app) => {
    // Decorators available via this.*
    for (const [name, handler] of Object.entries(rootDecorators)) {
        app.decorate(name, handler);
    }

    // Decorators available via request.*
    for (const [name, handler] of Object.entries(requestDecorators)) {
        app.decorateRequest(name, handler);
    }

    // Decorators available via reply.*
    for (const [name, handler] of Object.entries(responseDecorators)) {
        app.decorateReply(name, handler);
    }
};

module.exports = { configureDecorators };
