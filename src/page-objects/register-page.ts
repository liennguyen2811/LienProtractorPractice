import { Account } from "@data-objects/railway/account";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wappers/browser-wrapper";
import { errorwrapper } from "@utilities/protractor-wappers/error-wapper";
import { browser, by } from "protractor";
import Textbox from "@utilities/protractor-wappers/control-common-imp/textbox";
import { RegisterItem } from "@data-objects/general/general";
import Button from "@utilities/protractor-wappers/control-common-imp/button";
import GeneralPage from "./general-page";

export default class RegisterPage extends GeneralPage {
    private static _registerPage: RegisterPage;

    // element
    Register: Button = new Button(by.xpath("//input[@value='Register']"));
    protected RegisterItem (registeritemname: string ): Textbox {
        return new Textbox(by.xpath(`//input[@id='${registeritemname}']`));
}

    public static async getRegisterPageInstance(): Promise<RegisterPage> {
        this._registerPage = new RegisterPage();
        return this._registerPage;
    }
    public async RegisterAccount(account: Account): Promise<RegisterPage> {
        try {
            await Logger.write(FunctionType.UI, `Going to enter infomation of new account`)
            await this.RegisterItem(RegisterItem.EMAIL).waitForPresenceOf();
            await this.RegisterItem(RegisterItem.EMAIL).sendKeys(account.Email);
            await this.RegisterItem(RegisterItem.PASSWORD).sendKeys(account.Password);
            await this.RegisterItem(RegisterItem.PID).scrollToElement();
            await this.RegisterItem(RegisterItem.PID).sendKeys(account.RegPID);
            await this.RegisterItem(RegisterItem.CONFIRMPASSWORD).sendKeys(account.Password);
            await this.Register.click();
            await BrowserWrapper.sleepInSecond(4);
            return this
        } catch (err) {
            throw new errorwrapper.CustomError(this.RegisterAccount, err.message);
        }
    }

}