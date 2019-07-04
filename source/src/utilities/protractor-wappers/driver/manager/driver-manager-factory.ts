import TestRunInfo from "@data-objects/general/test-run-info";
import { ProtractorBrowser, protractor } from "protractor";
import { errorwrapper } from "@utilities/protractor-wappers/error-wapper";

export default class DriverManagerFactory {
    public static _currentBrowser: ProtractorBrowser;
    public static readonly _browserArray: ProtractorBrowser[] = new Array();


    /**
    * 
    * @static
    * @returns {ProtractorBrowser}
    * @memberof DriverUtils
    */
   public static getDriverInstance(): ProtractorBrowser {
    try {
        if (DriverManagerFactory._browserArray.length == 0) {
            DriverManagerFactory._currentBrowser = protractor.browser;
            DriverManagerFactory._browserArray.push(DriverManagerFactory._currentBrowser);
            return DriverManagerFactory._currentBrowser;
        } else {
            return DriverManagerFactory._currentBrowser;
        }
    } catch (err) {
        throw new errorwrapper.CustomError(this.getDriverInstance, err.message);
    }
}
 /**
     * Set Page load timeout
     * @static
     * @param {number} [timeoutInSecond] Time out to wait for page load
     * @returns {Promise<void>}
     * @memberof BrowserWrapper
     */
    public static async setPageLoadTimeout(timeoutInSecond?: number): Promise<void> {
        try {

            // let TestRunInfo = require(`@data-objects/general/test-run-info`).default();

            if (timeoutInSecond == null)
                timeoutInSecond = TestRunInfo.pageTimeout;
            await DriverManagerFactory.getDriverInstance().manage().timeouts().pageLoadTimeout(timeoutInSecond * 1000);
        } catch (err) {
            throw new errorwrapper.CustomError(this.setPageLoadTimeout, err.message);
        }
    }
}