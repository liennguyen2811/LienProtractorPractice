import GeneralPage from "@page-objects/general-page";
import { by } from "protractor";
import ElementWrapper from "@utilities/protractor-wappers/element-wrapper";
import { Account } from "@data-objects/railway/account";

export default class RegisterPage extends GeneralPage{
    private static _registerPage: RegisterPage;

    // element
    protected txtEmail = new ElementWrapper(by.XPath("//input[@id='email']"));
    protected txtPasword = new ElementWrapper(by.XPath("//input[@id='password']"));
    protected txtConfirmPassword = new ElementWrapper(by.XPath("//input[@id='confirmPassword']"));
    protected txtPID = new ElementWrapper(by.XPath("//input[@id='pid']"));
    protected btnRegister = new ElementWrapper(by.XPath("//input[@value='Register']"));  

    public static async getRegisterPageInstance(): Promise<RegisterPage>{
        this._registerPage = new RegisterPage();
        return this._registerPage;
    }
    public async RegisterAccount(account: Account): Promise<RegisterPage>{
       
        await this.txtEmail.sendKeys(account.Email);
        await this.txtPasword.sendKeys(account.Password);
        await this.txtPID.sendKeys(account.RegPID);
        await this.txtPasword.sendKeys(account.Password);
        await this.btnRegister.click();
        return this;
    }

}