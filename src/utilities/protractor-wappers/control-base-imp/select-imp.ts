import BaseControl from "./base-control-imp";
import { errorwrapper } from "../error-wapper";
import StopWatch from "@utilities/general/stop-watch";
import { ISelect } from "../control-base/i-select";
import { by, Locator, ElementFinder } from "protractor";

export default class Select extends BaseControl implements ISelect{

    constructor(obj: Locator | ElementFinder) {
        super(obj); 
    }
     /**
   * Check element is selected
   * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait
   * @returns {Promise<boolean>} true or false
   * @memberof ElementWrapper
   */
  public async isSelected(timeoutInSecond: number = this._elementTimeout): Promise<boolean> {
    try {
        await this.wait(timeoutInSecond);
        return await this._element.isSelected();
    } catch (err) {
        throw new errorwrapper.CustomError(this.isSelected, err.message);
    }
}
}