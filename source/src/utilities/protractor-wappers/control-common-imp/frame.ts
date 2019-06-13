import Editable from "../control-base-imp/editable-imp";
import { IFrame } from "../control-common/i-frame";
import { WebElement, Locator, ElementFinder, By } from "protractor";
import BrowserWrapper from "../browser-wrapper";
import { errorwrapper } from "../error-wapper";

export default class Frame extends Editable implements IFrame{
    
    constructor(obj: Locator | ElementFinder) {
        super(obj); 
    }
    /**
     * Switch to target frame by ID
     * @static
     * @param {number} index of frame
     * @returns {Promise<void>} expect frame
     * @memberof BrowserWapper
     */
    public async switchToFrameById(id: string): Promise<void> {
        try {
            let webElement: WebElement = BrowserWrapper.getDriverInstance().findElement(By.id('id'));
            await BrowserWrapper.getDriverInstance().switchTo().frame(webElement);
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.switchToFrameById, err.message)
        }
    }
    /**
     * Switch to target frame
     * @static
     * @param {number} indix of frame
     * @returns {Promise<void>} expected frame
     * @memberof BrowserWapper
     */
    public async switchToFrame(index: number): Promise<void> {
        try {
            await BrowserWrapper.getDriverInstance().switchTo().frame(index);
        }
        catch (err) {
            throw new errorwrapper.CustomError(this.switchToFrame, err.message);
        }
    }
}