Cypress.Commands.add('azureLogin', () => {
    cy.session('azureLogin', () => {
        cy.env(['tenant_id', 'client_id', 'client_secret', 'username', 'password', 'scope']).then((env) => {
            const { tenant_id, client_id, client_secret, username, password, scope } = env;

            if (!tenant_id) {
                throw new Error('tenant_id is undefined');
            }

            cy.request({
                method: 'POST',
                url: `https://login.microsoftonline.com/1d668e27-c3ce-441b-8243-c41af2f40f6d/oauth2/v2.0/authorize?client_id=7db4febe-61db-461b-b86b-768ceb8a629a&scope=User.Read+openid+profile+offline_access&redirect_uri=https%3a%2f%2fweb-bnj-ai-dev-8fdaab.azurewebsites.net&client-request-id=019ca222-e4f8-7da3-a12e-09a6e7a0491f&response_mode=fragment&client_info=1&nonce=019ca222-e4f8-7fee-9971-f98aaaa121ee&state=eyJpZCI6IjAxOWNhMjIyLWU0ZjgtNzgyNy1hZTJmLWM3ZjM0NzhmMDRlYyIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3d&x-client-SKU=msal.js.browser&x-client-VER=4.27.0&response_type=code&code_challenge=pNd8XrS7QSZRX9K6jddOx41rR_dqDfEgDp4DaUYZ8Bo&code_challenge_method=S256&sso_reload=true&sso_nonce=AwABEgEAAAADAOz_BQD0_0V2b1N0c0FydGlmYWN0cwUAAAAAAOPa80U-c73x59BrSdcNouM0biFZpF6Z7WVJenY7TgI9uVbQtwvkfI31h5oj8eIUSriH7jnz7afahl59eRw6eRIgAA&mscrid=019ca222-e4f8-7da3-a12e-09a6e7a0491f`,
                form: true,
                body: {
                    grant_type: 'password',
                    client_id,
                    client_secret,
                    scope,
                    username,
                    password,
                },
            }).then((resp) => {
                window.localStorage.setItem('access_token', resp.body.access_token);
            });
        });
    });
});
