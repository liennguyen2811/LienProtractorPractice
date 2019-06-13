import Editable from "../control-base-imp/editable-imp";
import { ITextBox } from "../control-common/i-textbox";
import { Locator, ElementFinder } from "protractor";

export default class Textbox extends Editable implements ITextBox{
    constructor(obj: Locator | ElementFinder) {
        super(obj); 
    }
}