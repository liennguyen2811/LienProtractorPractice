import GeneralPage from "@page-objects/general-page";
import ElementWrapper from "@utilities/protractor-wappers/element-wrapper";
import SelectElementWrapper from "@utilities/protractor-wappers/select-element-wapper"
import { by } from "protractor";
import { Ticket } from "@data-objects/railway/ticket";
import BrowserWrapper from "@utilities/protractor-wappers/browser-wrapper";
import Combobox from "@utilities/protractor-wappers/control-common-imp/combobox";

export default class BookTicketPage extends GeneralPage{
    private static _bookTicketPage: BookTicketPage;

    // element
    departStation: Combobox= new Combobox(by.xpath("//select[@name='Date']"));
    protected checkDepartDate = new ElementWrapper(by.xpath("//select[@name='Date']"));
    protected cmbDepartDate = new SelectElementWrapper(by.xpath("//select[@name='Date']"));
    protected cmbDepartStation = new SelectElementWrapper(by.xpath("//select[@name='DepartStation']"));
    protected cmbArriveStation = new SelectElementWrapper(by.xpath("//select[@name='ArriveStation']"));
    protected cmbSeatType = new SelectElementWrapper(by.xpath("//select[@name='SeatType']"));
    protected cmbTicketAmount = new SelectElementWrapper(by.xpath("//select[@name='TicketAmount']"));
    protected btnBookTicket = new ElementWrapper(by.xpath("//input[@value='Book ticket']"));

    public static async getBookTickeInstance(): Promise<BookTicketPage>{
        this._bookTicketPage = new BookTicketPage();
        return this._bookTicketPage;
    }

    /**
     * Go to LoginPage
     * @returns {Promise<BookTicketPage>}
     * @memberof GeneralPage
     */
    // public async gotoGetBookTicket(): Promise<BookTicketPage>
	// { try{
    //     await Logger.write(FunctionType.UI, `Going Book Ticket  Page`)
    //     this.btnBookTicket.click();
    //     let bookTicketPage = require(`../page-objects/book-ticket-page`).default;
    //     return await bookTicketPage.getBookTickeInstance();
    // } catch(err){
    //     throw new errorwrapper.CustomError(this.gotoGetBookTicket, err.message)
    // }   
    // }

    public async getBookTicket(ticket: Ticket): Promise<BookTicketPage>
    {
        //Select ticket information
        await BrowserWrapper.sleepInSecond(5);
        await this.departStation.selectOptionByText(ticket.DepartStation);
        BrowserWrapper.sleepInSecond(5);
        await this.cmbArriveStation.selectOptionByText(ticket.ArriveStation);
        await this.cmbSeatType.selectOptionByText(ticket.SeatType);
        //CmbTicketAmount.SelectByValue(ticket.TicketAmount.ToString);
        await this.cmbTicketAmount.selectOptionByText(ticket.TicketAmount.toString());
        //Click on Book Ticket button
        this.btnBookTicket.click();

        return this;
    }
    
}