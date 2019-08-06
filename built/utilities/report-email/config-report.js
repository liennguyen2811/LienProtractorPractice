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
const protractor_1 = require("protractor");
const utility_1 = require("@utilities/general/utility");
const report_email_1 = __importDefault(require("./report-email"));
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
        return __awaiter(this, void 0, void 0, function* () {
            var jasmineReporters = require('jasmine-reporters');
            protractor_1.browser.getCapabilities().then(function (value) {
                let reportName = 'protractor-report-' + '_' + value.get('browserName') + '_' + Math.floor(Math.random() * 1E16);
                jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
                    consolidateAll: true,
                    filePrefix: `${reportName}`,
                    savePath: `${project_path_1.default.conf}/test/reports/xml`,
                }));
            });
        });
    }
    static createXMLReport() {
        return __awaiter(this, void 0, void 0, function* () {
            var jasmineReporters = require('jasmine-reporters');
            jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
                consolidateAll: true,
                savePath: `${project_path_1.default.conf}/test/reports`,
                filePrefix: 'xmlresults'
            }));
        });
    }
    static clearOldReport() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Beforeall");
            const fs = require('fs-extra');
            fs.emptyDir(`${project_path_1.default.conf}/test/reports/xml`, err => {
                if (err)
                    return console.error(err);
                console.log('success!');
            });
        });
    }
    static convertXMLtoPieChart() {
        return __awaiter(this, void 0, void 0, function* () {
            var HTMLReport = require('protractor-html-reporter-2');
            var browserName, browserVersion;
            var capsPromise = protractor_1.protractor.browser.getCapabilities();
            capsPromise.then(function (caps) {
                return __awaiter(this, void 0, void 0, function* () {
                    browserName = caps.get('browserName');
                    browserVersion = caps.get('version');
                    let testConfig = {
                        reportTitle: "Protractor Test Execution Report",
                        outputPath: `${project_path_1.default.conf}/test/reports`,
                        outputFilename: 'ProtractorTestReport',
                        screenshotPath: './screenshots',
                        testBrowser: browserName,
                        browserVersion: browserVersion,
                        modifiedSuiteName: false,
                        screenshotsOnlyOnFailure: true,
                    };
                    new HTMLReport().from(`${project_path_1.default.conf}/test/reports/xmlresults.xml`, testConfig);
                    yield report_email_1.default.generateReportForBuild(`${project_path_1.default.conf}/test/reports/xmlresults.xml`, `${project_path_1.default.conf}/test/reports/emailHtml/`);
                });
            });
        });
    }
    static convertXMLtoPieChartMultiBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            var HTMLReport = require('protractor-html-reporter-2');
            var browserName, browserVersion;
            var capsPromise = protractor_1.protractor.browser.getCapabilities();
            console.log("if go here");
            capsPromise.then(function (caps) {
                return __awaiter(this, void 0, void 0, function* () {
                    browserName = caps.get('browserName');
                    browserVersion = caps.get('version');
                    let testConfig = {
                        reportTitle: `xml report`,
                        outputPath: `${project_path_1.default.conf}/test/reports`,
                        outputFilename: 'ProtractorTestMultiBrowserReport',
                        screenshotPath: './screenshots',
                        testBrowser: browserName,
                        browserVersion: browserVersion,
                        modifiedSuiteName: false,
                        screenshotsOnlyOnFailure: true,
                    };
                    console.log("Lien1");
                    var fs = require('fs-extra');
                    fs.readdirSync(`${project_path_1.default.conf}/test/reports/xml`).forEach(file => {
                        console.log("Lien1");
                        console.log("Filename", file);
                        new HTMLReport().from(`${project_path_1.default.conf}/test/reports/xml/${file}`, testConfig);
                    });
                    yield report_email_1.default.generateReportForBuild(`${project_path_1.default.conf}/test/reports/xml`, `${project_path_1.default.conf}/test/reports/emailHtml/`);
                });
            });
        });
    }
    static getBugErrorMessage(testcaseId, errorMess = " ") {
        let configFile = `src/test-data/bug-data/bug-data.json`;
        let jsonPath = utility_1.Utility.getPath(configFile);
        let data = require(jsonPath);
        for (let dataBug of data) {
            let data = dataBug.Data;
            for (let a = 0; a < data.length; a++) {
                let testcaseIdList = data[a].TestcaseID;
                for (let b = 0; b < testcaseIdList.length; b++) {
                    if (testcaseIdList[a] == testcaseId) {
                        return `Failed by Bug: ${dataBug.BugIdJira} - ${dataBug.BugDescription}`;
                    }
                }
            }
        }
    }
}
ConfigReport.specNumber = -1;
ConfigReport.checkErrorPic = true;
exports.ConfigReport = ConfigReport;
//# sourceMappingURL=config-report.js.map