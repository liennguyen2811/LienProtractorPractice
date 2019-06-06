import GeneralPage from "./general-page";
import BrowserWrapper from "../utilities/protractor-wappers/browser-wrapper";
import TestRunInfo from "../data-objects/data-objects/general/test-run-info";

export default class HomePage extends GeneralPage{
    private static _homePage: HomePage;

    // element

    public static async getHomePageInstance(): Promise<HomePage>{
        this._homePage = new HomePage();
        return this._homePage;
    }

    public static async navigateToWebPage(url: string){
        await BrowserWrapper.restart();
        await BrowserWrapper.maximize();
        await BrowserWrapper.get(TestRunInfo.RAILWAY_URL);
    }
}