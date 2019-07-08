import IBaseControlImp from "./base-control-imp";
import { errorwrapper } from "../error-wapper";
import StopWatch from "@utilities/general/stop-watch";
import BaseControl from "./base-control-imp";
import BrowserWrapper from "../browser-wrapper";
import { ILocation } from "selenium-webdriver";
import { Locator, ElementFinder } from "protractor";
import IClickable from "../control-base/i-clickable";

export class Clickable extends BaseControl implements IClickable{

    constructor(obj: Locator | ElementFinder) {
        super(obj); 
    }
     /**
     * click and wait for click is effect
     * @param {number} [timeoutInSecond = this._elementTimeout] maximum time to wait
     * @returns {Promise<this>}
     * @memberof ElementWrapper
     */
    public async click(timeoutInSecond: number = this._elementTimeout): Promise<this> {

        if (timeoutInSecond < 0) {
            throw new errorwrapper.TimeoutError;
        }
        let stopWatch = new StopWatch();
        stopWatch.startClock();
        await this.wait(stopWatch.getTimeLeftInSecond(timeoutInSecond));
        await this._element.click().then(
            async () => { },
            async (err) => {
                let _error: Error = <Error>err;
                if (_error.message.includes("Other element would recieve the click") || _error.message.includes("element isnot attached to the page document")) {
                    await this.click(stopWatch.getTimeLeftInSecond(timeoutInSecond));
                } else {
                    throw _error;
                }
            });
        return this;
    }
    public async doubleClick(timeoutInSecond: number = this._elementTimeout): Promise<this> {
        try {
            if (timeoutInSecond < 0) {
                throw new errorwrapper.TimeoutError;

            }
            let stopWatch = new StopWatch();
            stopWatch.startClock();
            await this.wait(stopWatch.getTimeLeftInSecond(timeoutInSecond));
            await BrowserWrapper.getActions().doubleClick(this._element).perform().then(
                async () => { },
                async (err) => {
                    let _error: Error = <Error>err;
                    if (_error.message.includes("Other element would recieve the click") || _error.message.includes("element isnot attached to the page document")) {
                        await this.doubleClick(stopWatch.getTimeLeftInSecond(timeoutInSecond));
                    } else {
                        throw _error;
                    }
                });
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.doubleClick, err.message)
        }
    }
    /**
     * clear textbox and input content to element
     * @param {(... string | number | promise.Promise<string | number>)} var_args contents to type
     * @returns {Promise<this>}
     * @memberof ElementWrapper
     */
    public async type(value: any, timeoutInSecond: number = this._elementTimeout): Promise<this> {
        try {
            if (timeoutInSecond < 0) {
                throw new errorwrapper.TimeoutError;
            }
            let stopWatch = new StopWatch();
            stopWatch.startClock();
            await this.wait(stopWatch.getTimeLeftInSecond(timeoutInSecond));
            await BrowserWrapper.getActions().mouseMove(this._element).perform()
            await this._element.sendKeys(value).then(
                async () => {
                    let enterValue: string = await this.getControlValue();
                    if (enterValue == null) {
                        enterValue = await this.getText();
                        if ((enterValue != value)) {
                            return await this.type(value, stopWatch.getTimeLeftInSecond(timeoutInSecond));
                        }
                        else {
                            if ((enterValue != value)) {
                                return await this.type(value, stopWatch.getTimeLeftInSecond(timeoutInSecond));
                            }
                        }
                    }
                }
            );
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.type, err.message);
        }
    }
    /**
    * Move mouse and click on the target
    * @param {ILocation} [opt_offset]
    * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait
    * @returns {Promise<this>} 
    * @memberof ElementWrapper
    */
   public async moveMouseAndClick(timeoutInSecond: number = this._elementTimeout, opt_offset: ILocation,): Promise<this> {
    try {
        if (timeoutInSecond < 0) {
            throw new errorwrapper.NoSuchElementError(this._by);
        }

        let stopWatch = new StopWatch();
        stopWatch.startClock();

        await this.wait(stopWatch.getTimeLeftInSecond(timeoutInSecond));
        await BrowserWrapper.getActions().mouseMove(this._element, opt_offset).click().perform().then(
            async () => { },
            async (error) => {
                let _error: Error = <Error>error;

                if (_error.message.includes("Element is not currently interactable") || _error.name == errorwrapper.StaleElementReferenceError.name) {
                    await this.moveMouseAndClick(stopWatch.getTimeLeftInSecond(timeoutInSecond), opt_offset);
                } else {
                    throw _error;
                }
            });
        return this;
    } catch (err) {
        throw new errorwrapper.CustomError(this.moveMouseAndClick, err.message);
    }
}
}