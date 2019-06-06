import GeneralPage from "./general-page";

export default class HomePage extends GeneralPage{
    private static _homePage: HomePage;

    // element

    public static async getHomePageInstance(): Promise<HomePage>{
        this._homePage = new HomePage();
        return this._homePage;
    }

}