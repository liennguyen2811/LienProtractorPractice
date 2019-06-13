import GeneralPage from "@page-objects/general-page";
import ElementWrapper from "@utilities/protractor-wappers/element-wrapper";
import { by } from "protractor";

export default class ChangePassWordPage extends GeneralPage{
    private static _changePassWordPage: ChangePassWordPage;
    //Element
    protected txtCurrentPassword = new ElementWrapper(by.XPath("//input[@id='currentPassword']"));
    protected txtNewPassword = new ElementWrapper(by.XPath("//input[@id='newPassword']"));
    protected txtConfirmPassword = new ElementWrapper(by.XPath("//input[@id='confirmPassword']"));
    protected btnChangePassword = new ElementWrapper(by.XPath("//input[@value='Change Password']"));

    // element

    public static async getChangePassWordInstance(): Promise<ChangePassWordPage>{
        this._changePassWordPage = new ChangePassWordPage();
        return this._changePassWordPage;
    }
    public ChangePassword(currentPassword: string, newPassword: string, confirmPassword: string): ChangePassWordPage
        {
            this.txtCurrentPassword.sendKeys(currentPassword);
            this.txtNewPassword.sendKeys(newPassword);
            this.txtConfirmPassword.sendKeys(confirmPassword);
            this.btnChangePassword.click();
            return this;
        }

}