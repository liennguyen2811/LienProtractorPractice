import GeneralPage from "./general-page";

export default class MyTicketPage extends GeneralPage{
    private static _myTicketPage: MyTicketPage;

    // element

    public static async getMyTicketPageInstance(): Promise<MyTicketPage>{
        this._myTicketPage = new MyTicketPage();
        return this._myTicketPage;
    }

}