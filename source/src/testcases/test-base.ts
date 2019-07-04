import { async } from "q";
import TestRunInfo from "../data-objects/general/test-run-info";
import BrowserWrapper from "../utilities/protractor-wappers/browser-wrapper";
import { Logger, FunctionType } from "../utilities/general/logger";
import { Utility } from "@utilities/general/utility";
import { errorwrapper } from "@utilities/protractor-wappers/error-wapper";


export default class TestBase{

    public static async scheduleTestBase(){
        beforeEach(async()=>{
            jasmine.DEFAULT_TIMEOUT_INTERVAL = TestRunInfo.testTimeout;
            await BrowserWrapper.setPageLoadTimeout(1);
            await Logger.write(FunctionType.NONE, `Intial - Setting Up\n`);
            await this.navigateToWebPage(TestRunInfo.RAILWAY_URL);
        },  TestRunInfo.conditionTimeout);
    };
     /**
     * Navigate to web url
     * @static
     * @param {string} url
     * @memberof TestBase
     */
    public static async navigateToWebPage(url: string) {
        await BrowserWrapper.restart();
        await BrowserWrapper.maximize();
        await BrowserWrapper.get(url);
    };

    public static setUpTestRunInfo(){
        try{
            let pathFile: string = Utility.getPath("src/test-data/config-info.json");
            TestRunInfo.setUpTestRunInfo(pathFile);
        } catch(err){
            throw new errorwrapper.CustomError(this.setUpTestRunInfo, err.message);
        }
    }

}