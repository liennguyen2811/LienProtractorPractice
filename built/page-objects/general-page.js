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
const element_wrapper_1 = __importDefault(require("@utilities/protractor-wappers/element-wrapper"));
const protractor_1 = require("protractor");
const error_wapper_1 = require("@utilities/protractor-wappers/error-wapper");
const logger_1 = require("@utilities/general/logger");
const browser_wrapper_1 = __importDefault(require("@utilities/protractor-wappers/browser-wrapper"));
const link_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/link"));
const lable_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/lable"));
const general_1 = require("@data-objects/general/general");
class GeneralPage {
    constructor() {
        this.navigationItem1 = new link_1.default(protractor_1.by.xpath("//div[@id= 'menu']//a[@href = '/Account/Login.cshtml']"));
        this.thankMessage = new lable_1.default(protractor_1.by.xpath("//div[@id='content']//h1"));
        this.passwordChangeDone = new lable_1.default(protractor_1.by.xpath("//form[@id='ChangePW']/fieldset/p[@class='message success']"));
        this.errorMsgChangePass = new lable_1.default(protractor_1.by.xpath("//form[@id='ChangePW']/fieldset/p[@class='message error']"));
        this.bookTicketMessage = new lable_1.default(protractor_1.by.xpath("//div[@id='content']//h1[text()='Ticket booked successfully!']"));
        this.errorNoneMessage = new lable_1.default(protractor_1.by.xpath(".//*[@id='content']/p"));
        this.tabLogin = new element_wrapper_1.default(protractor_1.by.xpath("//div[@id= 'menu']//a[@href = '/Account/Login.cshtml']"));
        this.tabLogout = new element_wrapper_1.default(protractor_1.by.xpath("//div[@id= 'menu']//a[@href='/Account/Logout']"));
        this.tabRegister = new element_wrapper_1.default(protractor_1.by.xpath("//div[@id='menu']//a[@href='/Account/Register.cshtml']"));
        this.tabChangePassWord = new element_wrapper_1.default(protractor_1.by.xpath("//div[@id='menu']//a[@href='/Account/ChangePassword.cshtml']"));
        this.tabBookTicket = new element_wrapper_1.default(protractor_1.by.xpath("//a[@href='/Page/BookTicketPage.cshtml']"));
        this.tabTimeTable = new element_wrapper_1.default(protractor_1.by.xpath("//a[@href='TrainTimeListPage.cshtml']"));
        this.tabTicketPrice = new element_wrapper_1.default(protractor_1.by.xpath("//a[@href='/Page/TrainPriceListPage.cshtml']"));
        this.tabMyTicket = new element_wrapper_1.default(protractor_1.by.xpath("//a[@href='/Page/ManageTicket.cshtml']"));
        this.tabContact = new element_wrapper_1.default(protractor_1.by.xpath("//a[@href='/Page/Contact.cshtml']"));
        this.lbWelcomeMessage = new element_wrapper_1.default(protractor_1.by.xpath("//div[@class= 'account']/strong"));
        this.lbNonPassWordInput = new element_wrapper_1.default(protractor_1.by.xpath(".//*[@id='content']/p"));
        this.lbThankMessage = new element_wrapper_1.default(protractor_1.by.xpath("//div[@id='content']//h1"));
        this.lbPasswordchangedone = new element_wrapper_1.default(protractor_1.by.xpath("//form[@id='ChangePW']/fieldset/p[@class='message success']"));
        this.lbErrorRegisterMessage = new element_wrapper_1.default(protractor_1.by.xpath("//div[@id='content']/p[@class='message error']"));
        this.lbErrorMessageChangePass = new element_wrapper_1.default(protractor_1.by.xpath("//form[@id='ChangePW']/fieldset/p[@class='message error']"));
        this.lblBookTicketMessage = new element_wrapper_1.default(protractor_1.by.xpath("//div[@id='content']//h1[text()='Ticket booked successfully!']"));
        this.lbTicketPriceHeaderMessage = new element_wrapper_1.default(protractor_1.by.xpath("//table[@class='MyTable MedTable']//tr[@class='TableSmallHeader']/th"));
    }
    navigationItem(tabName) {
        return new link_1.default(protractor_1.by.xpath(`//a[contains(.,'${tabName}')]`));
    }
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
    getWelcomeMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.lbWelcomeMessage.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getWelcomeMessage, err.message);
            }
        });
    }
    getNonpasswordmessage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.errorNoneMessage.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getNonpasswordmessage, err.message);
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
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to log out`);
                yield this.tabLogout.click();
                let homePage = require(`../page-objects/home-page`).default;
                return yield homePage.getHomePageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.goToLoginPage, err.message);
            }
        });
    }
    goToLoginPage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to Login Page`);
                yield this.navigationItem("Login").click();
                let loginPage = require(`../page-objects/login-page`).default;
                return yield loginPage.getLoginPageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.goToLoginPage, err.message);
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
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.goToLoginPage, err.message);
            }
        });
    }
    goToRegisterPage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to Register Page`);
                yield this.tabLogin.click();
                let registerPage = require(`../page-objects/register-page`).default;
                return yield registerPage.getRegisterPageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.goToRegisterPage, err.message);
            }
        });
    }
    goToChangePassword() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to Change Password Page`);
                yield this.tabLogin.click();
                let changePasswordPage = require(`../page-objects/change-password-page`).default;
                return yield changePasswordPage.getChangePassWordInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.goToChangePassword, err.message);
            }
        });
    }
    goToTabTimeTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to Time table page`);
                yield this.tabTimeTable.click();
                let timeTablePage = require(`../page-objects/time-table-page`).default;
                return yield timeTablePage.getTimeTablePageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.goToTabTimeTable, err.message);
            }
        });
    }
    goToBookTicket() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to book ticket page`);
                yield this.tabLogin.click();
                let bookTicketPage = require(`../page-objects/book-ticket-page`).default;
                return yield bookTicketPage.getBookTickeInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.goToBookTicket, err.message);
            }
        });
    }
    goToTicketPricePage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to ticket price page`);
                yield this.tabLogin.click();
                let ticketPricePage = require(`../page-objects/ticket-price-page`).default;
                return yield ticketPricePage.getTicketPricePageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.goToTicketPricePage, err.message);
            }
        });
    }
    goToMyTicketPage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to ticket page`);
                yield this.tabLogin.click();
                let myTicketPage = require(`../page-objects/my-ticket-page`).default;
                return yield myTicketPage.getMyTicketPageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.goToMyTicketPage, err.message);
            }
        });
    }
    goToBookTicketUnloggedUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to book ticket page unlogger user`);
                yield this.tabBookTicket.click();
                let loginPage = require(`../page-objects/login-page`).default;
                return yield loginPage.getLoginPageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.goToBookTicketUnloggedUser, err.message);
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
                const StringFormat = (str, ...args) => str.replace(/{(\d+)}/g, (match, index) => args[index] || '');
                let xpath = StringFormat("//table[@class='{0}']//tr", table);
                return browser_wrapper_1.default.getDriverInstance().FindElements(protractor_1.by.xpath(xpath)).count();
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
                let bookTicketPage = require(`../page-objects/book-ticket-page`).default;
                return yield bookTicketPage.getBookTickeInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.bookTicketFromTicketPrice, err.message);
            }
        });
    }
    isLogOut() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.navigationItem(general_1.PageName.LOGIN).isDisplayed();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getWelcomeMessage, err.message);
            }
        });
    }
}
exports.default = GeneralPage;
//# sourceMappingURL=general-page.js.map