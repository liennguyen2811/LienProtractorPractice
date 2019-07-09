import BrowserWrapper from "@utilities/protractor-wappers/browser-wrapper";
import TestRunInfo from "@data-objects/general/test-run-info";
import GeneralPageOld from "@page-objects/general-page-old";

export default class HomePageOld extends GeneralPageOld {
    private static _homePageold: HomePageOld;

    // element

    public static getHomePageInstance(): HomePageOld {
        this._homePageold = new HomePageOld();
        return this._homePageold;
    }

    public async navigateToWebPage() {
        await BrowserWrapper.restart();
        await BrowserWrapper.maximize();
        await BrowserWrapper.get(TestRunInfo.RAILWAY_URL);
        // return this;
    }
}