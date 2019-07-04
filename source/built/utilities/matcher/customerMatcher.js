"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_wrapper_1 = __importDefault(require("@utilities/protractor-wappers/browser-wrapper"));
const fileSytem = __importStar(require("fs"));
const project_path_1 = __importDefault(require("@test-data/general/project-path"));
const config_report_1 = require("@utilities/report-email/config-report");
exports.customMacher = {
    toBe: function () {
        return {
            compare: function (actual, expected) {
                const result = {
                    pass: jasmine.matchersUtil.equals(actual, expected),
                    message: arguments[2]
                };
                if (result.pass) { }
                else {
                    try {
                        if (config_report_1.ConfigReport.checkErrorPic) {
                            config_report_1.ConfigReport.checkErrorPic = false;
                            browser_wrapper_1.default.getDriverInstance().getProcessedConfig().then(function (config) {
                                let fullName = config.specs[config_report_1.ConfigReport.specNumber];
                                if (fullName == null || fullName == undefined) {
                                    fullName = "";
                                }
                                let tempName1 = fullName.replace(/\\/g, " ").split(" ");
                                let testCaseID = tempName1[tempName1.length - 1].split(".")[0];
                                browser_wrapper_1.default.getDriverInstance().takeScreenshot().then(function (png) {
                                    if (png == null || png == undefined) {
                                        png = "";
                                    }
                                    if (!fileSytem.existsSync(`${project_path_1.default.conf}/test/reports/screenshots/` + testCaseID + '.png')) {
                                        var fs = require('fs-extra');
                                        var stream = fs.createWriteStream(`${project_path_1.default.conf}/test/reports/screenshots` + testCaseID + '.png');
                                        stream.write(new Buffer(png, 'base64'));
                                        stream.end();
                                    }
                                });
                            });
                        }
                    }
                    catch (err) { }
                    config_report_1.ConfigReport.checkErrorPic = false;
                    throw new Error(result.message + ". " + actual + " does nto equal to " + expected);
                }
                return result;
            }
        };
    }
};
//# sourceMappingURL=customerMatcher.js.map