import { Clickable } from "../control-base-imp/clickable-imp";
import { IBButton } from "../control-common/i-bbutton";
import { Locator, ElementFinder } from "protractor";

export default class Button extends Clickable implements IBButton{
    
    constructor(obj: Locator | ElementFinder) {
        super(obj); 
    }

}
