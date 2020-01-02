const config = require('config');
const qs = require('querystring');
const helpers = require('./helpers');

const appUrl = config.get('appUrl');
const cookieMaxAge = config.get('sso.cookies.maxAge');
const auth0Domain = config.get('sso.auth0.domain');
const auth0ClientId = config.get('sso.auth0.clientId');
const auth0ClientSecret = config.get('sso.auth0.clientSecret');
const auth0CallbackUrl = config.get('sso.auth0.callbackUrl');
const auth0CallbackPath = new URL(auth0CallbackUrl).pathname;

const configureSso = (app) => {
    const auth0Helpers = helpers({
        appUrl,
        domain: auth0Domain,
        clientId: auth0ClientId,
        clientSecret: auth0ClientSecret
    });

    app.get('/error', async function(request, reply) {
        reply.send('An unknown error occurred...');
    });

    app.get('/login', async function(request, reply) {
        // TODO: set state parameter
        const scope = 'profile openid email offline_access';
        const query = qs.stringify({
            response_type: 'code',
            scope,
            client_id: auth0ClientId,
            redirect_uri: auth0CallbackUrl,
            connection: 'fastify-webapp-starter-cra-users'
        });
        const dialogUrl = `https://${auth0Domain}/authorize?${query}`;

        reply.redirect(dialogUrl);
    });

    app.get(auth0CallbackPath, async function(request, reply) {
        try {
            // TODO: validate the token authenticity
            const { data: userTokens } = await auth0Helpers.getUserTokens(request.query.code);
            const userInfo = await auth0Helpers.getUserInfo(userTokens.access_token);
            const clientUserInfo = {
                name: userInfo.name,
                nickname: userInfo.nickname,
                picture: userInfo.picture
            };

            request.session.userInfo = userInfo;
            request.setSessionTokens(userTokens);
            reply
                .setCookie('userInfo', JSON.stringify(clientUserInfo), {
                    path: '/',
                    sameSite: true,
                    secure: false,
                    maxAge: cookieMaxAge / 1000
                })
                .redirect('/'); // TODO: handle dynamic redirects?
        } catch (error) {
            console.log(error);
            request.setSessionTokens({});
            reply.redirect('/error');
        }
    });

    app.get('/check-auth', async function(request, reply) {
        const tokens = request.getSessionTokens();
        const tokenError = await this.isAuthenticated(tokens);

        if (tokenError) {
            reply.status(401).send(tokenError);
        } else {
            reply.send('OK');
        }
    });

    app.get('/logout', async function(request, reply) {
        const query = qs.stringify({
            client_id: auth0ClientId,
            returnTo: appUrl
        });
        const logoutUrl = `https://${auth0Domain}/v2/logout?${query}`;

        reply.redirect(logoutUrl);
    });
};

module.exports = { configureSso };
