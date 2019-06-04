import { protractor, ProtractorBrowser } from "protractor";
import { FunctionType, Logger } from "../general/logger";
import { errorwrapper } from "./error-wapper";



export default class BrowserWrapper {
    private static _currentBrowser: ProtractorBrowser;
    private static readonly _browserArray: ProtractorBrowser[] = new Array();

    /**
    * 
    * @static
    * @returns {ProtractorBrowser}
    * @memberof BrowserWrapper
    */
    public static getDriverInstance(): ProtractorBrowser {
        try {
            if (BrowserWrapper._browserArray.length == 0) {
                BrowserWrapper._currentBrowser = protractor.browser;
                BrowserWrapper._browserArray.push(BrowserWrapper._currentBrowser);
                return BrowserWrapper._currentBrowser;
            } else {
                return BrowserWrapper._currentBrowser;
            }
        } catch (err) {
            throw new errorwrapper.CustomError(this.getDriverInstance, err.message);
        }
    }
    /**
     * Navigate to URL
     * @static
     * @param {string} url want to navigaye to
     * @return {Promise<BrowserWapper>}
     * @memberof BrowserWapper
     */
    public static async get(url: string): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Navigate to ${url}`);
            let currentBrowser: ProtractorBrowser = await BrowserWrapper.getDriverInstance();
            await currentBrowser.waitForAngularEnabled(false);
            await currentBrowser.get(url);
            await currentBrowser.waitForAngularEnabled(false);
        } catch (err) {
            throw new err
        }
    }
    /**
     * Maximize the browser window
     * @static
     * @return
     * @memberof BrowserWapper
     */
    public static async maximize(): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, 'Maximnizing window');
            await BrowserWrapper.getDriverInstance().manage().window().maximize();
        } catch (err) {
            throw new errorwrapper.CustomError(this.maximize, err.message)
        }
    }
    /**
     * @static
     * @returns {Promise<void>}
     * @memberof BrowserWapper
     **/
    public static async quit(): Promise<void> {
        try {
            await BrowserWrapper.getDriverInstance().quit();
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.quit, err.message)
        }
    }
    /**
     * Restart browser
     * @static
     * @param {boolean}(waitForAngularEnabled: boolean = false) wait for anular enabled mode
     * @returns Promise<void>
     * @memberof BrowserWapper
     */
    public static async restart (waitForAngularEnabled: boolean = false): Promise<void>{
        try{
            await Logger.write(FunctionType.UI, `Restart browser`);
            let currentBrowser: ProtractorBrowser = BrowserWrapper.getDriverInstance();
            await currentBrowser.restart();
            BrowserWrapper._browserArray.length=0;
            currentBrowser = BrowserWrapper.getDriverInstance();
            await currentBrowser.waitForAngularEnabled(waitForAngularEnabled);
        }
        catch (err){
            throw new errorwrapper.CustomError(this.restart, err.message)
        }
    }
    /**
     * Restart all browser 
     * @static
     * @param {boolean} [waitForAngularEnabled = false] wait for angular enabled mode
     * @returns {Promise<void>}
     * @memberof BrowserWapper
     */
    public static async restartAllBrowsers(waitForAngularEnabled: boolean = false): Promise<void>{
        try{
            await Logger.write(FunctionType.UI, `Restarting all browsers`);
            let numberBrowsers: number = BrowserWrapper._browserArray.length;
            let currentBrowser: ProtractorBrowser;
            if (numberBrowsers!=1){
                for (let i: number=1; i<= numberBrowsers; i++){
                    BrowserWrapper._currentBrowser= BrowserWrapper._browserArray[i-1];
                    currentBrowser = BrowserWrapper.getDriverInstance();
                    await currentBrowser.restart();
                    currentBrowser = BrowserWrapper.getDriverInstance();
                    await currentBrowser.waitForAngularEnabled(waitForAngularEnabled);
                }
            }

            currentBrowser = BrowserWrapper.getDriverInstance();
            await currentBrowser.restart();
            BrowserWrapper._browserArray.length = 0;
            currentBrowser = BrowserWrapper.getDriverInstance();
            await currentBrowser.waitForAngularEnabled(waitForAngularEnabled);
        }
        catch (err){
            throw new errorwrapper.CustomError(this.restartAllBrowsers, err.message)
        }
    }
}
