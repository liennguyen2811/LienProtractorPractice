"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
let jsLogger = require('js-logger');
const test_base_1 = __importDefault(require("@testcases/test-base"));
const customerMatcher_1 = require("@utilities/matcher/customerMatcher");
const config_report_1 = require("@utilities/report-email/config-report");
test_base_1.default.setUpTestRunInfo();
exports.config = {
    onPrepare: function () {
        return __awaiter(this, void 0, void 0, function* () {
            beforeEach(function () {
                config_report_1.ConfigReport.reportSetupConfig();
                jasmine.addMatchers(customerMatcher_1.customMacher);
            });
            jsLogger.useDefaults({
                defaultLevel: jsLogger.INFO,
                formatter: function (messages, context) {
                    messages.unshift(new Date().toLocaleString());
                }
            });
            yield config_report_1.ConfigReport.createXMLReport1();
        });
    },
    onComplete: function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_report_1.ConfigReport.convertXMLtoPieChartMultiBrowser();
        });
    },
    beforeLaunch: function beforeLaunch() {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_report_1.ConfigReport.clearOldReport();
        });
    },
    framework: 'jasmine',
    capabilities: {
        browserName: 'firefox',
        shardTestFiles: true,
        maxInstances: 2
    },
    seleniumAddress: 'http://192.168.170.195:4444/wd/hub',
    directConnect: false,
    SELENIUM_PROMISE_MANAGER: false,
    specs: ['../testcases/TC-02.js',
        '../testcases/TC-01.js',
        '../testcases/TC-03.js',
        '../testcases/TC-04.js',
        '../testcases/TC-05.js',
        '../testcases/TC-015.js']
};
//# sourceMappingURL=conf multi instance.js.map