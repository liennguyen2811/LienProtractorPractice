import { by } from "protractor";
import BrowserWrapper from "../utilities/protractor-wappers/browser-wrapper";
import ElementWrapper from "../utilities/protractor-wappers/element-wrapper";
import SelectElementWrapper from "../utilities/protractor-wappers/select-element-wapper";
import GeneralPage from "./general-page";
import { Ticket } from "../data-objects/railway/ticket";
import { strict } from "assert";

export default class MyTicketPage extends GeneralPage {
    private static _myTicketPage: MyTicketPage;

    // element
    protected cmbFilterDepartStation = new SelectElementWrapper(by.XPath("//select[@name='FilterDpStation']"));
    protected cmbFilterArriveStation = new SelectElementWrapper(by.XPath("//select[@name='FilterArStation']"));
    protected txtFilterDepartDate = new ElementWrapper(by.XPath("//input[@name='FilterDpDate']"));
    protected cmbFilterStatus = new SelectElementWrapper(by.XPath("//select[@name='FilterStatus']"));
    protected btnApplyFilter = new ElementWrapper(by.XPath("//input[@value='Apply filter']"));
    protected msgNoResult = new ElementWrapper(by.XPath("//div[@class='error message']"));
    protected alertCancle = new ElementWrapper(by.XPath("//table[@class='MyTable']//tr[2]/td[count(//th[.='Operation']//preceding-sibling::th) + 1]"));


    public static async getMyTicketPageInstance(): Promise<MyTicketPage> {
        this._myTicketPage = new MyTicketPage();
        return this._myTicketPage;
    }

    public CancelTicket(): MyTicketPage {
        this.alertCancle.click();
        BrowserWrapper.acceptAlert();

        return this;
    }
    public FilterTicket(departstation: string, arrivestation: string, departdate: string, status: string): MyTicketPage {
        if (departstation != "") {
            this.cmbFilterDepartStation.selectOptionByText(departstation);
        }
        if (arrivestation != "") {
            this.cmbFilterArriveStation.selectOptionByText(arrivestation);
        }
        if (status != "") {
            this.cmbFilterStatus.selectOptionByText(status);
        }
        if (departdate != "") {
            this.txtFilterDepartDate.sendKeys(departdate);
        }

        this.btnApplyFilter.click();

        return this;
    }
    public GetNoResultMessage(): Promise<string> {
        return this.msgNoResult.getText();
    }

    public async getMyTicketInfo(row: number): Promise<Ticket>
    {
        let ticket: Ticket= new Ticket();
        let tableName: string = "MyTable";

        ticket.DepartDate = await this.getTableCellValue(tableName, row, "Depart Station");
        ticket.ArriveStation = await this.getTableCellValue(tableName, row, "Arrive Station");
        ticket.SeatType =  await this.getTableCellValue(tableName, row, "Seat Type");
        ticket.DepartDate =  await this.getTableCellValue(tableName, row, "Depart Date");
        ticket.TicketAmount = parseInt( await this.getTableCellValue(tableName, row, "Amount"));
        return ticket;
    }
   
}