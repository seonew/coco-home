/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
require('dotenv').config();

module.exports = (on, config) => {
  config.env.accessToken = process.env.TEST_ACCESS_TOKEN;
  config.env.name = process.env.TEST_NAME;

  return config;
};
