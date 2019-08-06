import GeneralPage from "@page-objects/general-page";
import { by } from "protractor";
import { Ticket } from "@data-objects/railway/ticket";
import BrowserWrapper from "@utilities/protractor-wappers/browser-wrapper";
import Combobox from "@utilities/protractor-wappers/control-common-imp/combobox";
import Button from "@utilities/protractor-wappers/control-common-imp/button";

export default class BookTicketPage extends GeneralPage{
    private static _bookTicketPage: BookTicketPage;

    // element
    departDate:  Combobox= new Combobox(by.xpath("//select[@name='Date']"));
    departStation: Combobox= new Combobox(by.xpath("//select[@name='DepartStation']"));
    arriveStation: Combobox= new Combobox(by.xpath("//select[@name='ArriveStation']"));
    seatType: Combobox= new Combobox(by.xpath("//select[@name='SeatType']"));
    ticketAmount: Combobox= new Combobox (by.xpath("//select[@name='TicketAmount']"));
    bookticket: Button= new Button(by.xpath("//input[@value='Book ticket']"));

    public static async getBookTickeInstance(): Promise<BookTicketPage>{
        this._bookTicketPage = new BookTicketPage();
        return this._bookTicketPage;
    }

    /**
     * Go to LoginPage
     * @returns {Promise<BookTicketPage>}
     * @memberof GeneralPage
     */
    public async getBookTicket(ticket: Ticket): Promise<BookTicketPage>
    {
        //Select ticket information
        // await this.departDate.waitForPresenceOf();
        // await this.departDate.selectOptionByText(ticket.DepartDate);
        await this.departStation.waitForPresenceOf();
        await this.departStation.selectOptionByText(ticket.DepartStation,"DepartStation");
        await this.arriveStation.waitForPresenceOf();
        await this.arriveStation.selectOptionByText(ticket.ArriveStation, "ArriveStation");
        await this.seatType.selectOptionByText(ticket.SeatType,"SeatType");
        await this.seatType.waitForPresenceOf();
        await this.ticketAmount.selectOptionByText(ticket.TicketAmount.toString(),"TicketAmount");
        await this.ticketAmount.waitForPresenceOf();
        //Click on Book Ticket button
        await this.ticketAmount.waitForPresenceOf()
        this.bookticket.click();
        return this;
    }
    public async getBookedTicketInfo(): Promise<Ticket>
        {
            let ticket: Ticket = new Ticket();
            let tableName: string = "MyTable WideTable";
            ticket.DepartStation = await this.getTableCellValue(tableName, 2, "Depart Station");
            ticket.ArriveStation = await this.getTableCellValue(tableName, 2, "Arrive Station");
            ticket.SeatType = await this.getTableCellValue(tableName, 2, "Seat Type");
            ticket.DepartDate = await this.getTableCellValue(tableName, 2, "Depart Date");
            ticket.TicketAmount = parseInt( await this.getTableCellValue(tableName, 2, "Amount"));

            return ticket;
        }
    public async checkBookTicketInfoDisplay(ticketInfo: Ticket): Promise<boolean>
    {
        let ticketDisplayTable: Ticket = await this.getBookedTicketInfo();
        await  BrowserWrapper.sleepInSecond(10);
        if((ticketInfo.DepartStation != ticketDisplayTable.DepartStation)|| (ticketInfo.ArriveStation != ticketDisplayTable.ArriveStation)|| (ticketInfo.SeatType != ticketDisplayTable.SeatType)||(ticketInfo.TicketAmount != ticketDisplayTable.TicketAmount))
         return false;
         else return true
    }
    
}