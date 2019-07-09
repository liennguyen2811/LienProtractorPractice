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
const element_wrapper_1 = __importDefault(require("@utilities/protractor-wappers/element-wrapper"));
const error_wapper_1 = require("@utilities/protractor-wappers/error-wapper");
const general_page_old_1 = __importDefault(require("./general-page-old"));
const home_page_old_1 = __importDefault(require("./home-page-old"));
class LoginPageOld extends general_page_old_1.default {
    constructor() {
        super(...arguments);
        this.txtUsername = new element_wrapper_1.default(protractor_1.by.xpath("//input[@id='username']"));
        this.txtPasword = new element_wrapper_1.default(protractor_1.by.xpath("//input[@id='password']"));
        this.btnLogin = new element_wrapper_1.default(protractor_1.by.xpath("//input[@value='login']"));
        this.lbErrorMessage = new element_wrapper_1.default(protractor_1.by.xpath("//p[@class='message error LoginForm']"));
    }
    static getLoginPageOldInstance() {
        this._loginPageold = new LoginPageOld();
        return this._loginPageold;
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.txtPasword.scrollToElement();
                yield this.txtUsername.sendKeys(username);
                if (password != "") {
                    yield this.txtPasword.sendKeys(password);
                }
                yield this.btnLogin.click();
                return home_page_old_1.default.getHomePageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.login, err.message);
            }
        });
    }
    geterrormessage() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.lbErrorMessage.getText();
        });
    }
    isLoginPageDisplayed(timeOut) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.txtPasword.isDisplayed(timeOut);
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
                    console.log("invalid password, ", i);
                    yield this.login("liennguyenlogigear12@gmail.com", "liennguyen1");
                }
                let homePage = yield this.login(username, password);
                return yield homePage.getNonpasswordmessage();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.checkNonPassWordWithValidInfo, err.message);
            }
        });
    }
}
exports.default = LoginPageOld;
//# sourceMappingURL=login-page-old.js.map