import { Locator, ElementFinder } from "protractor";


export interface IBaseControl{
    element(by: Locator, timeoutInSecond: number): Promise<ElementFinder>;
    getText(timeoutInSecond: number): Promise<string>;
    getControlValue(): Promise<string>;
    getElementCoordinate(position: string, timeoutInSecond?: number): Promise<number> ;
    getAttribute(attributeName: string, timeoutInSecond: number): Promise<string>;
    isDisplayed(timeoutInSecond: number): Promise<boolean>;
    isEnabled(timeoutInSecond: number): Promise<boolean>;
    isSelected(timeoutInSecond: number): Promise<boolean>;
    waitForVisibilityOf(timeoutInSecond: number ): Promise<this>;
    waitForControlStable(timeoutInSecond: number): Promise<void>;
    waitForPresenceOf(timeoutInSecond: number): Promise<this>
    wait(timeoutInSecond: number): Promise<this> 
    scrollToElement(timeoutInSecond: number): Promise<this>
    click(timeoutInSecond:number): Promise<this>

}