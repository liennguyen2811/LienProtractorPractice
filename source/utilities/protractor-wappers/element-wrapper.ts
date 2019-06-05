
import BrowserWrapper from "./browser-wrapper";
import { errorwrapper } from "./error-wapper";
import StopWatch from "../general/stop-watch";
import { by, ElementFinder, ExpectedConditions as until, Locator, ProtractorBrowser, error } from "protractor";

export default class ElementWrapper {
    private _elementTimeout: number = 60;
    private _by: Locator;
    private _element : ElementFinder;

    /**
     * Create a wapper for web element
     * @param {Locator | ElementFinder} obj
     */

     constructor (obj: Locator | ElementFinder){
         if (obj.constructor.name ==="ElementFinder"){
             let eleFinder = obj as ElementFinder;
             this._by = eleFinder.locator();
             this._element = eleFinder;
         } else {
             let loc = obj as Locator;
             this._by= loc;
             this._element = BrowserWrapper.getDriverInstance().element(this._by);

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
            (error) => { });
        return this;
    }
    /**
     * wait for element to be presented
     * @param {number} [timeoutInSecond = this._elementTimeout] maximum time to wait
     * @returns {Promise<this>}
     * @memberof ElementWrapper
     */
    public async waitForPresenceOf(timeoutInSecond: number= this._elementTimeout): Promise<this>{
        await BrowserWrapper.wait(until.presenceOf(this._element), timeoutInSecond * 1000).then(
            () => { },
            (error) => { });
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
     * wait for element to be visible
     * @param {number} [timeoutInSecond= this._elementTimeout] maximum time to wait
     * @returns {Promise<this>}
     * @memberof ElementWrapper
     */
    public async waitForVisibilityOf(timeoutInSecond: number= this._elementTimeout): Promise<this>{
        await BrowserWrapper.wait(until.visibilityOf(this._element), timeoutInSecond * 1000).then(
            () => { },
            (error) => { });
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
     * click and wait for click is effect
     * @param {number} [timeoutInSecond = this._elementTimeout] maximum time to wait
     * @returns {Promise<this>}
     * @memberof ElementWrapper
     */
    public async click (timeoutInSecond: number = this._elementTimeout): Promise<this>{
    
        if (timeoutInSecond< 0){
            throw new errorwrapper.TimeoutError; 
        }
        let stopWatch = new StopWatch();
        stopWatch.startClock();
        await this.wait(stopWatch.getTimeLeftInSecond(timeoutInSecond));
        await this._element.click().then(
            async() => {},
            async(err) => {
                let _error: Error = <Error>err;
                if (_error.message.includes("Other element would recieve the click")|| _error.message.includes("element isnot attached to the page document")){
                    await this.click(stopWatch.getTimeLeftInSecond(timeoutInSecond));
                }else {
                    throw _error;
                }
    });
        return this;
    }
    /**
     * double Click and wait for click is effect
     * @param {number} [timeoutInSecond = this._elementTimeout] maximum time to wait
     * @returns {Promise<this>}
     * @memberof ElementWrapper
     */
    public async doubleClick (timeoutInSecond: number = this._elementTimeout): Promise<this>{
        try{
        if (timeoutInSecond< 0){
            throw new errorwrapper.TimeoutError; 
            
        }
        let stopWatch = new StopWatch();
        stopWatch.startClock();
        await this.wait(stopWatch.getTimeLeftInSecond(timeoutInSecond));
        await BrowserWrapper.getActions().doubleClick(this._element).perform().then(
            async() => {},
            async(err) => {
                let _error: Error = <Error>err;
                if (_error.message.includes("Other element would recieve the click")|| _error.message.includes("element isnot attached to the page document")){
                    await this.doubleClick(stopWatch.getTimeLeftInSecond(timeoutInSecond));
                }else {
                    throw _error;
                }
    });
        return this;
    } catch (err){
        throw new errorwrapper.CustomError(this.doubleClick, err.message)
    }
}
    /**
     * clear textbox and input content to element
     * @param {(... string | number | promise.Promise<string | number>)} var_args contents to type
     * @returns {Promise<this>}
     * @memberof ElementWrapper
     */
    public async type (value: any,timeoutInSecond: number = this._elementTimeout): Promise<this>{
        try{
            if (timeoutInSecond< 0){
                throw new errorwrapper.TimeoutError;   
            }
            let stopWatch = new StopWatch();
        stopWatch.startClock();
        await this.wait(stopWatch.getTimeLeftInSecond(timeoutInSecond));
        await BrowserWrapper.getActions().mouseMove(this._element).perform()
        await this._element.sendKeys(value).then(
            async() => {
                let enterValue: string = await this.getControlValue();
                if (enterValue == null){
                    enterValue = await this.getText();
                    if((enterValue != value)){
                        return await this.type(value, stopWatch.getTimeLeftInSecond(timeoutInSecond));
                    }
                    else{
                        if((enterValue != value)){
                            return await this.type(value, stopWatch.getTimeLeftInSecond(timeoutInSecond));
                        }
                    }
              }  }
        );
             return this;
        } catch (err)
        {
            throw new errorwrapper.CustomError(this.type,err.message);
        }
    }
    /**
     * Upload Attachment file
     * @param {string} filePath to upload
     * @returns {Promise<this>}
     * @memberof ElementWrapper
     */
    public async uploadFile(filePath: string): Promise<this>{
        try{
            await this.wait(this._elementTimeout);
            await BrowserWrapper.getActions().mouseMove(this._element).perform();
            await this._element.sendKeys(filePath);
            return this;
        }
        catch (err){
            throw new errorwrapper.CustomError(this.uploadFile, err.message);
        }
    }
    /**
     * Press button on keyboard
     * @param {string} button button want to press
     * @returns {Promise<this>} 
     * @memberof ElementWrapper
     */
    public async pressButton(button: string): Promise<this> {
        try {
            await this.wait(this._elementTimeout);
            await BrowserWrapper.getActions().mouseMove(this._element).perform();
            await this._element.sendKeys(button);
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.pressButton, err.message);
        }
    }
    /**
     * Clear textbox element
     * @param {number}[timeoutInSecond = this._elementTimeout] maximum time to wat
     * @returns {Promise<this>}
     * @memberof ElementWrapper
     */
    public async clear (timeoutInSecond: number = this._elementTimeout): Promise<this>{
        try{
            if (timeoutInSecond< 0){
                throw new errorwrapper.TimeoutError;  
            }
        let stopWatch = new StopWatch();
        stopWatch.startClock();

        await this.wait(stopWatch.getTimeLeftInSecond(timeoutInSecond));
        await this._element.clear().then(
            async() =>{},
            async(err) => {
                let _error: Error = <Error> err;
                if (_error.message.includes("Element is not currently interactable")){
                    await this.clear(stopWatch.getTimeLeftInSecond(timeoutInSecond));
                } else{
                    throw _error;
                }
                    
              }  
        );
             return this;
        } catch (err)
        {
            throw new errorwrapper.CustomError(this.type,err.message);
        }
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
            let isChecked: boolean=false;

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
                () => {
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
     * Get CssValue
     * @param {string} cssValue name of CSS
     * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait
     * @returns {Promise<string>} 
     * @memberof ElementWrapper
     */
    public async getCssValue(cssValue: string, timeoutInSecond: number = this._elementTimeout): Promise<string> {
        let sw = new StopWatch();
        sw.startClock();

        try {
            await this.waitForPresenceOf(sw.getTimeLeftInSecond(timeoutInSecond));
            return await this._element.getCssValue(cssValue);
        } catch (err) {
            if (err instanceof error.StaleElementReferenceError) {
                return await this.getCssValue(cssValue, sw.getTimeLeftInSecond(timeoutInSecond));
            } else {
                throw new errorwrapper.CustomError(this.getCssValue, err.message);
            }
        }
    }
     /**
     * Wait for element disappears
     * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait
     * @returns {Promise<this>} 
     * @memberof ElementWrapper
     */
    public async waitUntilDisappear(timeoutInSecond: number = this._elementTimeout): Promise<this> {
        try {
            await BrowserWrapper.wait(until.invisibilityOf(this._element), timeoutInSecond * 1000).then(
                () => { },
                (error) => { });
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitUntilDisappear, err.message);
        }
    }
     /**
     * Wait for property of element is changed
     * @param {string} property property of element
     * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait
     * @returns {Promise<this>} 
     * @memberof ElementWrapper
     */
    public async waitUntilPropertyChange(property: string, timeoutInSecond: number = this._elementTimeout): Promise<this> {
        try {
            let stopWatch = new StopWatch();
            stopWatch.startClock();

            let previousValue: string = await this.getAttribute(property);
            let currentValue: string = previousValue;

            while (stopWatch.getTimeLeftInSecond(timeoutInSecond) > 0 && (previousValue == currentValue)) {
                await BrowserWrapper.sleepInSecond(0.5);
                currentValue = await this.getAttribute(property);
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitUntilPropertyChange, err.message);
        }
    }
      /**
     * Wait until element's property stop changing
     * @static
     * @param {ElementFinder} elem an element to wait
     * @param {string} property property's name
     * @param {number} [timeoutInSecond=60] time to wait
     * @param {string} [errorMsg="Could not find element"] message if cannot find element
     * @returns {Promise<void>} 
     * @memberof ElementWrapper
     */
    public async waitUntilPropertyNotChange(property: string, timeoutInSecond: number = this._elementTimeout): Promise<this> {
        try {
            let sw = new StopWatch();
            sw.startClock();

            let previousValue: string = "previousValue";
            let currentValue: string = await this.getAttribute(property);

            while (sw.getTimeLeftInSecond(timeoutInSecond) > 0 && (previousValue != currentValue)) {
                previousValue = currentValue;
                await BrowserWrapper.sleepInSecond(0.5);
                currentValue = await this.getAttribute(property);
            }
            return this;
        } catch (err) {
            throw new errorwrapper.CustomError(this.waitUntilPropertyNotChange, err.message);
        }
    }
     /**
    * Wait until element's CssValue stop changing
    * @static
    * @param {ElementFinder} elem an element to wait
    * @param {string} cssValue cssValue's name
    * @param {number} [timeoutInSecond=60] time to wait
    * @returns {Promise<this>} 
    * @memberof ElementWrapper
    */
   public async waitUntilCssValueNotChange(cssValue: string, timeoutInSecond: number = this._elementTimeout): Promise<this> {
    try {
        let sw = new StopWatch();
        sw.startClock();

        let previousValue: string = "previousValue";
        let currentValue: string = await this.getCssValue(cssValue);

        while (sw.getTimeLeftInSecond(timeoutInSecond) > 0 && (previousValue != currentValue)) {
            previousValue = currentValue;
            await BrowserWrapper.sleepInSecond(0.5);
            currentValue = await this.getCssValue(cssValue);
        }
        return this;
    } catch (err) {
        throw new errorwrapper.CustomError(this.waitUntilCssValueNotChange, err.message);
    }
}
}


