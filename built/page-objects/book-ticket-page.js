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
const general_page_1 = __importDefault(require("@page-objects/general-page"));
const protractor_1 = require("protractor");
const ticket_1 = require("@data-objects/railway/ticket");
const browser_wrapper_1 = __importDefault(require("@utilities/protractor-wappers/browser-wrapper"));
const combobox_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/combobox"));
const button_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/button"));
class BookTicketPage extends general_page_1.default {
    constructor() {
        super(...arguments);
        this.departDate = new combobox_1.default(protractor_1.by.xpath("//select[@name='Date']"));
        this.departStation = new combobox_1.default(protractor_1.by.xpath("//select[@name='DepartStation']"));
        this.arriveStation = new combobox_1.default(protractor_1.by.xpath("//select[@name='ArriveStation']"));
        this.seatType = new combobox_1.default(protractor_1.by.xpath("//select[@name='SeatType']"));
        this.ticketAmount = new combobox_1.default(protractor_1.by.xpath("//select[@name='TicketAmount']"));
        this.bookticket = new button_1.default(protractor_1.by.xpath("//input[@value='Book ticket']"));
    }
    static getBookTickeInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            this._bookTicketPage = new BookTicketPage();
            return this._bookTicketPage;
        });
    }
    getBookTicket(ticket) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.departStation.waitForPresenceOf();
            yield this.departStation.selectOptionByText(ticket.DepartStation, "DepartStation");
            yield this.arriveStation.waitForPresenceOf();
            yield this.arriveStation.selectOptionByText(ticket.ArriveStation, "ArriveStation");
            yield this.seatType.selectOptionByText(ticket.SeatType, "SeatType");
            yield this.seatType.waitForPresenceOf();
            yield this.ticketAmount.selectOptionByText(ticket.TicketAmount.toString(), "TicketAmount");
            yield this.ticketAmount.waitForPresenceOf();
            yield this.ticketAmount.waitForPresenceOf();
            this.bookticket.click();
            return this;
        });
    }
    getBookedTicketInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            let ticket = new ticket_1.Ticket();
            let tableName = "MyTable WideTable";
            ticket.DepartStation = yield this.getTableCellValue(tableName, 2, "Depart Station");
            ticket.ArriveStation = yield this.getTableCellValue(tableName, 2, "Arrive Station");
            ticket.SeatType = yield this.getTableCellValue(tableName, 2, "Seat Type");
            ticket.DepartDate = yield this.getTableCellValue(tableName, 2, "Depart Date");
            ticket.TicketAmount = parseInt(yield this.getTableCellValue(tableName, 2, "Amount"));
            return ticket;
        });
    }
    checkBookTicketInfoDisplay(ticketInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            let ticketDisplayTable = yield this.getBookedTicketInfo();
            yield browser_wrapper_1.default.sleepInSecond(10);
            if ((ticketInfo.DepartStation != ticketDisplayTable.DepartStation) || (ticketInfo.ArriveStation != ticketDisplayTable.ArriveStation) || (ticketInfo.SeatType != ticketDisplayTable.SeatType) || (ticketInfo.TicketAmount != ticketDisplayTable.TicketAmount))
                return false;
            else
                return true;
        });
    }
}
exports.default = BookTicketPage;
//# sourceMappingURL=book-ticket-page.js.map