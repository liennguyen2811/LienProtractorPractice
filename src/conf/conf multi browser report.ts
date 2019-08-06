require('module-alias/register');

let jsLogger = require('js-logger');
import TestBase from "@testcases/test-base";
import { customMacher } from "@utilities/matcher/customerMatcher";
import { ConfigReport } from "@utilities/report-email/config-report";
import { Config } from "protractor/built/config";

TestBase.setUpTestRunInfo();

export let config: Config = {

  onPrepare: async function () {

    beforeEach(function () {
      ConfigReport.reportSetupConfig();
      jasmine.addMatchers(customMacher);
    });

     jsLogger.useDefaults({
      defaultLevel: jsLogger.INFO,
      formatter: function (messages: any, context: any) {
      messages.unshift(new Date().toLocaleString())
      }
    });
    
   await ConfigReport.createXMLReport1();
  },

  onComplete: async function () {
    await ConfigReport.convertXMLtoPieChartMultiBrowser();
  },

  beforeLaunch: async function beforeLaunch() {
    await ConfigReport.clearOldReport();
  },

  framework: 'jasmine',

  multiCapabilities: [
    {
      browserName: 'firefox',
      maxInstances: 1,
     specs: ['../testcases/TC-02.js',
       '../testcases/TC-01.js',
       '../testcases/TC-03.js',
       '../testcases/TC-04.js',
       '../testcases/TC-05.js',
       '../testcases/TC-06.js',
       '../testcases/TC-07.js',
       '../testcases/TC-08.js']
    },
    {
      browserName: 'chrome',
      maxInstances: 1,
      specs: ['../testcases/TC-09.js',
         '../testcases/TC-10.js',
        '../testcases/TC-11.js',
        '../testcases/TC-12.js',
        '../testcases/TC-13.js',
        '../testcases/TC-14.js',
        '../testcases/TC-15.js']
    }
  ],

  seleniumAddress: 'http://192.168.170.195:4444/wd/hub',
  directConnect: false,
  SELENIUM_PROMISE_MANAGER: false


}