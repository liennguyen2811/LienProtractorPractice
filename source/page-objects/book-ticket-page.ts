import GeneralPage from "./general-page";

export default class BookTicketPage extends GeneralPage{
    private static _bookTicketPage: BookTicketPage;

    // element

    public static async getBookTickeInstance(): Promise<BookTicketPage>{
        this._bookTicketPage = new BookTicketPage();
        return this._bookTicketPage;
    }

}