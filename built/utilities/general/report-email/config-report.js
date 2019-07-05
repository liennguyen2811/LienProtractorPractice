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
const project_path_1 = __importDefault(require("@test-data/general/project-path"));
const jasmine_reporters_1 = require("jasmine-reporters");
const protractor_1 = require("protractor");
class ConfigReport {
    static reportSetupConfig() {
        ConfigReport.specNumber++;
        ConfigReport.checkErrorPic = true;
        if (ConfigReport.specNumber < 1) {
            var mkdirp = require('mkdirp');
            mkdirp(`${project_path_1.default.conf}/test/reports/screenshots`, function (err) { });
        }
    }
    static createXMLReport1() {
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            filePrefix: 'xmlresults',
            savePath: `${project_path_1.default.conf}/test/reports`,
        }));
    }
    static createXMLReport() {
        jasmine.getEnv().addReporter(new jasmine_reporters_1.jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: `${project_path_1.default.conf}/test/reports`,
            filePrefix: 'xmlresults'
        }));
    }
    static convertXMLtoPieChart() {
        return __awaiter(this, void 0, void 0, function* () {
            var HTMLReport = require('protractor-html-reporter-2');
            var browserName, browserVersion;
            var capsPromise = protractor_1.protractor.browser.getCapabilities();
            capsPromise.then(function (caps) {
                browserName = caps.get('browserName');
                browserVersion = caps.get('version');
                console.log("Lien onComplete browserName ", browserName);
                let testConfig = {
                    reportTitle: 'Protractor Test Execution Report',
                    outputPath: `${project_path_1.default.conf}/test/reports`,
                    outputFilename: 'ProtractorTestReport',
                    screenshotPath: './screenshots',
                    testBrowser: browserName,
                    browserVersion: browserVersion,
                    modifiedSuiteName: false,
                    screenshotsOnlyOnFailure: true,
                };
                new HTMLReport().from(`${project_path_1.default.conf}/test/reports/xmlresults.xml`, testConfig);
            });
        });
    }
}
ConfigReport.specNumber = -1;
ConfigReport.checkErrorPic = true;
exports.ConfigReport = ConfigReport;
//# sourceMappingURL=config-report.js.map