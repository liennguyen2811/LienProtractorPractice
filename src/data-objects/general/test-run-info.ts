import fs from 'fs';
import { errorwrapper } from '@utilities/protractor-wappers/error-wapper';
import { Config } from 'protractor';
import { ConfigInfo } from '@data-objects/general/config';
import { JsonUtility } from '@utilities/general/utility';

export default class TestRunInfo{
    static browser: string;
    static elementTimeout: number;
    static testTimeout: number;
    static shortTimeout: number;
    static pageTimeout: number;
    static longTimeout: number;
    static conditionTimeout: number;

	static RAILWAY_URL: string = "http://18.136.107.136/Account/Login.cshtml";
	static USERNAME : string = "liennguyenlogigear12@gmail.com";
    static PASSWORD : string= "liennguyen";
    // check

    public static setUpTestRunInfo(JsonPath: string){
        try{
            let jsonString : string = fs.readFileSync(JsonPath,'utf8');
            let configData: ConfigInfo = JsonUtility.deserialize(JSON.parse(jsonString), ConfigInfo);
            TestRunInfo.browser = configData.browser.toLocaleLowerCase();
            console.log("TestRunInfo.browser ",TestRunInfo.browser);
            TestRunInfo.elementTimeout = configData.elementTimeout;
            TestRunInfo.testTimeout = configData.testTimeout;
            console.log("TestRunInfo.testTimeout ",TestRunInfo.testTimeout);
            TestRunInfo.pageTimeout = configData.pageTimeout;
            TestRunInfo.shortTimeout = TestRunInfo.testTimeout/12;
            TestRunInfo.conditionTimeout = TestRunInfo.testTimeout/2;
            TestRunInfo.longTimeout = TestRunInfo.testTimeout*4;
            
        } catch(err){
            throw new errorwrapper.CustomError(this.setUpTestRunInfo, err.message)
        }
    }
}
