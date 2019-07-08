
import { Locator, ElementFinder } from "protractor";
import ILink from "../control-common/i-link";
import { Clickable } from "../control-base-imp/clickable-imp";

export default class Link extends Clickable implements ILink{
    
    constructor(obj: Locator | ElementFinder) {
        super(obj); 
    }

}