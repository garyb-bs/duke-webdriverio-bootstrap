var defaults = require("./wdio.conf.js");
var _ = require("lodash");

var overrides = {
  onBrowserstack: true,
  
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  
  commonCapabilities: {
    "browserstack.debug": true,
    name : require("minimist")(process.argv.slice(2))["bstack-session-name"] || "default_name",
    build: process.env.BROWSERSTACK_BUILD_NAME || "browserstack-examples-appium-webdriverio" + " - " + new Date().getTime(),
    project: "browserstack-examples-appium-webdriverio",    
  },

  services: ["browserstack"],

  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    if (require("minimist")(process.argv.slice(2))["bstack-session-name"]) {
      await driver.executeScript(
        'browserstack_executor: {"action": "setSessionName", "arguments": {"name":"' +
          require("minimist")(process.argv.slice(2))["bstack-session-name"] +
          '" }}',
        []
      );
    } else {
      await driver.executeScript(
        'browserstack_executor: {"action": "setSessionName", "arguments": {"name":"' +
          test.title +
          '" }}',
        []
      );
    }

    if (passed) {
      await driver.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}',
        []
      );
    } else {
      const reason = error
        .toString()
        .replace(/[^a-zA-Z0-9.]/g, " ")
        .substring(0, 255);
      await driver.takeScreenshot();
      await driver.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "' +
          reason +
          '"}}',
        []
      );
    }
  },
};

exports.config = _.defaultsDeep(overrides, defaults.config);
