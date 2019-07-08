
import { Locator } from "protractor";
import IClickable from "../control-base/i-clickable";

export interface ICombobox extends IClickable{
    selectByID(id: string, timeoutInSecond: number): Promise<void>;
    selectOption(by: Locator, timeoutInSecond: number): Promise<void>
    selectOptionByText(text: string): Promise<void>;
    selectOptionByTextWithIndex(text: string, index: number): Promise<void>;
    selectOptionByTextContains(text: string): Promise<void>;
    selectOptionByIndex(index: number): Promise<void>;

}
