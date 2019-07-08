import { Clickable } from "../control-base-imp/clickable-imp";
import { Locator, ElementFinder } from "protractor";
import IBButton from "../control-common/i-bbutton";

export default class Button extends Clickable implements IBButton{
    
    constructor(obj: Locator | ElementFinder) {
        super(obj); 
    }

}
