import GeneralPage from "@page-objects/general-page";
import { by } from "protractor";
import ElementWrapper from "@utilities/protractor-wappers/element-wrapper";
import HomePage from "@page-objects/home-page";
import { errorwrapper } from "@utilities/protractor-wappers/error-wapper";

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
    public async login(username: string, password: string): Promise<HomePage> {
        try{
        // Submit login credetials
        await this.txtUsername.sendKeys(username);
        if (password != "") {
            await this.txtPasword.sendKeys(password);
        }
        await this.btnLogin.click();
        // Land on Home page
        return HomePage.getHomePageInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.login, err.message);
    }
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
     /**	
	 * Check if login page is displayed or not
	 * @returns {Promise<boolean>}
	 * @memberof MaxCall
	 */
    public async checkNonPassWordWithValidInfo(username: string, password: string): Promise<string> {
        try {
            
            for (let i: number = 0; i ++; i <4){ 
                console.log("invalid password, ", i);
                await this.login("liennguyenlogigear12@gmail.com", "liennguyen1");  
            }
            let homePage: HomePage = await this.login(username, password);
            return  await homePage.getNonpasswordmessage()

        } catch (err) {
            throw new errorwrapper.CustomError(this.checkNonPassWordWithValidInfo, err.message);
        }
    }
}