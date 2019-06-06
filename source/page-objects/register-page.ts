import GeneralPage from "./general-page";

export default class RegisterPage extends GeneralPage{
    private static _registerPage: RegisterPage;

    // element

    public static async getRegisterPageInstance(): Promise<RegisterPage>{
        this._registerPage = new RegisterPage();
        return this._registerPage;
    }

}