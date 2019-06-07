import GeneralPage from "./general-page";
import { By } from "selenium-webdriver";
import { by } from "protractor";
import ElementWrapper from "../utilities/protractor-wappers/element-wrapper";
import HomePage from "./home-page";

export default class LoginPage extends GeneralPage{
    private static _loginPage: LoginPage;

    // element
        protected txtUsername = new ElementWrapper(by.XPath("//input[@id='username']"));
        protected txtPasword = new ElementWrapper(by.XPath("//input[@id='password']"));
        protected btnLogin = new ElementWrapper(by.XPath("//input[@value='login']"));
        protected lbErrorMessage = new ElementWrapper(by.XPath("//p[@class='message error LoginForm']"));

    public static async getLoginPageInstance(): Promise<LoginPage>{
        this._loginPage = new LoginPage();
        return this._loginPage;
    }
    public  Login(username: string, password: string): HomePage
    {
        // Submit login credetials
        this.txtUsername.sendKeys(username);
        if (password!= "")
        {
            this.txtPasword.sendKeys(password);
        }
        this.btnLogin.click();
       
        // Land on Home page
        return this;
    }
    public Geterrormessage(): Promise<string>
    {
        return this.lbErrorMessage.getText();
    }
}