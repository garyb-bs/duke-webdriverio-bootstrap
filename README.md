![Logo](https://www.browserstack.com/images/static/header-logo.jpg)

# BrowserStack Examples Appium WebdriverIO <a href="https://webdriver.io/"><img src="https://avatars.githubusercontent.com/u/72550141?s=48&v=4" alt="WebdriverIO" height="22" /></a> <a href="https://nodejs.org/en/"><img src="https://brandslogos.com/wp-content/uploads/images/large/nodejs-icon-logo.png" alt="nodejs" height="22" /></a> <a href="https://mochajs.org/"><img src="https://brandslogos.com/wp-content/uploads/images/large/mocha-logo.png" alt="mochs" height="22" /></a>

## Introduction

WebdriverIO is a progressive automation framework built to automate modern web and mobile applications. It simplifies the interaction with your app and provides a set of plugins that help you create a scalable, robust and flakiness test suite.

This BrowserStack Example repository demonstrates a WebdriverIO tests framework written in Mocha and nodeJS with parallel testing capabilities. The WebdriverIO test scripts are written for the open source [todo](todo).This BrowserStack Demo Mobile App is an e-commerce mobile application which showcases multiple real-world user scenarios. The app is bundled with offers data, orders data and products data that contains everything you need to start using the app and run tests out-of-the-box.

The WebDriverIO tests are run on different platforms like on-prem and BrowserStack using various run configurations and test capabilities.

---

## Repository setup

- Clone the repository

- Ensure you have the following dependencies installed on the machine
  - NodeJS >= 16.11.1 (includes npm 8.0.0)

- Run below command to configure dependencies

    ```sh
    npm install
    ```
## About the tests in this repository

This repository contains the following WebdriverIO tests:
| Module   | Test name                          | Description |
| ---      | ---                                | --- |
| E2E      | e2e.spec.js                       | This test scenario verifies successful product purchase lifecycle end-to-end. It demonstrates the [Page Object Model design pattern](https://www.browserstack.com/guide/page-object-model-in-selenium) and is also the default test executed in all the single test run profiles. |
| Login    | login.spec.js                       | This test verifies the login workflow with different types of valid login users. |
| Login    | login_data_driven.spec.js             | This test verifies the login for all error cases in a datadriven way |
| Login    | login_requested.spec.js              | This test verifies that the login page is shown when you access the favourites page with being logged in  |
| Offers   | offers.spec.js                       | This test mocks the GPS location for Singapore and verifies that the product offers applicable for the Singapore location are shown.   |
| User     | user.spec.js                        | The first test verifies that existing orders are shown for user: "existing_orders_user". The second test verifies if a user can add product to the favourites. |

## Test infrastructure environments

- [On-premise/self-hosted](#on-premise--self-hosted)
- [BrowserStack](#browserstack)

## Configuring the maximum parallel test threads for this repository

  For all the parallel run configuration profiles, you can configure the maximum parallel test threads by changing the settings below.

- BrowserStack
    
    `resources/conf/wdio-bstack-parallel.conf.js`

    ```js
    capabilities: [{
    maxInstances: 5,
    ...
    ```

## Test Reporting

- [Allure reports](#generating-allure-reports)

---

# On Premise / Self Hosted

This infrastructure points to running the tests on your own machine using simulator or connected devices.

## Prerequisites

- For this infrastructure configuration (i.e on-premise), ensure that the app is downloaded and placed in the `/bin` folder.
<todo add download urls>

## Running Your Tests

### Run a specific test on your own machine

- How to run the test?

  To run the default test scenario (e.g. End to End Scenario) on your own machine, use the following command:
    ```sh
  npm run onprem
  ```
  To run a specific test scenario, use the following command with the additional 'spec' argument:

  ```sh
  npm run onprem-suite -- -- spec orders
  ```
### Run the entire test suite on your own machine

- How to run the test?

  To run the entire test suite on your own machine, use the following command:
  ```sh
  npm run onprem-suite
  ```
# BrowserStack

[BrowserStack](https://browserstack.com) provides instant access to 2,000+ real mobile devices and browsers on a highly reliable cloud infrastructure that effortlessly scales as testing needs grow.

## Prerequisites
- Create a new [BrowserStack account](https://www.browserstack.com/users/sign_up) or use an existing one.
- Identify your BrowserStack username and access key from the [BrowserStack App Automate Dashboard](https://app-automate.browserstack.com/) and export them as environment variables using the below commands.

   - For \*nix based and Mac machines:

      ```sh
      export BROWSERSTACK_USERNAME=<browserstack-username> &&
      export BROWSERSTACK_ACCESS_KEY=<browserstack-access-key>
      ```

   - For Windows:

      ```shell
      set BROWSERSTACK_USERNAME=<browserstack-username>
      set BROWSERSTACK_ACCESS_KEY=<browserstack-access-key>
      ```
Alternatively, you can also hardcode username and access_key objects in the [wdio*.conf.js](resources/conf/) files.

> Note:
> - We have configured the capabilities in [wdio*.conf.js](resources/conf) files. You can certainly update them based on your device test requirements.
> - The exact test capability values can be easily identified using the [Browserstack Capability Generator](https://browserstack.com/app-automate/capabilities)

## Running Your Tests on BrowserStack

### Prerequisites

You need to upload the `APK` or `IPA` to BrowserStack, before you can run the test on BrowserStack. BrowserStack will provide you with an `app_url` which you need to use.

You can upload the `APK` or `IPA` using a file on your filesystem or using a public url.

cURL command: 
``` shell
curl -u "browserstack_username:browserstack_access_key" \
-X POST "https://api-cloud.browserstack.com/app-automate/upload" \
-F "file=@/path/to/ipa/or/apk" \
-F "custom_id=BrowserStackDemoApp"
```

More information on [Upload apps from filesystem](https://www.browserstack.com/docs/app-automate/appium/upload-app-from-filesystem), [Upload apps using public URL](https://www.browserstack.com/docs/app-automate/appium/upload-app-using-public-url) or [Define custom ID for app](https://www.browserstack.com/docs/app-automate/appium/upload-app-define-custom-id).

### Run a specific test on BrowserStack

In this section, we will run a single test on an Android device on Browserstack. To change test capabilities for this configuration, please refer to the `capabilities` object in `resources/conf/wdio-bstack-single.conf.js` file.

- How to run the test?

   - To run the default test scenario (e.g. End to End Scenario) on a BrowserStack device, use the following command:
      ```sh
      npm run bstack-single
      ```
  - To run a specific test scenario, use the following command with the additional 'spec' argument:
    ```sh
    npm run bstack-suite -- -- spec orders
    ```

### Run the entire test suite in parallel on a single BrowserStack device

In this section, we will run the tests in parallel on a single device on Browserstack. Refer to `capabilities` object in `resources/conf/wdio-bstack-parallel.conf.js` file to change test capabilities for this configuration.

- How to run the test?

  - To run the entire test suite in parallel on a single BrowserStack device type, use the following command:
    ```sh
    npm run bstack-parallel
    ```
> Note: By default, this execution would run maximum 2 test threads in parallel on BrowserStack. The parallels can eb modified by updated the `maxInstances` inside `capabilities` object in `resources/conf/wdio-bstack-parallel.conf.js`.

### Run the entire test suite in parallel on multiple BrowserStack devices

In this section, we will run the tests in parallel on multiple devices on Browserstack. Refer to the `capabilities` object in `resources/conf/wdio-bstack-parallel-devices.conf.js` file to change test capabilities for this configuration.

- How to run the test?

  - To run the entire test suite in parallel on multiple BrowserStack devices, use the following command:
    ```sh
    npm run bstack-parallel-devices
    ```
### Mobile application using local or internal environment - Running your tests on BrowserStack using BrowserStackLocal

#### Prerequisites

- Clone the [BrowserStack demo application](https://github.com/browserstack/browserstack-demo-app) repository.
  ```sh
  git clone https://github.com/browserstack/browserstack-demo-app
  ``` 
- Please follow the README.md on the BrowserStack demo application repository to install and start the dev server on localhost.
- We will change the response of the `signin` (for the `locked_user`) API endpoint. (File to change: `pages/api/signin.js` line `43`)
  - The API endpoint respond with a specific error, `Your account has been locked.`.
  - We will change that to something generic, like: `Something went wrong.`
- In this section, we will run a single test case that changes the API used in BrowserStack Demo app, in a wat that it interact with you local machine. Refer to the `capabilities` object in `resources/conf/wdio-bstack-local.conf.js` file to change test capabilities for this configuration.
- Note: You may need to provide additional BrowserStackLocal arguments to successfully connect your localhost environment with BrowserStack infrastructure. (e.g if you are behind firewalls, proxy or VPN).
- Further details for successfully creating a BrowserStackLocal connection can be found here:

   - [Local Testing with App Automate](https://www.browserstack.com/local-testing/app-automate)
   - [BrowserStackLocal Java GitHub](https://github.com/browserstack/browserstack-local-java)

### Mobile application using local or internal environment - Run a specific test on BrowserStack using BrowserStackLocal

- How to run the test?

   - To run the default test scenario (e.g. End to End Scenario) on a single BrowserStack device using BrowserStackLocal, use the following command:
      ```sh
      npm run bstack-local
      ```
### Mobile application using local or internal environment - Run the entire test suite in parallel on multiple BrowserStack devices using BrowserStackLocal

In this section, we will run the test cases on a mobile application using a local or internal environment in parallel on multiple devices on Browserstack. Refer to the `capabilities` object in `resources/conf/wdio-bstack-local-parallel-devices.conf.js` file to change test capabilities for this configuration.

- How to run the test?

  - To run the entire test suite in parallel on multiple BrowserStack devices using BrowserStackLocal, use the following command:
    ```sh
    npm run bstack-local-parallel-devices
    ```
## Generating Allure Reports

- Generate Report using the following command: 
    ```
    npm run generate-report
    ```
## Additional Resources

- View your test results on the [BrowserStack App Automate Dashboard](https://www.browserstack.com/app-automate)
- Documentation for writing [App Automate test scripts in JS](https://www.browserstack.com/docs/app-automate/appium/getting-started/nodejs/webdriverio)
- Customizing your tests capabilities on BrowserStack using our [test capability generator](https://www.browserstack.com/app-automate/capabilities)
- [List of Browsers & mobile devices](https://www.browserstack.com/list-of-browsers-and-platforms?product=automate) for automation testing on BrowserStack
- [Using Automate REST API](https://www.browserstack.com/automate/rest-api) to access information about your tests via the command-line interface
- Understand how many parallel sessions you need by using our [Parallel Test Calculator](https://www.browserstack.com/app-automate/parallel-calculator?ref=github)
- For testing public web applications behind IP restriction, [Inbound IP Whitelisting](https://www.browserstack.com/local-testing/inbound-ip-whitelisting) can be enabled with the [BrowserStack Enterprise](https://www.browserstack.com/enterprise) offering