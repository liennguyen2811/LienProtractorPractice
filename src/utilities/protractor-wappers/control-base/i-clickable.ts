import { ILocation } from "selenium-webdriver";

export default interface IClickable {
    click(timeoutInSecond: number): Promise<this>;
    doubleClick(timeoutInSecond: number): Promise<this>;
    moveMouseAndClick(timeoutInSecond: number, opt_offset: ILocation): Promise<this>
}