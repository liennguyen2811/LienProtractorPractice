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
}
exports.default = GeneralPage;
//# sourceMappingURL=general-page.js.map