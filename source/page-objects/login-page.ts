import GeneralPage from "./general-page";

export default class LoginPage extends GeneralPage{
    private static _loginPage: LoginPage;

    // element

    public static async getLoginPageInstance(): Promise<LoginPage>{
        this._loginPage = new LoginPage();
        return this._loginPage;
    }

}