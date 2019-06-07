import GeneralPage from "./general-page";
import ElementWrapper from "../utilities/protractor-wappers/element-wrapper";
import { by } from "protractor";
import { FunctionType, Logger } from "../utilities/general/logger";
import { errorwrapper } from "../utilities/protractor-wappers/error-wapper";

export default class BookTicketPage extends GeneralPage{
    private static _bookTicketPage: BookTicketPage;

    // element
    protected cmbDepartDate = new ElementWrapper(by.xpath("//select[@name='Date']"));
    protected cmbDepartStation = new ElementWrapper(by.xpath("//select[@name='DepartStation']"));
    protected cmbArriveStation = new ElementWrapper(by.xpath("//select[@name='ArriveStation']"));
    protected cmbSeatType = new ElementWrapper(by.xpath("//select[@name='SeatType']"));
    protected cmbTicketAmount = new ElementWrapper(by.xpath("//select[@name='TicketAmount']"));
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
    public async gotoGetBookTicket(): Promise<BookTicketPage>
	{ try{
        await Logger.write(FunctionType.UI, `Going Book Ticket  Page`)
        this.btnBookTicket.click();
        return await BookTicketPage.getBookTickeInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.gotoGetBookTicket, err.message)
    }   
    }

    
}