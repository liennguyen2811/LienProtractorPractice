require('module-alias/register');

let jsLogger = require('js-logger');
import TestBase from "@testcases/test-base";
import { customMacher } from "@utilities/matcher/customerMatcher";
import { Config } from "protractor/built/config";
import { ConfigReport } from "@utilities/report-email/config-report";
import TestRunInfo from "@data-objects/general/test-run-info";

TestBase.setUpTestRunInfo();

export let config : Config = {

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

    await ConfigReport.createXMLReport();
  },

  onComplete: async function(){
    await ConfigReport.convertXMLtoPieChart();
  },
  framework: 'jasmine',
   capabilities: {
     browserName: `${TestRunInfo.browser}`,
     binary: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
   },


seleniumAddress: 'http://192.168.170.195:4444/wd/hub',
directConnect: false,
SELENIUM_PROMISE_MANAGER: false,
//seleniumAddress: 'http://localhost:4444/wd/hub',
   specs: [//'../testcases/TC-04.js',
        //   '../testcases/TC-01.js',
        //  '../testcases/TC-03.js',
        //  '../testcases/TC-01.js',
        //  '../testcases/TC-05.js',
        //  '../testcases/TC-06.js',
        //  '../testcases/TC-07.js',
        // '../testcases/TC-08.js',
        //  '../testcases/TC-09.js',
        '../testcases/TC-10.js',
         '../testcases/TC-11.js',
         '../testcases/TC-12.js',
         '../testcases/TC-13.js',
        '../testcases/TC-15.js', 
          '../testcases/TC-14.js']
}