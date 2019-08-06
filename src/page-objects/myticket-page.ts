import { by } from "protractor";
import BrowserWrapper from "@utilities/protractor-wappers/browser-wrapper";
import GeneralPage from "@page-objects/general-page";
import { Ticket } from "@data-objects/railway/ticket";
import Combobox from "@utilities/protractor-wappers/control-common-imp/combobox";
import Textbox from "@utilities/protractor-wappers/control-common-imp/textbox";
import Button from "@utilities/protractor-wappers/control-common-imp/button";
import Lable from "@utilities/protractor-wappers/control-common-imp/lable";


export default class MyTicketPage extends GeneralPage {
    private static _myTicketPage: MyTicketPage;

    // element
    filterDepartStation: Combobox= new Combobox(by.xpath("//select[@name='FilterDpStation']"));
    filterArriveStation: Combobox= new Combobox(by.xpath("//select[@name='FilterArStation']"));
    filterDepartDatetextbox: Textbox = new Textbox(by.xpath("//input[@name='FilterDpDate']"))
    filterStatus:Combobox= new Combobox(by.xpath("//select[@name='FilterStatus']"));
    applyFilter: Button = new Button(by.xpath("//input[@value='Apply filter']"));
    msgNoResult: Lable= new Lable(by.xpath("//div[@class='error message']"));
    alertCancle: Button = new Button(by.xpath("//table[@class='MyTable']//tr[2]/td[count(//th[.='Operation']//preceding-sibling::th) + 1]"));


    public static async getMyTicketPageInstance(): Promise<MyTicketPage> {
        this._myTicketPage = new MyTicketPage();
        return this._myTicketPage;
    }

    public async cancelTicket(): Promise <MyTicketPage> {
        await this.alertCancle.click();
        await BrowserWrapper.acceptAlert();
        return this;
    }
    public async filterTicket(departstation: string, arrivestation: string, departdate: string, status: string): Promise< MyTicketPage> {
        if (departstation != "") {
            await this.filterDepartStation.waitForControlStable()
            await this.filterDepartStation.selectOptionByText(departstation,"FilterDpStation");
        }
        if (arrivestation != "") {
            await this.filterArriveStation.waitForControlStable();
            await this.filterArriveStation.selectOptionByText(arrivestation,"FilterArStation");
        }
        if (status != "") {
            await this.filterStatus.waitForControlStable();
            await this.filterStatus.selectOptionByText(status,"FilterStatus");
        }
        if (departdate != "") {
            await this.filterDepartDatetextbox.sendKeys(departdate);
        }
        await BrowserWrapper.sleepInSecond(10);
        await this.applyFilter.click();

        return this;
    }
    public async GetNoResultMessage(): Promise<string> {
        return await this.msgNoResult.getText();
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