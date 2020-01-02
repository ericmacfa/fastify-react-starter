const axios = require('axios');
const qs = require('querystring');
const { AuthenticationClient } = require('auth0');

module.exports = ({ appUrl, domain, clientId, clientSecret }) => ({
    getUserTokens: function(code) {
        const requestConfig = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
        const requestBody = qs.stringify({
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: appUrl
        });

        return axios.post(`https://${domain}/oauth/token`, requestBody, requestConfig);
    },

    getUserInfo: function(access_token) {
        const auth0 = new AuthenticationClient({
            domain,
            clientId
        });

        return auth0.users.getInfo(access_token);
    }
});
