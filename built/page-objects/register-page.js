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
const browser_wrapper_1 = __importDefault(require("@utilities/protractor-wappers/browser-wrapper"));
const element_wrapper_1 = __importDefault(require("@utilities/protractor-wappers/element-wrapper"));
const error_wapper_1 = require("@utilities/protractor-wappers/error-wapper");
const protractor_1 = require("protractor");
const textbox_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/textbox"));
const general_1 = require("@data-objects/general/general");
const button_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/button"));
const general_page_1 = __importDefault(require("./general-page"));
class RegisterPage extends general_page_1.default {
    constructor() {
        super(...arguments);
        this.Register = new button_1.default(protractor_1.by.xpath("//input[@value='Register']"));
        this.txtPasword = new element_wrapper_1.default(protractor_1.by.xpath("//input[@id='password']"));
        this.txtConfirmPassword = new element_wrapper_1.default(protractor_1.by.xpath("//input[@id=]"));
        this.txtPID = new element_wrapper_1.default(protractor_1.by.xpath("//input[@id='pid']"));
        this.btnRegister = new element_wrapper_1.default(protractor_1.by.xpath("//input[@value='Register']"));
    }
    RegisterItem(registeritemname) {
        return new textbox_1.default(protractor_1.by.xpath(`//input[@id='${registeritemname}']`));
    }
    static getRegisterPageInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            this._registerPage = new RegisterPage();
            return this._registerPage;
        });
    }
    RegisterAccount(account) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.RegisterItem(general_1.RegisterItem.EMAIL).waitForPresenceOf();
                yield this.RegisterItem(general_1.RegisterItem.EMAIL).sendKeys(account.Email);
                yield this.txtPasword.sendKeys(account.Password);
                yield this.RegisterItem(general_1.RegisterItem.PID).scrollToElement();
                yield this.RegisterItem(general_1.RegisterItem.PID).sendKeys(account.RegPID);
                yield this.RegisterItem(general_1.RegisterItem.CONFIRMPASSWORD).sendKeys(account.Password);
                yield this.Register.click();
                yield browser_wrapper_1.default.sleepInSecond(4);
                return this;
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.RegisterAccount, err.message);
            }
        });
    }
}
exports.default = RegisterPage;
//# sourceMappingURL=register-page.js.map