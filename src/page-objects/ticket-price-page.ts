import GeneralPage from "@page-objects/general-page-old";

export default class TicketPricePage extends GeneralPage{
    private static _ticketPricePage: TicketPricePage;

    // element

    public static async getTicketPricePageInstance(): Promise<TicketPricePage>{
        this._ticketPricePage = new TicketPricePage();
        return this._ticketPricePage;
    }
    public async checkTableCellValue(tablename: string, row: number, column: string, expected: string): Promise<void>
        {
            
        }
    public async checkTicketPriceForDN_SGTrip(): Promise<void>
        {          

            
        }

}