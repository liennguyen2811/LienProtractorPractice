
import { by } from "protractor";
import ElementWrapper from "@utilities/protractor-wappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wappers/error-wapper";
import GeneralPage from "./general-page";
import HomePage from "./home-page";
import Textbox from "@utilities/protractor-wappers/control-common-imp/textbox";
import Button from "@utilities/protractor-wappers/control-common-imp/button";
import Lable from "@utilities/protractor-wappers/control-common-imp/lable";

export default class LoginPage extends GeneralPage {
    private static _loginPage: LoginPage;

    // element
    password: Textbox= new Textbox(by.xpath("//input[@id='password']"));
    userName: Textbox = new Textbox(by.xpath("//input[@id='username']"));
    logIn: Button = new Button(by.xpath("//input[@value='login']"));
    errorMessage: Lable = new Lable(by.xpath("//p[@class='message error LoginForm']"));
	
    public static getLoginPageInstance(): LoginPage {
        this._loginPage = new LoginPage();
        return this._loginPage;
    }
    public async login(username: string, password: string): Promise<HomePage> {
        try{
        // Submit login credetials
        await this.password.scrollToElement();
        await this.userName.sendKeys(username);
        if (password != "") {
            await this.password.sendKeys(password);
        }
        await this.logIn.click();
        // Land on Home page
        return HomePage.getHomePageInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.login, err.message);
    }
    }
    public async geterrormessage(): Promise<string> {
        return await this.errorMessage.getText();
    }
    
    /**	
	 * Check if login page is displayed or not
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async isLoginPageDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.password.isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLoginPageDisplayed, err.message);
        }
    }
     /**	
	 * Check if login page is displayed or not
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async checkNonPassWordWithValidInfo(username: string, password: string): Promise<string> {
        try {
            
            for (let i: number = 0; i< 4; i++){ 
                await this.login("liennguyenlogigear12@gmail.com", "liennguyen1");  
            }
            let homePage: HomePage = await this.login(username, password);
            return  await homePage.getNonpasswordmessage()
           

        } catch (err) {
            throw new errorwrapper.CustomError(this.checkNonPassWordWithValidInfo, err.message);
        }
    }
}