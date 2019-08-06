
import ProjectPath from "@test-data/general/project-path";
import {jasmineReporters} from "jasmine-reporters";
import { protractor, browser } from "protractor";
import { Utility } from "@utilities/general/utility";
import HTMLEmailRepportCustom from "./report-email";
import * as fileSytem from "fs"

export class ConfigReport{

    static specNumber: number = -1;
    static checkErrorPic: boolean = true;

    static reportSetupConfig(){
        ConfigReport.specNumber ++;
        ConfigReport.checkErrorPic = true;
        if (ConfigReport.specNumber<1){
            var mkdirp = require('mkdirp')
            mkdirp(`${ProjectPath.conf}/test/reports/screenshots`, function(err: Error){});
        }
    }
    /**
     * Create xml report
     * @static
     * @memberof ConfigReport
     */
    static async createXMLReport1(){
            var jasmineReporters = require('jasmine-reporters');
            browser.getCapabilities().then(function(value){
            let reportName = 'protractor-report-' + '_' + value.get('browserName') + '_' + Math.floor(Math.random()*1E16);
            jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            filePrefix: `${reportName}`,
            savePath:  `${ProjectPath.conf}/test/reports/xml`,
        }));
    });
    }

    static async createXMLReport() {     
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: `${ProjectPath.conf}/test/reports`,
            filePrefix: 'xmlresults'
        }));
    }
    static async clearOldReport() {
        console.log("Beforeall")
        const fs = require('fs-extra');
        fs.emptyDir(`${ProjectPath.conf}/test/reports/xml`, err => {
        if (err) return console.error(err);
        console.log('success!')
        });
    }
    /**
     * Covert XMLtoPieChart
     * @static
     * @memberof ConfigReport
     */
    static async convertXMLtoPieChart(): Promise<void>{
        var HTMLReport = require('protractor-html-reporter-2');
        var browserName, browserVersion;
        var capsPromise = protractor.browser.getCapabilities();
        capsPromise.then( async function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
        let testConfig = {
                    reportTitle: "Protractor Test Execution Report",
                    outputPath: `${ProjectPath.conf}/test/reports`,
                    outputFilename: 'ProtractorTestReport',
                    screenshotPath: './screenshots',
                    testBrowser: browserName,
                    browserVersion: browserVersion,
                    modifiedSuiteName: false,
                    screenshotsOnlyOnFailure: true,
                };

        new HTMLReport().from(`${ProjectPath.conf}/test/reports/xmlresults.xml`, testConfig);
        await HTMLEmailRepportCustom.generateReportForBuild(`${ProjectPath.conf}/test/reports/xmlresults.xml`,`${ProjectPath.conf}/test/reports/emailHtml/`)
    });
}

 /**
     * Covert XMLtoPieChart
     * @static
     * @memberof ConfigReport
     */
    static async convertXMLtoPieChartMultiBrowser(): Promise<void>{
        
        var HTMLReport = require('protractor-html-reporter-2');
        var browserName, browserVersion;
        var capsPromise = protractor.browser.getCapabilities();
        console.log("if go here");
        capsPromise.then( async function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');

           // let reportName = 'protractor-report-' + '_' + caps.get('browserName') + '_' + Math.floor(Math.random()*1E16);
           // console.log("Lien onComplete reportName ", reportName);
        let testConfig = {
                    reportTitle: `xml report`,
                    outputPath: `${ProjectPath.conf}/test/reports`,
                    outputFilename: 'ProtractorTestMultiBrowserReport',
                    screenshotPath: './screenshots',
                    testBrowser: browserName,
                    browserVersion: browserVersion,
                    modifiedSuiteName: false,
                    screenshotsOnlyOnFailure: true,
                };
                console.log("Lien1")
                var fs = require('fs-extra');
                fs.readdirSync(`${ProjectPath.conf}/test/reports/xml`).forEach(file => {
                    console.log("Lien1")
                    console.log("Filename", file);
                    new HTMLReport().from(`${ProjectPath.conf}/test/reports/xml/${file}`, testConfig);
                  });
       await HTMLEmailRepportCustom.generateReportForBuild(`${ProjectPath.conf}/test/reports/xml`,`${ProjectPath.conf}/test/reports/emailHtml/`)
    });
}
static getBugErrorMessage(testcaseId, errorMess = " "){
    let configFile: string = `src/test-data/bug-data/bug-data.json`;
    let jsonPath: string = Utility.getPath(configFile);
    let data = require(jsonPath);
    for (let dataBug of data){
        let data = dataBug.Data;
        for (let a=0; a < data.length; a++){
            let testcaseIdList = data[a].TestcaseID;
            for (let b=0; b< testcaseIdList.length;b++ ){
                if(testcaseIdList[a] == testcaseId){
                   return `Failed by Bug: ${dataBug.BugIdJira} - ${dataBug.BugDescription}`
                }
            }
        }

    }
}
}