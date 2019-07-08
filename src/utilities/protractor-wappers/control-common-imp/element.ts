import { Clickable } from "../control-base-imp/clickable-imp";
import { Locator, ElementFinder } from "protractor";
import IClickable from "../control-base/i-clickable";

export default class Element extends Clickable implements IClickable{
    constructor(obj: Locator | ElementFinder) {
        super(obj); 
    }

}