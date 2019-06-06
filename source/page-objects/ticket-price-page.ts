import GeneralPage from "./general-page";

export default class TicketPricePage extends GeneralPage{
    private static _ticketPricePage: TicketPricePage;

    // element

    public static async getTicketPricePageInstance(): Promise<TicketPricePage>{
        this._ticketPricePage = new TicketPricePage();
        return this._ticketPricePage;
    }

}