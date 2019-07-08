import GeneralPageRefactor from "./general-page";
import BrowserWrapper from "@utilities/protractor-wappers/browser-wrapper";
import TestRunInfo from "@data-objects/general/test-run-info";
import GeneralPage from "./general-page";


export default class HomePage extends GeneralPage {
    private static _homePage: HomePage;

    // element

    public static getHomePageInstance(): HomePage {
        this._homePage = new HomePage();
        return this._homePage;
    }   
    
    public async navigateToWebPage() {
        await BrowserWrapper.restart();
        await BrowserWrapper.maximize();
        await BrowserWrapper.get(TestRunInfo.RAILWAY_URL);
        // return this;
    }
}
