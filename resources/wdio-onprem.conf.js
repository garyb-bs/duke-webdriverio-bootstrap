var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  port: 4723,
  path: '/',
  isSimulator: true,
  specs: ["./test/specs/e2e.spec.js"],

  capabilities: [
    {
      maxInstances: 1,
      device: "Google Pixel 5",
      os_version: "11.0",
      app: "bin/<androidAppName>",
      autoGrantPermissions: true,
      platformName: "Android",
    },
  ],

  services: ["appium"],
};

exports.config = _.defaultsDeep(overrides, defaults.config);
