"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const xmlDocument = __importStar(require("xmldoc"));
const fileSystem = __importStar(require("fs"));
const fs = __importStar(require("fs-extra"));
const filePath = __importStar(require("path"));
const config_report_1 = require("./config-report");
let testCase = { id: '', name: '', result: '', duration: '' };
let allTestCaseList = [];
let allSuiteInfo = { no: 0, buildnumber: '', childSuite: 0, tests: 0, failed: 0, skipped: 0, passed: 0, startTime: '', totalTime: '' };
let listAllSuite = [];
let listPath = [];
function getTime(time) {
    let hoursT = Math.floor(time / 3600);
    let minutesT = Math.floor(time % 3600 / 60);
    let secondT = Math.floor((time % 3600) % 60);
    return formatTime(hoursT) + ':' + formatTime(minutesT) + ':' + formatTime(secondT);
}
function formatTime(time) {
    if (time < 10) {
        let timeT = "0" + time.toString();
        return timeT;
    }
    return time.toString();
}
function getPath(fileName, dir) {
    if (dir) {
        fs.ensureDirSync(dir);
        return filePath.join(dir, fileName);
    }
    else {
        return filePath.join(__dirname, fileName);
    }
}
class HTMLEmailRepportCustom {
    static generateReportForBuild(reportXml, path) {
        console.log("Lien 1");
        let testResultXMl = new xmlDocument.XmlDocument(fileSystem.readFileSync(reportXml, 'utf8'));
        let testSuites = testResultXMl.childrenNamed('testsuite');
        allSuiteInfo.childSuite = testSuites.length;
        allSuiteInfo.totalTime = getTime(parseFloat(testResultXMl.attr.time));
        for (let i = 0; i < testSuites.length; i++) {
            console.log("testSuites", testSuites.length);
            console.log("i-----", i);
            let testCaseinSuite = testSuites[i].childrenNamed('testcase');
            for (let j = 0; j < testCaseinSuite.length; j++) {
                testCase.name = testCaseinSuite[j].attr.name;
                let tempId = testCaseinSuite[j].attr.classname.trim();
                let arrTempId = tempId.split(" ");
                testCase.id = arrTempId[arrTempId.length - 1];
                let nameTemp = testCaseinSuite[j].attr.name;
                testCase.name = nameTemp.substring(testCase.id.length + 2, nameTemp.length);
                testCase.duration = getTime(parseFloat(testCaseinSuite[j].attr.time));
                if (testCaseinSuite[j].firstChild == null) {
                    testCase.result = 'Passed';
                    allSuiteInfo.passed++;
                    console.log("testCase.result1", testCase.result);
                }
                else if (testCaseinSuite[j].childrenNamed('failure').length > 0) {
                    testCase.result = 'Failed';
                    let failureT = testCaseinSuite[j].childrenNamed('failure');
                    let temReportMess = " ";
                    console.log("testCase.result2", testCase.result);
                    for (let n = 0; n < failureT; n++) {
                        temReportMess += failureT[n].attr.message;
                        console.log("temReportMess--1", temReportMess);
                    }
                    temReportMess += config_report_1.ConfigReport.getBugErrorMessage(testCase.id, temReportMess);
                    console.log("temReportMess--2", temReportMess);
                    console.log(temReportMess.indexOf("Failed by"));
                    if (temReportMess.indexOf("Failed by") > 0) {
                        allSuiteInfo.skipped++;
                        testCase.result = 'Failed with Known Bug';
                        console.log("testCase.result", testCase.result);
                    }
                    else {
                        allSuiteInfo.failed += 1;
                        testCase.result = 'Failed';
                    }
                }
                allTestCaseList.push(testCase);
                testCase = { id: '', name: '', result: '', duration: '' };
            }
        }
        let htmlContent = '<!DOCTYPE html><html><head><title>Report</title><meta charset="UTF-8"><style> table, th, td {border: 1px solid black; border-collapse: collapse; text-align: center; font-family: Calibri; font-size:11pt } th{padding: 7px; text-align: center; font-size:12pt; border: 1px solid white; font-weight:700; background-color:Gray} td {padding: 7px; text-align: center; border: 1px solid black} </style></head>';
        console.log("htmlContent");
        htmlContent += '<body><center><table style="width:50%;border: 2px solid white"><tr><th style="WIDTH:500mm; background-color:Olive">SUITE</th><th style="WIDTH:200mm">Passed</th> <th style="WIDTH:200mm">Failed</th><th style="WIDTH:200mm">Known Bugs</th><th style="WIDTH:200mm">Skipped</th></tr><tr><td style="WIDTH: 400; border: 1px solid white; background-color:DarkOliveGreen"> Regression Test Results </td>';
        htmlContent += '<td style="border: 1px solid white">' + allSuiteInfo.passed + '</td>';
        htmlContent += '<td style="border: 1px solid white">' + allSuiteInfo.failed + '</td>';
        htmlContent += '<td style="border: 1px solid white">' + allSuiteInfo.skipped + '</td>';
        htmlContent += '<td style="border: 1px solid white">0</td></tr></table></center><br></br>';
        htmlContent += '<center><table style="width:60%"><tr><th style="border: 1px solid black">Test Case ID</th><th style="border: 1px solid black">Test Case name</th><th style="border: 1px solid black">Result</th><th style="border: 1px solid black">Duration <br>(hh:mm:ss)</br></th></tr>';
        for (let i = 0; i < allTestCaseList.length; i++) {
            htmlContent += '<tr><td style="color:black;font-weight:700">' + allTestCaseList[i].id + '</td>';
            htmlContent += '<td style="color:black;font-weight:700;text-align: left">' + allTestCaseList[i].name + '</td>';
            if (allTestCaseList[i].result == "Passed") {
                htmlContent += '<td style="color:green">Passed</td>';
                htmlContent += '<td>' + 'Lientestcolumn---' + allTestCaseList[i].duration + '</td></tr>';
            }
            else if (allTestCaseList[i].result == "Failed") {
                htmlContent += '<td style="color:red">Failed</td>';
                htmlContent += '<td>' + 'Lientestcolumn---' + allTestCaseList[i].duration + '</td></tr>';
            }
            else if (allTestCaseList[i].result == 'Failed with Known Bug') {
                htmlContent += '<td style="color:red">Failed with Known Bug</td>';
                htmlContent += '<td>' + allTestCaseList[i].duration + '</td></tr>';
            }
            else if (allTestCaseList[i].result == 'Skipped') {
                htmlContent += '<td style="color:grey">Skipped</td>';
                htmlContent += '<td>' + allTestCaseList[i].duration + '</td></tr>';
            }
        }
        htmlContent += '<tr><td colspan="3" style="text-align: right;font-weight:700">Total</td>';
        htmlContent += '<td>' + allSuiteInfo.totalTime + '</td></tr></table></center></body></html>';
        let testOutputPath = getPath('/' + 'chrome-email-report.html', path);
        fileSystem.writeFileSync(testOutputPath, htmlContent);
    }
}
exports.default = HTMLEmailRepportCustom;
//# sourceMappingURL=report-email.js.map