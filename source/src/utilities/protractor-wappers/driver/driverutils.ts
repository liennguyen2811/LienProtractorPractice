import TestRunInfo from "@data-objects/general/test-run-info";
import { FunctionType, Logger } from "@utilities/general/logger";
import { errorwrapper } from "@utilities/protractor-wappers/error-wapper";
import { ProtractorBrowser,WebElement, ActionSequence, By } from "protractor";
import { ISize, Condition, WebDriver, WebElementPromise,promise} from "selenium-webdriver";
import DriverManagerFactory from "./manager/driver-manager-factory";
let protractor = require("protractor");


export default class DriverUtils extends DriverManagerFactory {
 /**
    * 
    * @static
    * @returns {ProtractorBrowser}
    * @memberof DriverUtils
    */
    public static getDriverInstance(): ProtractorBrowser {
        try {
            if (DriverUtils._browserArray.length == 0) {
                DriverUtils._currentBrowser = protractor.browser;
                DriverUtils._browserArray.push(DriverUtils._currentBrowser);
                return DriverUtils._currentBrowser;
            } else {
                return DriverUtils._currentBrowser;
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
            let currentBrowser: ProtractorBrowser = await DriverUtils.getDriverInstance();
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
            await DriverUtils.getDriverInstance().manage().window().maximize();
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
            await DriverUtils.getDriverInstance().quit();
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
    public static async restart(waitForAngularEnabled: boolean = false): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Restart browser`);
            let currentBrowser: ProtractorBrowser = DriverUtils.getDriverInstance();
            await currentBrowser.restart();
            DriverUtils._browserArray.length = 0;
            currentBrowser = DriverUtils.getDriverInstance();
            await currentBrowser.waitForAngularEnabled(waitForAngularEnabled);
        }
        catch (err) {
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
    public static async restartAllBrowsers(waitForAngularEnabled: boolean = false): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Restarting all browsers`);
            let numberBrowsers: number = DriverUtils._browserArray.length;
            let currentBrowser: ProtractorBrowser;
            if (numberBrowsers != 1) {
                for (let i: number = 1; i <= numberBrowsers; i++) {
                    DriverUtils._currentBrowser = DriverUtils._browserArray[i - 1];
                    currentBrowser = DriverUtils.getDriverInstance();
                    await currentBrowser.restart();
                    currentBrowser = DriverUtils.getDriverInstance();
                    await currentBrowser.waitForAngularEnabled(waitForAngularEnabled);
                }
            }

            currentBrowser = DriverUtils.getDriverInstance();
            await currentBrowser.restart();
            DriverUtils._browserArray.length = 0;
            currentBrowser = DriverUtils.getDriverInstance();
            await currentBrowser.waitForAngularEnabled(waitForAngularEnabled);
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.restartAllBrowsers, err.message)
        }
    }
    /**
     * Execute script
     * @static
     * @param {...any[]} var_args input argument
     * @return {Promise<{}>}
     * @memberof BrowserWapper
     *
     */
    public static async executeScript(script: string | Function, ...var_args: any[]): Promise<{}> {
        try {
            return await DriverUtils.getDriverInstance().executeScript(script, var_args);
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.executeScript, err.message);
        }
    }

    /**
     * Switch to target frame
     * @static
     * @param {number} indix of frame
     * @returns {Promise<void>} expected frame
     * @memberof BrowserWapper
     */
    public static async switchToFrame(index: number): Promise<void> {
        try {
            await DriverUtils.getDriverInstance().switchTo().frame(index);
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.switchToFrame, err.message);
        }
    }
    /**
     * Switch to target frame by ID
     * @static
     * @param {number} index of frame
     * @returns {Promise<void>} expect frame
     * @memberof BrowserWapper
     */
    public static async switchToFrameById(id: string): Promise<void> {
        try {
            let webElement: WebElement = DriverUtils.getDriverInstance().findElement(By.id('id'));
            await DriverUtils.getDriverInstance().switchTo().frame(webElement);
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.switchToFrameById, err.message)
        }
    }
    /**
     * wait for alert to be presented
     * @param {number} [timeoutInSecond = this._elementTimeout] maximum time to wait
     * @returns {Promise<this>}
     * @memberof BrowserWapper
     */
    public static async waitForAlertDisplay(): Promise<void> {
        try {
            await DriverUtils.getDriverInstance().wait(protractor.ExpectedConditions.alertIsPresent);
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.waitForAlertDisplay, err.message)
        }
    }
    /**
      * Check alert is presented
      * @returns {Promise<boolean>} 
      * @memberof DriverUtils
      */
    // public static async isAlertDisplay(): Promise<boolean> {
    //     try {
    //         return protractor.ExpectedConditions.alertIsPresent();
    //     } catch (err) {
    //         throw new errorwrapper.CustomError(this.isAlertDisplay, err.message);
    //     }
    // }

    /**
     * Accept alert popup
     * @param{number} [timeoutInSecond=this._elementTimeout] maximu time to wait
     * @returns {Promise<this>}
     * @memberof BrowserWapper
     */
    public static async acceptAlert(): Promise<void> {
        try {
            await DriverUtils.getDriverInstance().switchTo().alert().accept();
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.acceptAlert, err.message)
        }
    }
    /**
     * Close all browser
     * @static
     * @returns {Promise<void>}
     * @memberof BrowserWapper
     */
    public static async close(): Promise<void> {
        try {
            await DriverUtils.getDriverInstance().close();
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.close, err.message);
        }
    }
    /**
     * Sroll to top
     * @static
     * @return {Promise<void>}
     * @memberof BrowserWapper
     */
    public static async scrollToTop(): Promise<void> {
        try {
            await this.executeScript("window.scrollTo(0, 0);");
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.scrollToTop, err.message);
        }
    }
    /**
     * Sleep in second
     * @static
     * @return {Promise<void>}
     * @memberof BrowserWapper
     */
    public static async sleepInSecond(second: number): Promise<void> {
        try {
            await DriverUtils.getDriverInstance().sleep(second * 1000);
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.sleepInSecond, err.mess);
        }
    }
    // /**
    //  * Press hotkey on keyboard
    //  * @param {string} button want to press
    //  * @return {Promise<void>}
    //  * @memberof BrowserWapper
    //  */
    // public static async pressKey(button: Button): Promise<void>{

    // }
    // /**
    //  * Find all elements by location
    //  * @param {Locator} locator of element
    //  * @returns {Array<ElementWrapper>}
    //  */
    // public static async getElements(locator: Locator): Promise<Array<ElementWrapper>>

    /**
     * Create a new action sequence using this driver. 
     * The sequence will not be scheduled for execution until {@link acitons.ActionSequence#perform}
     * is call
     * @static
     * @return {ActionSequence}
     * @memberof BrowserWapper
     */
    public static getActions(): ActionSequence {
        try {
            return DriverUtils.getDriverInstance().actions();
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.getActions, err.message);
        }
    }
    /**
     * Setting wait for angular enabled
     * @static
     * @param {boolean} waitForAngularEnabled
     * @returns {Promise<void>}
     * @memberof BrowserWapper
     */
    public static async settingWaitForAngularEnabled(waitForAngularEnabled: boolean): Promise<void> {
        try {
            await Logger.write(FunctionType.UI, `Setting wait for agular enabled`);
            let currentBrowser: ProtractorBrowser = await DriverUtils.getDriverInstance()
            await currentBrowser.waitForAngularEnabled(waitForAngularEnabled);
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.settingWaitForAngularEnabled, err.message)
        }
    }
    /**
     * Refresh page
     * @static
     * @returns {Promise<void>}
     * @memberof BrowserWapper
     */
    public static async refreshPage(): Promise<void> {
        try {
            let currentBrowser: ProtractorBrowser = DriverUtils.getDriverInstance();
            await currentBrowser.switchTo().alert().then(async (alert) => {
                await this.acceptAlert();
            },
                () => { }
            );
        } catch (err) {
            throw new errorwrapper.CustomError(this.refreshPage, err.message);
        }
    }

    /**
     * Getting size of current window
     * @static
     * @returns{Promise<ISize>}
     * @member BrowserWapper 
     */
    public static async getSize(): Promise<ISize> {
        try {
            return await DriverUtils.getDriverInstance().driver.manage().window().getSize();
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.getSize, err.message);
        }
    }
    /**
     * Setting wait for anular enabled
     * @static
     * @param {boolean} enabled or not
     * @returns {Promise<BrowserWapper>}
     * @memberof BrowserWapper
     */
    public static async waitForAngularEnabled(enabled?: boolean): Promise<void> {
        try {
            let currentBrowser: ProtractorBrowser = await DriverUtils.getDriverInstance();
            await currentBrowser.waitForAngularEnabled(enabled);
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.waitForAngularEnabled, err.message);
        }
    }
    /**
     * Schedules a command to wait for a condition to hold. The condition may be
     * specified by a {@link Condition}, as a custom function, or
     * as a {@link promise.Promise}.
     * @static 
     * @param {WebElementCondition} condition The condition to 
     * wait on, defined as a promise, condition object, or  a function to
     * evaluate as a condition.
     * @param {number} [opt_timeout] How long to wait for the condition to be true.
     * @param {string} [opt_message] An optional message to use if the wait times out.
     * @returns {WebElementPromise} A promise that will be fulfilled
     * with the first truthy value returned by the condition function, or
     * rejected if the condition times out.
     * @memberof DriverUtils
     */
    public static wait<T>(condition: PromiseLike<T> | Condition<T> | ((driver: WebDriver) => T | PromiseLike<T>) | Function, opt_timeout?: number, opt_message?: string): promise.Promise<T> {
        try {
            return DriverUtils.getDriverInstance().wait(condition, opt_timeout, opt_message);
        } catch (err) {
            throw new errorwrapper.CustomError(this.wait, err.message);
        }
    }
   
}