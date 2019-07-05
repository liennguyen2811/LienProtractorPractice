
import BrowserWrapper from "@utilities/protractor-wappers/browser-wrapper";
import * as fileSytem from "fs"
import ProjectPath from "@test-data/general/project-path";
import { ConfigReport } from "@utilities/report-email/config-report";


export let customMacher: jasmine.CustomMatcherFactories = {

    toBe: function() : jasmine.CustomMatcher{

        return{
            compare: function(actual: any, expected: any): jasmine.CustomMatcherResult{
                const result: jasmine.CustomMatcherResult = {
                    pass: jasmine.matchersUtil.equals(actual,expected),
                    message: arguments[2]
                }
                
                if(result.pass){}
                else{
                    try{
                        if(ConfigReport.checkErrorPic){
                            ConfigReport.checkErrorPic = false;
                            BrowserWrapper.getDriverInstance().getProcessedConfig().then(function(config){
                                let fullName = <String> config.specs[ConfigReport.specNumber];
                               if(fullName == null || fullName == undefined){
                                   fullName = "";
                               }
                               let tempName1= fullName.replace(/\\/g," ").split(" ");
                               let testCaseID = tempName1[tempName1.length-1].split(".")[0]
                               BrowserWrapper.getDriverInstance().takeScreenshot().then(function(png){
                                if (png==null || png == undefined){
                                    png = "";
                                }
                                if(!fileSytem.existsSync(`${ProjectPath.conf}/test/reports/screenshots/` + testCaseID + '.png')){
                                    var fs = require('fs-extra');
                                    var stream = fs.createWriteStream(`${ProjectPath.conf}/test/reports/screenshots` + testCaseID + '.png');
                                    stream.write(new Buffer(png, 'base64'));
                                    stream.end();
                                }
                               });
                            
                            });
                        }
                    }catch(err){}

                    ConfigReport.checkErrorPic = false;
                    throw new Error(result.message + ". " + actual + " does nto equal to " + expected);
                } 
                return result;
            }
        }
    }

}