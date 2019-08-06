"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const browser_wrapper_1 = __importDefault(require("@utilities/protractor-wappers/browser-wrapper"));
const general_page_1 = __importDefault(require("@page-objects/general-page"));
const ticket_1 = require("@data-objects/railway/ticket");
const combobox_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/combobox"));
const textbox_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/textbox"));
const button_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/button"));
const lable_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/lable"));
class MyTicketPage extends general_page_1.default {
    constructor() {
        super(...arguments);
        this.filterDepartStation = new combobox_1.default(protractor_1.by.xpath("//select[@name='FilterDpStation']"));
        this.filterArriveStation = new combobox_1.default(protractor_1.by.xpath("//select[@name='FilterArStation']"));
        this.filterDepartDatetextbox = new textbox_1.default(protractor_1.by.xpath("//input[@name='FilterDpDate']"));
        this.filterStatus = new combobox_1.default(protractor_1.by.xpath("//select[@name='FilterStatus']"));
        this.applyFilter = new button_1.default(protractor_1.by.xpath("//input[@value='Apply filter']"));
        this.msgNoResult = new lable_1.default(protractor_1.by.xpath("//div[@class='error message']"));
        this.alertCancle = new button_1.default(protractor_1.by.xpath("//table[@class='MyTable']//tr[2]/td[count(//th[.='Operation']//preceding-sibling::th) + 1]"));
    }
    static getMyTicketPageInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            this._myTicketPage = new MyTicketPage();
            return this._myTicketPage;
        });
    }
    cancelTicket() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.alertCancle.click();
            yield browser_wrapper_1.default.acceptAlert();
            return this;
        });
    }
    filterTicket(departstation, arrivestation, departdate, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (departstation != "") {
                yield this.filterDepartStation.waitForControlStable();
                yield this.filterDepartStation.selectOptionByText(departstation, "FilterDpStation");
            }
            if (arrivestation != "") {
                yield this.filterArriveStation.waitForControlStable();
                yield this.filterArriveStation.selectOptionByText(arrivestation, "FilterArStation");
            }
            if (status != "") {
                yield this.filterStatus.waitForControlStable();
                yield this.filterStatus.selectOptionByText(status, "FilterStatus");
            }
            if (departdate != "") {
                yield this.filterDepartDatetextbox.sendKeys(departdate);
            }
            yield browser_wrapper_1.default.sleepInSecond(10);
            yield this.applyFilter.click();
            return this;
        });
    }
    GetNoResultMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.msgNoResult.getText();
        });
    }
    getMyTicketInfo(row) {
        return __awaiter(this, void 0, void 0, function* () {
            let ticket = new ticket_1.Ticket();
            let tableName = "MyTable";
            ticket.DepartDate = yield this.getTableCellValue(tableName, row, "Depart Station");
            ticket.ArriveStation = yield this.getTableCellValue(tableName, row, "Arrive Station");
            ticket.SeatType = yield this.getTableCellValue(tableName, row, "Seat Type");
            ticket.DepartDate = yield this.getTableCellValue(tableName, row, "Depart Date");
            ticket.TicketAmount = parseInt(yield this.getTableCellValue(tableName, row, "Amount"));
            return ticket;
        });
    }
}
exports.default = MyTicketPage;
//# sourceMappingURL=myticket-page.js.map