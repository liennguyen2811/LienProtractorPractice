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
const email_api_1 = require("@apis/email-api");
const general_1 = require("@data-objects/general/general");
const logger_1 = require("@utilities/general/logger");
const browser_wrapper_1 = __importDefault(require("@utilities/protractor-wappers/browser-wrapper"));
const element_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/element"));
const lable_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/lable"));
const link_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/link"));
const error_wapper_1 = require("@utilities/protractor-wappers/error-wapper");
const protractor_1 = require("protractor");
class GeneralPage {
    constructor() {
        this.navigationItem1 = new link_1.default(protractor_1.by.xpath("//div[@id= 'menu']//a[@href = '/Account/Login.cshtml']"));
        this.thankMessage = new lable_1.default(protractor_1.by.xpath("//div[@id='content']//h1"));
        this.passwordChangeDone = new lable_1.default(protractor_1.by.xpath("//form[@id='ChangePW']/fieldset/p[@class='message success']"));
        this.errorMsgChangePass = new lable_1.default(protractor_1.by.xpath("//form[@id='ChangePW']/fieldset/p[@class='message error']"));
        this.bookTicketMessage = new lable_1.default(protractor_1.by.xpath("//div[@id='content']//h1[text()='Ticket booked successfully!']"));
        this.welcomeMessage = new lable_1.default(protractor_1.by.xpath("//div[@class= 'account']/strong"));
        this.errorNoneMessage = new lable_1.default(protractor_1.by.xpath(".//*[@id='content']/p"));
        this.errorRegisterMessage = new lable_1.default(protractor_1.by.xpath("//div[@id='content']/p[@class='message error']"));
        this.ticketPriceHeaderMessage = new lable_1.default(protractor_1.by.xpath("//table[@class='MyTable MedTable']//tr[@class='TableSmallHeader']/th"));
    }
    navigationItem(tabName) {
        return new link_1.default(protractor_1.by.xpath(`//a[contains(.,'${tabName}')]`));
    }
    cellTable(tablename, rowindex, columnname) {
        return new element_1.default(protractor_1.by.xpath(`//table[@class='${tablename}']//tr[${rowindex}]/td[count(//th[.= '${columnname}']//preceding-sibling::th) + 1]`));
    }
    cellTableCheckPrice(tablename, rowindex, colunmindex, columnname) {
        return new element_1.default(protractor_1.by.xpath(`//table[@class='${tablename}']//tr[${rowindex}]/td[count(//th[.='${columnname}']//preceding-sibling::th) + '${colunmindex}']`));
    }
    rowNumber(table) {
        return new element_1.default(protractor_1.by.xpath(`//table[@class='${table}']//tr`));
    }
    collunmNumber(table) {
        return new element_1.default(protractor_1.by.xpath(`//table[@class='${table}']//td`));
    }
    checkPrice(train) {
        return new element_1.default(protractor_1.by.xpath(`//table[@class='NoBorder']//td[.='${train}']/following-sibling::td[.='Check Price']`));
    }
    bookTicket(seattype) {
        return new element_1.default(protractor_1.by.xpath(`//table[@class='NoBorder']//td[.='${seattype}']/following-sibling::td[.='Book ticket']`));
    }
    getWelcomeMsg() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.welcomeMessage.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getWelcomeMsg, err.message);
            }
        });
    }
    getNonePasswordMsg() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.errorNoneMessage.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getNonePasswordMsg, err.message);
            }
        });
    }
    getThankMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.thankMessage.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getThankMessage, err.message);
            }
        });
    }
    getPasswordChangeDoneMsg() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.passwordChangeDone.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getPasswordChangeDoneMsg, err.message);
            }
        });
    }
    getErrorRegisterMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.errorRegisterMessage.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getErrorRegisterMessage, err.message);
            }
        });
    }
    getErrorMessageChangePass() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.errorMsgChangePass.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getErrorMessageChangePass, err.message);
            }
        });
    }
    getBookTicketMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.bookTicketMessage.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getBookTicketMessage, err.message);
            }
        });
    }
    geTicketPriceHeaderMsg() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.ticketPriceHeaderMessage.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.geTicketPriceHeaderMsg, err.message);
            }
        });
    }
    isLoginPageDisplayed(timeOut) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.navigationItem(general_1.PageName.LOGIN).isDisplayed(timeOut);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.isLoginPageDisplayed, err.message);
            }
        });
    }
    goToPage(namePage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to ${namePage} Page`);
                yield this.navigationItem(namePage).waitForPresenceOf();
                yield this.navigationItem(namePage).click();
                if (namePage == general_1.PageName.LOGIN) {
                    let loginPage = require(`../page-objects/login-page`).default;
                    return yield loginPage.getLoginPageInstance();
                }
                else if (namePage == general_1.PageName.LOGOUT) {
                    let homePage = require(`../page-objects/home-page`).default;
                    return yield homePage.getHomePageInstance();
                }
                else if (namePage == general_1.PageName.REGISTER) {
                    let registerPage = require(`../page-objects/register-page`).default;
                    return yield registerPage.getRegisterPageInstance();
                }
                else if (namePage == general_1.PageName.CHANGEPASSWORD) {
                    let changePasswordPage = require(`../page-objects/change-password-page`).default;
                    return yield changePasswordPage.getChangePassWordPageInstance();
                }
                else if (namePage == general_1.PageName.BOOKTICKET) {
                    let bookTicketPage = require(`../page-objects/book-ticket-page`).default;
                    return yield bookTicketPage.getBookTickeInstance();
                }
                else if (namePage == general_1.PageName.TIMETABLE) {
                    let timeTablePage = require(`../page-objects/time-table-page`).default;
                    return yield timeTablePage.getTimeTablePageInstance();
                }
                else if (namePage == general_1.PageName.MYTICKET) {
                    let myticketPage = require(`../page-objects/myticket-page`).default;
                    return yield myticketPage.getMyTicketPageInstance();
                }
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.goToPage, err.message);
            }
        });
    }
    getTableCellValue(tablename, rowindex, columnname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.cellTable(tablename, rowindex, columnname).getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getTableCellValue, err.message);
            }
        });
    }
    getTableCellValueCheckPrice(tablename, rowindex, colunmindex, columnname) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.cellTableCheckPrice(tablename, rowindex, colunmindex, columnname).getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getTableCellValueCheckPrice, message);
            }
        });
    }
    getRowNumber(table) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const StringFormat = (str, ...args) => str.replace(/{(\d+)}/g, (match, index) => args[index] || '');
                let xpath = StringFormat("//table[@class='{0}']//tr", table);
                return browser_wrapper_1.default.getDriverInstance().FindElements(protractor_1.by.xpath(xpath)).count();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getRowNumber, message);
            }
        });
    }
    bookTicketFromTicketPrice(departstation, arrivestation, seattype) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let train = departstation + " to " + arrivestation;
                yield this.checkPrice(train).click();
                yield this.bookTicket(seattype).click();
                let bookTicketPage = require(`../page-objects/book-ticket-page`).default;
                return yield bookTicketPage.getBookTickeInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.bookTicketFromTicketPrice, err.message);
            }
        });
    }
    isLogOut(timeOut) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.navigationItem(general_1.PageName.LOGOUT).isDisplayed();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.isLogOut, err.message);
            }
        });
    }
    activateAccount(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to active new account`);
                let findMsg = "Please confirm your account " + username;
                let activeLink = yield email_api_1.GmailHelper.getLinkActiveByTitle(findMsg);
                yield browser_wrapper_1.default.get(activeLink);
                let registerPage = require(`../page-objects/register-page`).default;
                return yield registerPage.getRegisterPageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.activateAccount, err.message);
            }
        });
    }
}
exports.default = GeneralPage;
//# sourceMappingURL=general-page.js.map