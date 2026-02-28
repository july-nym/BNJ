const { defineConfig } = require("cypress");
const dotenv = require("dotenv");
dotenv.config();

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    experimentalSessionAndOrigin: true,
    experimentalModifyObstructiveThirdPartyCode: true, // Prevents infinite redirect loops
    baseUrl: process.env.CYPRESS_BASE_URL,

    env: {
      loginEmail: process.env.CYPRESS_LOGIN_EMAIL,
      loginPassword: process.env.CYPRESS_LOGIN_PASSWORD,
    },
  },
});
