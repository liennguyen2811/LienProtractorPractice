import Editable from "../control-base-imp/editable-imp";
import { Icheckbox } from "../control-common/i-checkbox";
import { errorwrapper } from "../error-wapper";
import StopWatch from "@utilities/general/stop-watch";
import { Locator, ElementFinder, by } from "protractor";

export default class Checkbox extends Editable implements Icheckbox{
    
    constructor(obj: Locator | ElementFinder) {
        super(obj); 
    }
    /**
     * Set checkbox element on or off
     *@param {boolean} state true = on, false = off
     *@returns {Promise<this>}
     *@memberof ElementWrapper
     */
    public async setCheckBox(state: boolean, timeoutInSecond: number = this._elementTimeout): Promise<this> {
        try {
            let tagName: string = await this._element.getAttribute("tagName");
            let isChecked: boolean = false;

            if (timeoutInSecond < 0) {
                throw new errorwrapper.TimeoutError();
            }

            let stopWatch = new StopWatch();
            stopWatch.startClock();

            await this.wait(stopWatch.getTimeLeftInSecond(timeoutInSecond));

            if (tagName.toLowerCase() == "div") {
                let childElement = await this._element.element(by.xpath('(//input[not(@disabled)])[1]'));
                isChecked = await childElement.isSelected();
            } else if (tagName.toLowerCase() == "input") {
                isChecked = await this._element.isSelected();
            }

            if ((isChecked == false && state) || isChecked && state == false) {
                await this._element.click().then(
                    async () => { },
                    async (error) => {
                        if (<Error>error.message.includes("Other element would receive the click")) {
                            await this.setCheckBox(state, stopWatch.getTimeLeftInSecond(timeoutInSecond));
                        } else {
                            throw <Error>error;
                        }
                    });
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.setCheckBox, err.message);
        }
    }

}