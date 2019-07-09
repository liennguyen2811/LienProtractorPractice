
import { by } from "protractor";
import ElementWrapper from "@utilities/protractor-wappers/element-wrapper";
import { errorwrapper } from "@utilities/protractor-wappers/error-wapper";
import GeneralPageOld from "./general-page-old";
import HomePageOld from "./home-page-old";


export default class LoginPageOld extends GeneralPageOld {
    private static _loginPageold: LoginPageOld;

    // element
    protected txtUsername = new ElementWrapper(by.xpath("//input[@id='username']"));
    protected txtPasword = new ElementWrapper(by.xpath("//input[@id='password']"));
    protected btnLogin = new ElementWrapper(by.xpath("//input[@value='login']"));
    protected lbErrorMessage = new ElementWrapper(by.xpath("//p[@class='message error LoginForm']"));

    public static getLoginPageOldInstance(): LoginPageOld {
        this._loginPageold = new LoginPageOld();
        return this._loginPageold;
    }
    public async login(username: string, password: string): Promise<HomePageOld> {
        try{
        // Submit login credetials
        await this.txtPasword.scrollToElement();
        await this.txtUsername.sendKeys(username);
        if (password != "") {
            await this.txtPasword.sendKeys(password);
        }
        await this.btnLogin.click();
        // Land on Home page
        return HomePageOld.getHomePageInstance();
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
            
            for (let i: number = 0; i< 4; i++){ 
                console.log("invalid password, ", i);
                await this.login("liennguyenlogigear12@gmail.com", "liennguyen1");  
            }
            let homePage: HomePageOld = await this.login(username, password);
            return  await homePage.getNonpasswordmessage()
           

        } catch (err) {
            throw new errorwrapper.CustomError(this.checkNonPassWordWithValidInfo, err.message);
        }
    }
}