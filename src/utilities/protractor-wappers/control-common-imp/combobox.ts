import { Clickable } from "../control-base-imp/clickable-imp";
import { ICombobox } from "../control-common/i-combobox";
import { errorwrapper } from "../error-wapper";
import BrowserWrapper from "../browser-wrapper";
import { by, Locator, ElementFinder } from "protractor";
import StopWatch from "@utilities/general/stop-watch";

export default class Combobox extends Clickable implements ICombobox{
    
    constructor(obj: Locator | ElementFinder) {
        super(obj); 
    }
    /**
     * Click <div> tad and select child opiton by ID
     * @param{string} id of child element
     * @param {number} [timeoutInSecond = this._elementTimeout] maximum time to wat
     * @return {Promise<void>}
     * @memberof SelectElementWrapper 
     */
    public async selectByID(id: string, timeoutInSecond: number= this._elementTimeout): Promise<void>{
        let sw = new StopWatch();
        sw.startClock();
        try{

            await this._element.waitForControlStable();
            await this._element.click()
            let e = await this._element.element(by.xpath(`//*[@id = '${id}']`));
            await e.click();
        } catch (_err){
            let err: Error = _err;
            if (err.message.includes("element not visible")|| err.message.includes("element not interactable")){
                await this.selectByID(id, sw.getTimeLeftInSecond(timeoutInSecond));
            }else {
                throw new errorwrapper.CustomError(this.selectByID, err.message)
            }
        }
    }

    /**
     * Click <select> tag and choose <option> tab  
     * @param {Locator} by select locator
     * @param {number} [timeoutInSecond=this._elementTimeout] maximum time to wait
     * @returns {Promise<void>}
     * @memberof SelectElementWrapper
     */
    public async selectOption(by: Locator, timeoutInSecond: number = this._elementTimeout): Promise<void> {
        let sw = new StopWatch();
        sw.startClock();

        try {
            await this._element.waitForControlStable();
            await this._element.click();
            let optionElement = await this._element.element(by);
            await optionElement.click();
            await this._element.waitForControlStable();
        } catch (err) {
            if ((<Error>err).message.includes("element not interactable")) {
                await this.selectOption(by, sw.getTimeLeftInSecond(timeoutInSecond));
            } else {
                throw new errorwrapper.CustomError(this.selectOption, err.message);
            }
        }
    }
    /**
     * Select option element by Text
     * @param {string} text of option
     * @returns {Promise<void>}
     * @memberof SelectElementWrapper
     */
    public async selectOptionByText(text: string){
        try{
            let tagName= await this._element.getAttribute("tagName");
            let locator: Locator = "";
            let tagNameLowCase = await tagName.toLowerCase();
            if(tagNameLowCase == "select"){
                locator = by.xpath(`//option[text()='${text}']`);
            }else if (tagNameLowCase =="div"){
                locator = by.xpath(`//div[@role='option']//span[contains(text(),'${text}')]`)
            }
            await this.selectOption(locator);
        } catch(err){
            throw new errorwrapper.CustomError(this.selectOptionByText, err.message)
        }
    }
    
    /**
    * Select option element by text with index
    * @param {string} text text of option
    * @param {number} index index of option
    * @returns {Promise<void>} 
    * @memberof SelectElementWrapper
    */
   public async selectOptionByTextWithIndex(text: string, index: number): Promise<void> {
    try {
        let tagName: string = await this._element.getAttribute("tagName");
        let locator: Locator ="";

        if (tagName.toLowerCase() == "select") {
            locator = by.xpath(`(//option[text()='${text}'])[${index}]`);
        } else if (tagName.toLowerCase() == "div") {
            locator = by.xpath(`(//div[@role='option']//span[text()='${text}'])[${index}]`);
        }

        await this.selectOption(locator);
    } catch (err) {
        throw new errorwrapper.CustomError(this.selectOptionByTextWithIndex, err.message);
    }
}

/**
 * Select option element by text contains
 * @param {string} text text of option
 * @returns {Promise<void>} 
 * @memberof SelectElementWrapper
 */
public async selectOptionByTextContains(text: string): Promise<void> {
    try {
        let tagName: string = await this._element.getAttribute("tagName");
        let locator: Locator = "";

        if (tagName.toLowerCase() == "select") {
            locator = by.xpath(`//option[contains(text(),'${text}')]`);
        } else if (tagName.toLowerCase() == "div") {
            locator = by.xpath(`//div[@role='option']//span[contains(text(),'${text}')]`);
        }

        await this.selectOption(locator);
    } catch (err) {
        throw new errorwrapper.CustomError(this.selectOptionByTextContains, err.message);
    }
}

/**
 * Select option element by index
 * @param {number} index index of option
 * @returns {Promise<void>} 
 * @memberof SelectElementWrapper
 */
public async selectOptionByIndex(index: number): Promise<void> {
    try {
        let tagName: string = await this._element.getAttribute("tagName");
        let locator: Locator = "";

        if (tagName.toLowerCase() == "select") {
            let elementId: string = await this._element.getAttribute("id");
            if (elementId == null) {
                let elementClass: string = await this._element.getAttribute("className");
                await BrowserWrapper.executeScript(`document.getElementsByClassName("${elementClass}").selectedIndex = ${index}`);
            } else
                await BrowserWrapper.executeScript(`document.getElementById("${elementId}").selectedIndex = ${index}`);
        } else if (tagName.toLowerCase() == "div") {
            locator = by.xpath(`//div[@role='option'][${index}]`);
            await this.selectOption(locator);
        }

    } catch (err) {
        throw new errorwrapper.CustomError(this.selectOptionByIndex, err.message);
    }
}
}