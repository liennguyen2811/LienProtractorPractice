import GeneralPage from "@page-objects/general-page";
import BrowserWrapper from "@utilities/protractor-wappers/browser-wrapper";


export default class TicketPricePage extends GeneralPage{
    private static _ticketPricePage: TicketPricePage;

    // element

    public static async getTicketPricePageInstance(): Promise<TicketPricePage>{
        this._ticketPricePage = new TicketPricePage();
        return this._ticketPricePage;
    }
    public async checkTableCellValuePrice(tablename: string, row: number,column: number, columnname: string, expected: string): Promise<void>
        {
            console.log(await this.getTableCellValueCheckPrice(tablename, row,column,columnname));
           let observedResult: string = await this.getTableCellValueCheckPrice(tablename, row,column,columnname);
           console.log(observedResult);
           await expect(expected).toBe(observedResult, "\nFailed at column: " + column + "\nActual: " + observedResult + "\nExpected: " + expected);
        }
    public async checkTicketPriceForDN_SGTrip(): Promise<void>
        {     
            await BrowserWrapper.sleepInSecond(10);     
            await this.checkTableCellValuePrice("MyTable MedTable", 3, 1,"SS","310000");
            await this.checkTableCellValuePrice("MyTable MedTable", 3,2, "SS", "335000");
            await this.checkTableCellValuePrice("MyTable MedTable", 3, 3,"SSC", "360000");
            await this.checkTableCellValuePrice("MyTable MedTable", 3,4, "HB", "410000");
            await this.checkTableCellValuePrice("MyTable MedTable", 3,5,"SB", "460000");
            await this.checkTableCellValuePrice("MyTable MedTable", 3,6, "SBC", "510000");   
            
        }

}