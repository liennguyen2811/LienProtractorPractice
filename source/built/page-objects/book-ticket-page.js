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
const general_page_1 = __importDefault(require("./general-page"));
const element_wrapper_1 = __importDefault(require("../utilities/protractor-wappers/element-wrapper"));
const protractor_1 = require("protractor");
const logger_1 = require("../utilities/general/logger");
const error_wapper_1 = require("../utilities/protractor-wappers/error-wapper");
class BookTicketPage extends general_page_1.default {
    constructor() {
        super(...arguments);
        this.cmbDepartDate = new element_wrapper_1.default(protractor_1.by.xpath("//select[@name='Date']"));
        this.cmbDepartStation = new element_wrapper_1.default(protractor_1.by.xpath("//select[@name='DepartStation']"));
        this.cmbArriveStation = new element_wrapper_1.default(protractor_1.by.xpath("//select[@name='ArriveStation']"));
        this.cmbSeatType = new element_wrapper_1.default(protractor_1.by.xpath("//select[@name='SeatType']"));
        this.cmbTicketAmount = new element_wrapper_1.default(protractor_1.by.xpath("//select[@name='TicketAmount']"));
        this.btnBookTicket = new element_wrapper_1.default(protractor_1.by.xpath("//input[@value='Book ticket']"));
    }
    static getBookTickeInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            this._bookTicketPage = new BookTicketPage();
            return this._bookTicketPage;
        });
    }
    gotoGetBookTicket() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going Book Ticket  Page`);
                this.btnBookTicket.click();
                return yield BookTicketPage.getBookTickeInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.gotoGetBookTicket, err.message);
            }
        });
    }
}
exports.default = BookTicketPage;
//# sourceMappingURL=book-ticket-page.js.map