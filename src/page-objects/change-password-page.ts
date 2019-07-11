import GeneralPage from "@page-objects/general-page";
import { by } from "protractor";
import { errorwrapper } from "@utilities/protractor-wappers/error-wapper";
import Textbox from "@utilities/protractor-wappers/control-common-imp/textbox";
import { ChangePasswordItem } from "@data-objects/general/general";
import Button from "@utilities/protractor-wappers/control-common-imp/button";

export default class ChangePassWordPage extends GeneralPage{
    private static _changePassWordPage: ChangePassWordPage;

    //Element
    change: Button= new Button(by.xpath("//input[@value='Change Password']"));

    //Dynamic Element
    protected changePassworkItem(item: string ): Textbox {
        return new Textbox(by.xpath(`//input[@id='${item}']`));
    }

    public static getChangePassWordPageInstance(): ChangePassWordPage {
        this._changePassWordPage = new ChangePassWordPage();
        return this._changePassWordPage;
    }

    public async changePassword(currentPassword: string, newPassword: string, confirmPassword: string): Promise<ChangePassWordPage>
     {  try
        {
            await this.changePassworkItem(ChangePasswordItem.CURRENTPASSWORD).sendKeys(currentPassword);
            await this.changePassworkItem(ChangePasswordItem.NEWPASSWORD).sendKeys(newPassword);
            await this.changePassworkItem(ChangePasswordItem.CONFIRMPASSWORD).sendKeys(confirmPassword);
            await this.change.click();
            return this;
        }catch (err){
            throw new errorwrapper.CustomError(this.changePassword, err.message);
        }
     }
}