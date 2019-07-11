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
const element_wrapper_1 = __importDefault(require("@utilities/protractor-wappers/element-wrapper"));
const select_element_wapper_1 = __importDefault(require("@utilities/protractor-wappers/select-element-wapper"));
const protractor_1 = require("protractor");
const browser_wrapper_1 = __importDefault(require("@utilities/protractor-wappers/browser-wrapper"));
const combobox_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/combobox"));
class BookTicketPage extends general_page_1.default {
    constructor() {
        super(...arguments);
        this.departStation = new combobox_1.default(protractor_1.by.xpath("//select[@name='Date']"));
        this.checkDepartDate = new element_wrapper_1.default(protractor_1.by.xpath("//select[@name='Date']"));
        this.cmbDepartDate = new select_element_wapper_1.default(protractor_1.by.xpath("//select[@name='Date']"));
        this.cmbDepartStation = new select_element_wapper_1.default(protractor_1.by.xpath("//select[@name='DepartStation']"));
        this.cmbArriveStation = new select_element_wapper_1.default(protractor_1.by.xpath("//select[@name='ArriveStation']"));
        this.cmbSeatType = new select_element_wapper_1.default(protractor_1.by.xpath("//select[@name='SeatType']"));
        this.cmbTicketAmount = new select_element_wapper_1.default(protractor_1.by.xpath("//select[@name='TicketAmount']"));
        this.btnBookTicket = new element_wrapper_1.default(protractor_1.by.xpath("//input[@value='Book ticket']"));
    }
    static getBookTickeInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            this._bookTicketPage = new BookTicketPage();
            return this._bookTicketPage;
        });
    }
    getBookTicket(ticket) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_wrapper_1.default.sleepInSecond(5);
            yield this.departStation.selectOptionByText(ticket.DepartStation);
            browser_wrapper_1.default.sleepInSecond(5);
            yield this.cmbArriveStation.selectOptionByText(ticket.ArriveStation);
            yield this.cmbSeatType.selectOptionByText(ticket.SeatType);
            yield this.cmbTicketAmount.selectOptionByText(ticket.TicketAmount.toString());
            this.btnBookTicket.click();
            return this;
        });
    }
}
exports.default = BookTicketPage;
//# sourceMappingURL=book-ticket-page.js.map