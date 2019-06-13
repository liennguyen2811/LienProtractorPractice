import { Clickable } from "../control-base-imp/clickable-imp";
import { IClickable } from "../control-base/i-clickable";
import { Locator, ElementFinder } from "protractor";

export default class Element extends Clickable implements IClickable{
    constructor(obj: Locator | ElementFinder) {
        super(obj); 
    }

}