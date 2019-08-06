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
const error_wapper_1 = require("@utilities/protractor-wappers/error-wapper");
const general_page_1 = __importDefault(require("./general-page"));
const home_page_1 = __importDefault(require("./home-page"));
const textbox_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/textbox"));
const button_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/button"));
const lable_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/lable"));
class LoginPage extends general_page_1.default {
    constructor() {
        super(...arguments);
        this.password = new textbox_1.default(protractor_1.by.xpath("//input[@id='password']"));
        this.userName = new textbox_1.default(protractor_1.by.xpath("//input[@id='username']"));
        this.logIn = new button_1.default(protractor_1.by.xpath("//input[@value='login']"));
        this.errorMessage = new lable_1.default(protractor_1.by.xpath("//p[@class='message error LoginForm']"));
    }
    static getLoginPageInstance() {
        this._loginPage = new LoginPage();
        return this._loginPage;
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.password.scrollToElement();
                yield this.userName.waitForControlStable();
                yield this.userName.sendKeys(username);
                if (password != "") {
                    yield this.password.sendKeys(password);
                    yield this.password.waitForControlStable();
                }
                yield this.logIn.waitForControlStable();
                yield this.logIn.click();
                return home_page_1.default.getHomePageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.login, err.message);
            }
        });
    }
    getErrormessage() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.errorMessage.getText();
        });
    }
    isLoginPageDisplayed(timeOut) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.password.isDisplayed(timeOut);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.isLoginPageDisplayed, err.message);
            }
        });
    }
    checkNonPassWordWithValidInfo(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (let i = 0; i < 4; i++) {
                    yield this.login("liennguyenlogigear12@gmail.com", "liennguyen1");
                }
                let homePage = yield this.login(username, password);
                return yield homePage.getNonePasswordMsg();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.checkNonPassWordWithValidInfo, err.message);
            }
        });
    }
}
exports.default = LoginPage;
//# sourceMappingURL=login-page.js.map