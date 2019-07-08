
import Link from "@utilities/protractor-wappers/control-common-imp/link";
import { by } from "protractor";
import { Logger, FunctionType } from "@utilities/general/logger";
import { errorwrapper } from "@utilities/protractor-wappers/error-wapper";
import LoginPage from "./login-page";



export default class GeneralPage {

    private static _generalPage: GeneralPage ;

    // Element
    navigationItem: Link = new Link(by.xpath("//div[@id= 'menu']//a[@href = '/Account/Login.cshtml']"));

    /**
     * Go to LoginPage
     * @returns {Promise<LoginPage>}
     * @memberof GeneralPage
     */
    public async goToLoginPage(): Promise<LoginPage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to Login Page`)
        await this.navigationItem.click()
        let loginPage  = require(`../page-objects/login-page`).default;
        return  await loginPage.getLoginPageInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.goToLoginPage, err.message)
    }     
    }

}