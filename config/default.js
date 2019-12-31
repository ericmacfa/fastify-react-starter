const ms = require('ms');

module.exports = {
    appEnv: 'local',
    appUrl: 'https://localhost:3000',
    contextRoot: '',
    server: {
        logger: false,
        ports: {
            http2: 3000
        },
        ssl: {
            certificate: 'certs/app-local.crt',
            key: 'certs/app-local.key'
        }
    },
    sso: {
        cookieMaxAge: ms('5 minutes'),
        cookieKey: 'fake-cookie-key-this-should-be-replaced-with-a-secret!',
        auth0: {
            callbackUrl: 'https://localhost:3000/auth0/callback',
            domain: 'replaced by custom-environment-variables.json',
            clientId: 'replaced by custom-environment-variables.json',
            clientSecret: 'replaced by custom-environment-variables.json'
        }
    }
};
