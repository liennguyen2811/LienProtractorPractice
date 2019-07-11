import { IBaseControl } from "../control-base/i-base-control";
import TestRunInfo from "@data-objects/general/test-run-info";
import BrowserWrapper from "../browser-wrapper";
import { errorwrapper } from "../error-wapper";
import StopWatch from "@utilities/general/stop-watch";
import { by, ElementFinder, ExpectedConditions as until, Locator, error } from "protractor";
import { CoordinateType } from "@data-objects/general/general";
import { ILocation, ISize, By } from "selenium-webdriver";
import { Browser } from "@data-objects/general/platform";
import { String } from 'typescript-string-operations';

export default class BaseControl implements IBaseControl{
    _elementTimeout: number = TestRunInfo.elementTimeout;
    _by: Locator;
    _element: ElementFinder;
    _locator: string;
    _dynamicLocator: string
     
    /**
     * Create a wapper for web element
     * @param {Locator | ElementFinder} obj
     */

    constructor(obj: Locator | ElementFinder) {
        if (obj.constructor.name === "ElementFinder") {
            let eleFinder = obj as ElementFinder;
            this._by = eleFinder.locator();
            this._element = eleFinder;
        } else {
            let loc = obj as Locator;
            this._by = loc;
            this._element = BrowserWrapper.getDriverInstance().element(this._by);

        }
    }
   
    /**
     * Find all child elements of an element
     * @param {by} Locator  of child element which want to find
     * @returns {Promise<this>}
     * @memberof Element
     */
    public async element(by: Locator, timeoutInSecond = this._elementTimeout): Promise<ElementFinder> {
        try {
            if (timeoutInSecond < 0) {
                throw new errorwrapper.TimeoutError();
            }
            let sw = new StopWatch();
            sw.startClock
            await this.wait(sw.getTimeLeftInSecond(timeoutInSecond));
            let child: ElementFinder
            try {
                child = this._element.element(by);
                // Check if element exist
                await child.isDisplayed();
            }
            catch (err) {
                if (err instanceof error.NoSuchElementError) {
                    await BrowserWrapper.sleepInSecond(0.5);
                    child = await this.element(by, sw.getTimeLeftInSecond(timeoutInSecond));
                }
                else {
                    throw err;
                }
            }
            return child
        } catch (err) {
            throw new errorwrapper.CustomError(this.element, err.message)
        }
    }
   /**
     * Wait for element to be clickable
     * @param {number} [timoutInSecond = this._elementTimeout] maximum time to wait
     * @return {Promise<void>}
     * @memberof ElementWrapper
     */
    public async wait(timeoutInSecond: number = this._elementTimeout): Promise<this> {
        await BrowserWrapper.wait(until.elementToBeClickable(this._element), timeoutInSecond * 1000).then(
            () => { },
            (error: Error) => { });
        return this;
    }
/**
         * Get element content
         * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait
         * @returns {Promise<string>} 
         * @memberof ElementWrapper
         */
        public async getText(timeoutInSecond: number = this._elementTimeout): Promise<string> {
            try {
                await this.waitForPresenceOf(timeoutInSecond);
                return await this._element.getText();
            } catch (err) {
                throw new errorwrapper.CustomError(this.getText, err.message);
            }
        }
        /**
     * wait for element to be presented
     * @param {number} [timeoutInSecond = this._elementTimeout] maximum time to wait
     * @returns {Promise<this>}
     * @memberof ElementWrapper
     */
    public async waitForPresenceOf(timeoutInSecond: number = this._elementTimeout): Promise<this> {
        await BrowserWrapper.wait(until.presenceOf(this._element), timeoutInSecond * 1000).then(
            () => { },
            (error: Error) => { });
        return this;
    }
    /**
    * Get value of control
    * @returns {Promise<string>} Value
    * @memberof ElementWrapper
    */
   public async getControlValue(): Promise<string> {
    try {
        return await this.getAttribute("value");
    } catch (err) {
        throw new errorwrapper.CustomError(this.getControlValue, err.message);
    }
}
/**
     * Get attribute
     * @param {string} attributeName name of attribute
     * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait
     * @returns {Promise<string>} 
     * @memberof ElementWrapper
     */
    public async getAttribute(attributeName: string, timeoutInSecond: number = this._elementTimeout): Promise<string> {
        let sw = new StopWatch();
        sw.startClock();

        try {
            await this.waitForPresenceOf(sw.getTimeLeftInSecond(timeoutInSecond));
            return await this._element.getAttribute(attributeName);
        } catch (err) {
            if (err instanceof error.StaleElementReferenceError) {
                return await this.getAttribute(attributeName, sw.getTimeLeftInSecond(timeoutInSecond));
            } else {
                throw new errorwrapper.CustomError(this.getAttribute, err.message);
            }
        }
    }
     /**
     * Check element displays or not
     * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait
     * @returns {Promise<boolean>} true or false
     * @memberof ElementWrapper
     */
    public async isDisplayed(timeoutInSecond: number = this._elementTimeout): Promise<boolean> {
        try {
            let isDisplayed: boolean = false;

            await this.waitForVisibilityOf(timeoutInSecond);
            await this._element.isDisplayed().then(
                async () => {
                    isDisplayed = true;
                },
                (error) => {
                    let _err: Error = <Error>error;

                    if (_err.message.includes("No element found using locator") || _err.message.includes("Index out of bound")) {
                        isDisplayed = false;
                    }
                }
            );
            return isDisplayed;
        } catch (err) {
            throw new errorwrapper.CustomError(this.isDisplayed, err.message);
        }
    }
    /**
     * wait for element to be visible
     * @param {number} [timeoutInSecond= this._elementTimeout] maximum time to wait
     * @returns {Promise<this>}
     * @memberof ElementWrapper
     */
    public async waitForVisibilityOf(timeoutInSecond: number = this._elementTimeout): Promise<this> {
        await BrowserWrapper.wait(until.visibilityOf(this._element), timeoutInSecond * 1000).then(
            () => { },
            (error: Error) => { });
        return this;
    }
     /**
    * Check element enabled or not
    * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait
    * @returns {Promise<boolean>} true or false
    * @memberof ElementWrapper
    */
   public async isEnabled(timeoutInSecond: number = this._elementTimeout): Promise<boolean> {
    try {
        await this.waitForPresenceOf(timeoutInSecond);
        return await this._element.isEnabled();
    } catch (err) {
        throw new errorwrapper.CustomError(this.isEnabled, err.message);
    }
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
 /**
    * Get coordinate of element
    * @param {number} [timeoutInSecond=this._elementTimeout]
    * @param {CoordinateType} left, right, top, bottom
    * @returns {Promise<number>}
    * @memberof ElementWrapper
    */
   public async getElementCoordinate(position: CoordinateType, timeoutInSecond?: number, ): Promise<number> {
    try {
        await this.waitForVisibilityOf(timeoutInSecond);
        let location: ILocation = await this._element.getLocation();
        let eSize: ISize = await this._element.getSize();

        switch (position) {
            case CoordinateType.LEFT:
                return location.x;
                ;
            case CoordinateType.TOP:
                return location.y;
                ;
            case CoordinateType.RIGHT:
                return location.x + eSize.width;
                ;
            case CoordinateType.BOTTOM:
                return location.y + eSize.height;
                ;
        }
        return 0;
    } catch (err) {
        throw new errorwrapper.CustomError(this.getElementCoordinate, err.message);
    }
}
/**
   * Wait until element is stable
   * @static
   * @param {ElementFinder} elem an element to wait
   * @param {number} [timeoutInSecond=60] time to wait
   * @returns {Promise<void>} 
   * @memberof ElementWrapper
   */
  public async waitForControlStable(timeoutInSecond: number = this._elementTimeout): Promise<void> {
    try {
        if (TestRunInfo.browser != Browser.IE) {
            let sw = new StopWatch();
            sw.startClock();

            await this.wait(sw.getTimeLeftInSecond(timeoutInSecond));
            let eleID = await this._element.getAttribute('id');
            let eleClass = await this._element.getAttribute('class');
            let bottom, left, right, top, width, x, y;

            if (eleID != null && eleID != undefined && eleID != "") {
                while (sw.getTimeLeftInSecond(timeoutInSecond) > 0) {
                    try {
                        let elementBottom = <string>await BrowserWrapper.executeScript(`return document.getElementById('${eleID}').getBoundingClientRect().bottom`);
                        let elementLeft = <string>await BrowserWrapper.executeScript(`return document.getElementById('${eleID}').getBoundingClientRect().left`);
                        let elementRight = <string>await BrowserWrapper.executeScript(`return document.getElementById('${eleID}').getBoundingClientRect().right`);
                        let elementTop = <string>await BrowserWrapper.executeScript(`return document.getElementById('${eleID}').getBoundingClientRect().top`);
                        let elementWidth = <string>await BrowserWrapper.executeScript(`return document.getElementById('${eleID}').getBoundingClientRect().width`);
                        let elementX = <string>await BrowserWrapper.executeScript(`return document.getElementById('${eleID}').getBoundingClientRect().x`);
                        let elementY = <string>await BrowserWrapper.executeScript(`return document.getElementById('${eleID}').getBoundingClientRect().y`);
                        if (elementBottom == bottom && elementLeft == left && elementRight == right && elementTop == top && elementWidth == width && elementX == x && elementY == y) {
                            break;
                        } else {
                            bottom = elementBottom
                            left = elementLeft;
                            right = elementRight;
                            top = elementTop;
                            width = elementWidth;
                            x = elementX;
                            y = elementY;
                        }
                    } catch (e) {
                    }
                    await BrowserWrapper.sleepInSecond(0.05)
                }
            } else if (eleClass != null && eleClass != undefined && eleClass != "") {
                while (sw.getTimeLeftInSecond(timeoutInSecond) > 0) {
                    try {
                        let elementBottom = <string>await BrowserWrapper.executeScript(`return document.getElementsByClassName('${eleClass}')[0].getBoundingClientRect().bottom`);
                        let elementLeft = <string>await BrowserWrapper.executeScript(`return document.getElementsByClassName('${eleClass}')[0].getBoundingClientRect().left`);
                        let elementRight = <string>await BrowserWrapper.executeScript(`return document.getElementsByClassName('${eleClass}')[0].getBoundingClientRect().right`);
                        let elementTop = <string>await BrowserWrapper.executeScript(`return document.getElementsByClassName('${eleClass}')[0].getBoundingClientRect().top`);
                        let elementWidth = <string>await BrowserWrapper.executeScript(`return document.getElementsByClassName('${eleClass}')[0].getBoundingClientRect().width`);
                        let elementX = <string>await BrowserWrapper.executeScript(`return document.getElementsByClassName('${eleClass}')[0].getBoundingClientRect().x`);
                        let elementY = <string>await BrowserWrapper.executeScript(`return document.getElementsByClassName('${eleClass}')[0].getBoundingClientRect().y`);
                        if (elementBottom == bottom && elementLeft == left && elementRight == right && elementTop == top && elementWidth == width && elementX == x && elementY == y) {
                            break;
                        } else {
                            bottom = elementBottom
                            left = elementLeft;
                            right = elementRight;
                            top = elementTop;
                            width = elementWidth;
                            x = elementX;
                            y = elementY;
                        }
                    } catch (e) {
                    }
                    await BrowserWrapper.sleepInSecond(0.05)
                }
            }
        }

    } catch (err) {
        throw new errorwrapper.CustomError(this.waitForControlStable, err.message);
    }
}
/**
 * The mouse will will moved over the target element
 * @param 
 * @param {ILocation} [timeoutInSecond= this._elementTimeout] maximum time to wait
 * @returns {Promise<this>}
 * @memberof ElementWrapper 
 */
public async moveMouse(opt_offset: ILocation, timeoutInSecond: number = this._elementTimeout): Promise<this> {
    try {
        if (timeoutInSecond < 0) {
            throw new errorwrapper.TimeoutError();
        }
        let sw = new StopWatch();
        sw.startClock();

        await this.wait(sw.getTimeLeftInSecond(timeoutInSecond));
        await BrowserWrapper.getActions().mouseMove(this._element, opt_offset).perform().then(
            async () => { },
            async (error) => {
                let _error: Error = <Error>error;
                if (_error.message.includes("Element is not currently interactable") || _error.name == errorwrapper.StaleElementReferenceError.caller.name) {
                    await this.moveMouse(opt_offset, sw.getTimeLeftInSecond(timeoutInSecond))
                } else {
                    throw _error;
                }
            });
        return this;
    }
    catch (err) {
        throw new errorwrapper.CustomError(this.moveMouse, err.message)
    }
}
/**
        * Scroll to element
        * @static
        * @returns {Promise<void>} 
        * @memberof ElementWrapper
        */
       public async scrollToElement(timeoutInSecond: number = this._elementTimeout): Promise<this> {
        try {
            let id: string = await this._element.getAttribute("id");
            await BrowserWrapper.executeScript(`document.getElementById('${id}').scrollIntoView(false);`);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.scrollToElement, err.message);
        }
    }
     /**
     * Clear textbox and input content to element with out check value
     * @param {(...(string | number | promise.Promise<string | number>)[])} var_args content to type
     * @returns {Promise<this>} 
     * @memberof ElementWrapper
     */
    public async sendKeys(value: any): Promise<this> {
        try {
            await BrowserWrapper.getActions().mouseMove(this._element).perform();
            await this._element.sendKeys(value).then(
                async () => { }
            );

            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.sendKeys, err.message);
        }
    }
    public async setDynamicValue(...args: any[]) {
        this._locator = String.Format(this._dynamicLocator, args);
		this._by = this.getByLocator();
	}
        

    public async getByLocator(){
        let body: string = this._locator.replace("[\\w\\s]*=(.*)",`${1}`).trim();
        let type: string = this._locator.replace("([\\w\\s]*)=.*", `${1}`).trim();
        switch (type) {
            case "class":
                return by.className(body);
            case "css":
                return by.cssSelector(body);
            case "id":
                return by.id(body);
            case "link":
                return by.linkText(body);
            case "xpath":
                return by.xpath(body);
            case "text":
                return by.xpath(String.Format("//*[contains(text(), '%s')]", body));
            case "name":
                return by.name(body);
            default:
                return by.xpath(this._locator);
            }

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
}