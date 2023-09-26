// Import the parent configuration file
var defaults = require("./wdio-bstack.conf.js");
var _ = require("lodash");

var overrides = {
  // The tests that you want to run
  specs: [
    "./tests/specs/e2e.spec.js"
  ],

  // An array of capabilities for the devices you want to test against.
  capabilities: [
    {
      maxInstances: 1,
      device: "iPhone 14",
      os_version: "16.0",
      app: "Duke_Sample_App",
      autoGrantPermissions: true,
      realMobile: true,
      platformName: "iOS",
    },
  ],
};

// Merging this config with the parent config (NOTE: no need to interact with this at any point)
const tmpConfig = _.defaultsDeep(overrides, defaults.config);

tmpConfig.capabilities.forEach((caps) => {
  for (const i in tmpConfig.commonCapabilities)
    caps[i] = caps[i] || tmpConfig.commonCapabilities[i];
});

exports.config = tmpConfig;
