import GeneralPage from "@page-objects/general-page";
import TicketPricePage from "@page-objects/ticket-price-page";
import Element from "@utilities/protractor-wappers/control-common-imp/element";
import { by } from "protractor";
import { Station } from "@data-objects/general/general";
import { Logger, FunctionType } from "@utilities/general/logger";

export default class TimeTablePage extends GeneralPage{
    private static _timeTablePage: TimeTablePage;

    // element
    protected trainTimeTableRow (departStation: Station,arriveStation: Station ): Element {
        return new Element(by.xpath(`//td[.='${departStation}']/following-sibling::td[.='${arriveStation}']/following-sibling::td[.='check price']`));
}

    public static async getTimeTablePageInstance(): Promise<TimeTablePage>{
        this._timeTablePage = new TimeTablePage();
        return this._timeTablePage;
    }
    public async goToTabTimeTableRow (departStation: Station, arriveStation: Station): Promise<TicketPricePage>
    {
        await Logger.write(FunctionType.UI, `Select trip from ${departStation} to ${arriveStation} `)         
        await this.trainTimeTableRow(departStation,arriveStation).click()
        //Land on Book Ticket page
        return new TicketPricePage();
    }
}