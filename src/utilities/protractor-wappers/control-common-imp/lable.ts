import { Clickable } from "../control-base-imp/clickable-imp";
import { Ilable } from "../control-common/i-lable";
import { Locator, ElementFinder } from "protractor";

export default class Lable extends Clickable implements Ilable{
    constructor(obj: Locator | ElementFinder) {
        super(obj); 
    }
}