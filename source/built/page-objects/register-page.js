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
const general_page_1 = __importDefault(require("@page-objects/general-page"));
const protractor_1 = require("protractor");
const element_wrapper_1 = __importDefault(require("@utilities/protractor-wappers/element-wrapper"));
class RegisterPage extends general_page_1.default {
    constructor() {
        super(...arguments);
        this.txtEmail = new element_wrapper_1.default(protractor_1.by.XPath("//input[@id='email']"));
        this.txtPasword = new element_wrapper_1.default(protractor_1.by.XPath("//input[@id='password']"));
        this.txtConfirmPassword = new element_wrapper_1.default(protractor_1.by.XPath("//input[@id='confirmPassword']"));
        this.txtPID = new element_wrapper_1.default(protractor_1.by.XPath("//input[@id='pid']"));
        this.btnRegister = new element_wrapper_1.default(protractor_1.by.XPath("//input[@value='Register']"));
    }
    static getRegisterPageInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            this._registerPage = new RegisterPage();
            return this._registerPage;
        });
    }
    RegisterAccount(account) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.txtEmail.sendKeys(account.Email);
            yield this.txtPasword.sendKeys(account.Password);
            yield this.txtPID.sendKeys(account.RegPID);
            yield this.txtPasword.sendKeys(account.Password);
            yield this.btnRegister.click();
            return this;
        });
    }
}
exports.default = RegisterPage;
//# sourceMappingURL=register-page.js.map