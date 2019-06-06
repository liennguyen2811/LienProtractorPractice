import GeneralPage from "./general-page";

export default class ChangePassWordPage extends GeneralPage{
    private static _changePassWordPage: ChangePassWordPage;

    // element

    public static async getChangePassWordInstance(): Promise<ChangePassWordPage>{
        this._changePassWordPage = new ChangePassWordPage();
        return this._changePassWordPage;
    }

}