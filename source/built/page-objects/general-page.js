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
const element_wrapper_1 = __importDefault(require("../utilities/protractor-wappers/element-wrapper"));
const protractor_1 = require("protractor");
const error_wapper_1 = require("../utilities/protractor-wappers/error-wapper");
const login_page_1 = __importDefault(require("./login-page"));
const logger_1 = require("../utilities/general/logger");
const register_page_1 = __importDefault(require("./register-page"));
const change_password_page_1 = __importDefault(require("./change-password-page"));
const time_table_page_1 = __importDefault(require("./time-table-page"));
const book_ticket_page_1 = __importDefault(require("./book-ticket-page"));
const ticket_price_page_1 = __importDefault(require("./ticket-price-page"));
const myticket_page_1 = __importDefault(require("./myticket-page"));
class GeneralPage {
    constructor() {
        this.tabLogin = new element_wrapper_1.default(protractor_1.by.xpath("//div[@id= 'menu']//a[@href = '/Account/Login.cshtml']"));
        this.tabLogout = new element_wrapper_1.default(protractor_1.by.xpath("//div[@id= 'menu']//a[@href = '/Account/Logout.cshtml']"));
        this.tabRegister = new element_wrapper_1.default(protractor_1.by.xpath("//div[@id='menu']//a[@href='/Account/Register.cshtml']"));
        this.tabChangePassWord = new element_wrapper_1.default(protractor_1.by.xpath("//div[@id='menu']//a[@href='/Account/ChangePassword.cshtml']"));
        this.tabBookTicket = new element_wrapper_1.default(protractor_1.by.xpath("//a[@href='/Page/BookTicketPage.cshtml']"));
        this.tabTimeTable = new element_wrapper_1.default(protractor_1.by.xpath("//a[@href='TrainTimeListPage.cshtml']"));
        this.tabTicketPrice = new element_wrapper_1.default(protractor_1.by.xpath("//a[@href='/Page/TrainPriceListPage.cshtml']"));
        this.tabMyTicket = new element_wrapper_1.default(protractor_1.by.xpath("//a[@href='/Page/ManageTicket.cshtml']"));
        this.lbWelcomeMessage = new element_wrapper_1.default(protractor_1.by.xpath("//div[@class= 'account']/strong"));
        this.lbNonPassWordInput = new element_wrapper_1.default(protractor_1.by.xpath(".//*[@id='content']/p"));
        this.lbThankMessage = new element_wrapper_1.default(protractor_1.by.xpath("//div[@id='content']//h1"));
        this.lbPasswordchangedone = new element_wrapper_1.default(protractor_1.by.xpath("//form[@id='ChangePW']/fieldset/p[@class='message success']"));
        this.lbErrorRegisterMessage = new element_wrapper_1.default(protractor_1.by.xpath("//div[@id='content']/p[@class='message error']"));
        this.lbErrorMessageChangePass = new element_wrapper_1.default(protractor_1.by.xpath("//form[@id='ChangePW']/fieldset/p[@class='message error']"));
        this.lblBookTicketMessage = new element_wrapper_1.default(protractor_1.by.xpath("//div[@id='content']//h1[text()='Ticket booked successfully!']"));
        this.lbTicketPriceHeaderMessage = new element_wrapper_1.default(protractor_1.by.xpath("//table[@class='MyTable MedTable']//tr[@class='TableSmallHeader']/th"));
    }
    ;
    cellTable(tablename, rowindex, columnname) {
        return new element_wrapper_1.default(protractor_1.by.xpath(`"//table[@class='${tablename}']//tr['${rowindex}']/td[count(//th[.= '${columnname}']//preceding-sibling::th) + 1]`));
    }
    cellTableCheckPrice(tablename, rowindex, columnname) {
        return new element_wrapper_1.default(protractor_1.by.xpath(`"//table[@class='${tablename}']//tr[{1}]/td[count(//th[.='${rowindex}']//preceding-sibling::th) + '${columnname}']`));
    }
    rowNumber(table) {
        return new element_wrapper_1.default(protractor_1.by.xpath(`//table[@class='${table}']//tr`));
    }
    collunmNumber(table) {
        return new element_wrapper_1.default(protractor_1.by.xpath(`//table[@class='${table}']//td`));
    }
    checkPrice(train) {
        return new element_wrapper_1.default(protractor_1.by.xpath(`//table[@class='NoBorder']//td[.='${train}']/following-sibling::td[.='Check Price']`));
    }
    bookTicket(seattype) {
        return new element_wrapper_1.default(protractor_1.by.xpath(`//table[@class='NoBorder']//td[.='${seattype}']/following-sibling::td[.='Book ticket']`));
    }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            this._generalPage = new GeneralPage();
            return this._generalPage;
        });
    }
    getWelcomeMessaged() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.lbWelcomeMessage.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getWelcomeMessaged, err.message);
            }
        });
    }
    getLbNonPassWordInput() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.lbNonPassWordInput.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getLbNonPassWordInput, err.message);
            }
        });
    }
    getLbThankMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.lbThankMessage.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getLbThankMessage, err.message);
            }
        });
    }
    getLbPasswordchangedone() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.lbPasswordchangedone.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getLbPasswordchangedone, err.message);
            }
        });
    }
    getLbErrorRegisterMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.lbErrorRegisterMessage.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getLbErrorRegisterMessage, err.message);
            }
        });
    }
    getLbErrorMessageChangePass() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.lbErrorMessageChangePass.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getLbErrorMessageChangePass, err.message);
            }
        });
    }
    getLblBookTicketMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.lblBookTicketMessage.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getLblBookTicketMessage, err.message);
            }
        });
    }
    getLbTicketPriceHeaderMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.lbTicketPriceHeaderMessage.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getLbTicketPriceHeaderMessage, err.message);
            }
        });
    }
    gotoLoginPage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to Login Page`);
                this.tabLogin.click();
                return yield login_page_1.default.getLoginPageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.gotoLoginPage, err.message);
            }
        });
    }
    gotoRegisterPage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to Register Page`);
                this.tabLogin.click();
                return yield register_page_1.default.getRegisterPageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.gotoRegisterPage, err.message);
            }
        });
    }
    gotoChangePassword() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to Change Password Page`);
                this.tabLogin.click();
                return yield change_password_page_1.default.getChangePassWordInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.gotoChangePassword, err.message);
            }
        });
    }
    gotoTabTimeTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to Time table page`);
                this.tabLogin.click();
                return yield time_table_page_1.default.getTimeTablePageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.gotoTabTimeTable, err.message);
            }
        });
    }
    gotoBookTicket() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to book ticket page`);
                this.tabLogin.click();
                return yield book_ticket_page_1.default.getBookTickeInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.gotoBookTicket, err.message);
            }
        });
    }
    gotoTicketPricePage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to ticket price page`);
                this.tabLogin.click();
                return yield ticket_price_page_1.default.getTicketPricePageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.gotoTicketPricePage, err.message);
            }
        });
    }
    gotoMyTicketPage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to ticket page`);
                this.tabLogin.click();
                return yield myticket_page_1.default.getMyTicketPageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.gotoMyTicketPage, err.message);
            }
        });
    }
    getTableCellValue(tablename, rowindex, columnname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.cellTable(tablename, rowindex, columnname).getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getTableCellValue, message);
            }
        });
    }
    getTableCellValueCheckPrice(tablename, rowindex, columnname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.cellTableCheckPrice(tablename, rowindex, columnname).getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getTableCellValueCheckPrice, message);
            }
        });
    }
    getRowNumber(table) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.rowNumber(table).getSize();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getRowNumber, message);
            }
        });
    }
    getcollunmNumber(table) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.rowNumber(table).getSize();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getcollunmNumber, message);
            }
        });
    }
    bookTicketFromTicketPrice(departstation, arrivestation, seattype) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let train = departstation + " to " + arrivestation;
                yield this.checkPrice(train).click();
                yield this.bookTicket(seattype).click();
                return yield book_ticket_page_1.default.getBookTickeInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.bookTicketFromTicketPrice, err.message);
            }
        });
    }
}
exports.default = GeneralPage;
//# sourceMappingURL=general-page.js.map