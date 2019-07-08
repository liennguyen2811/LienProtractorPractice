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
const home_page_old_1 = __importDefault(require("@page-objects/home-page-old"));
const error_wapper_1 = require("@utilities/protractor-wappers/error-wapper");
const textbox_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/textbox"));
const button_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/button"));
const lable_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/lable"));
const general_page_1 = __importDefault(require("./general-page"));
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
                yield this.userName.sendKeys(username);
                if (password != "") {
                    yield this.password.sendKeys(password);
                }
                yield this.logIn.click();
                return home_page_old_1.default.getHomePageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.login, err.message);
            }
        });
    }
    geterrormessage() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.errorMessage.getText();
        });
    }
}
exports.default = LoginPage;
//# sourceMappingURL=login-page.js.map