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
const protractor_1 = require("protractor");
const element_wrapper_1 = __importDefault(require("../utilities/protractor-wappers/element-wrapper"));
class LoginPage extends general_page_1.default {
    constructor() {
        super(...arguments);
        this.txtUsername = new element_wrapper_1.default(protractor_1.by.XPath("//input[@id='username']"));
        this.txtPasword = new element_wrapper_1.default(protractor_1.by.XPath("//input[@id='password']"));
        this.btnLogin = new element_wrapper_1.default(protractor_1.by.XPath("//input[@value='login']"));
        this.lbErrorMessage = new element_wrapper_1.default(protractor_1.by.XPath("//p[@class='message error LoginForm']"));
    }
    static getLoginPageInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            this._loginPage = new LoginPage();
            return this._loginPage;
        });
    }
    Login(username, password) {
        this.txtUsername.sendKeys(username);
        if (password != "") {
            this.txtPasword.sendKeys(password);
        }
        this.btnLogin.click();
        return this;
    }
    Geterrormessage() {
        return this.lbErrorMessage.getText();
    }
}
exports.default = LoginPage;
//# sourceMappingURL=login-page.js.map