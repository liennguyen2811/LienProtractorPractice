import GeneralPage from "./general-page";
import { by } from "protractor";
import ElementWrapper from "../utilities/protractor-wappers/element-wrapper";
import HomePage from "./home-page";
import { errorwrapper } from "../utilities/protractor-wappers/error-wapper";

export default class LoginPage extends GeneralPage {
    private static _loginPage: LoginPage;

    // element
    protected txtUsername = new ElementWrapper(by.xpath("//input[@id='username']"));
    protected txtPasword = new ElementWrapper(by.xpath("//input[@id='password']"));
    protected btnLogin = new ElementWrapper(by.xpath("//input[@value='login']"));
    protected lbErrorMessage = new ElementWrapper(by.xpath("//p[@class='message error LoginForm']"));

    public static getLoginPageInstance(): LoginPage {
        this._loginPage = new LoginPage();
        return this._loginPage;
    }
    public async Login(username: string, password: string): Promise<HomePage> {
        // Submit login credetials
        await this.txtUsername.sendKeys(username);
        if (password != "") {
            await this.txtPasword.sendKeys(password);
        }
        await this.btnLogin.click();
        // Land on Home page
        return HomePage.getHomePageInstance();
    }
    public async geterrormessage(): Promise<string> {
        return await this.lbErrorMessage.getText();
    }
    
    /**	
	 * Check if login page is displayed or not
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isLoginPageDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.txtPasword.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLoginPageDisplayed, err.message);
        }
    }
}