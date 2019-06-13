import BaseControl from "./base-control-imp";
import { IEditable } from "../control-base/i-editable";
import { errorwrapper } from "../error-wapper";
import StopWatch from "@utilities/general/stop-watch";
import BrowserWrapper from "../browser-wrapper";
import { by, Locator, ElementFinder } from "protractor";

export default class Editable extends BaseControl implements IEditable{
    
    constructor(obj: Locator | ElementFinder) {
        super(obj); 
    }
     /**
     * Clear textbox element
     * @param {number}[timeoutInSecond = this._elementTimeout] maximum time to wat
     * @returns {Promise<this>}
     * @memberof ElementWrapper
     */
    public async clear(timeoutInSecond: number = this._elementTimeout): Promise<this> {
        try {
            if (timeoutInSecond < 0) {
                throw new errorwrapper.TimeoutError;
            }
            let stopWatch = new StopWatch();
            stopWatch.startClock();

            await this.wait(stopWatch.getTimeLeftInSecond(timeoutInSecond));
            await this._element.clear().then(
                async () => { },
                async (err: Error) => {
                    let _error: Error = <Error>err;
                    if (_error.message.includes("Element is not currently interactable")) {
                        await this.clear(stopWatch.getTimeLeftInSecond(timeoutInSecond));
                    } else {
                        throw _error;
                    }
                }
            );
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.clear, err.message);
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
    
}