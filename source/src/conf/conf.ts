require('module-alias/register');
let jsLogger = require('js-logger');
import TestBase from "@testcases/test-base";
import { customMacher } from "@utilities/matcher/customerMatcher";
import { Config } from "protractor/built/config";
import { ConfigReport } from "@utilities/report-email/config-report";
import { Capabilities, protractor } from "protractor";
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

    await ConfigReport.createXMLReport1();
  },

  onComplete: async function(){
    var browserName, browserVersion;
    var capsPromise = protractor.browser.getCapabilities();
    capsPromise.then( async function (caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
    //console.log("Lien onComplete browserName ", Capabilities);
    console.log("Lien onComplete browserName ", browserName);
  });
    await ConfigReport.convertXMLtoPieChart();

  },

  framework: 'jasmine',

  // capabilities: {
  //   browserName: 'chrome',
  // },

   capabilities: {
     browserName: `${TestRunInfo.browser}`,
   },

  // capabilities: {
  //   browserName: 'chrome',
  //   shardTestFiles: true,
  //   maxInstances: 2
  // },

//   multiCapabilities: [
//     {
//         browserName: 'chrome',        
//         shardTestFiles: true,
//         maxInstances: 2,
//         specs: ['../testcases/TC-01.js']
//     },
//     {
//         browserName: 'firefox',
//         count: 1,
//         specs: ['../testcases/TC-02.js']
//     },
// ],
  
  seleniumAddress: 'http://localhost:4444/wd/hub',
   specs: ['../testcases/TC-01.js',
          '../testcases/TC-02.js']
}