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
const element_wrapper_1 = __importDefault(require("../utilities/protractor-wappers/element-wrapper"));
const protractor_1 = require("protractor");
class ChangePassWordPage extends general_page_1.default {
    constructor() {
        super(...arguments);
        this.txtCurrentPassword = new element_wrapper_1.default(protractor_1.by.XPath("//input[@id='currentPassword']"));
        this.txtNewPassword = new element_wrapper_1.default(protractor_1.by.XPath("//input[@id='newPassword']"));
        this.txtConfirmPassword = new element_wrapper_1.default(protractor_1.by.XPath("//input[@id='confirmPassword']"));
        this.btnChangePassword = new element_wrapper_1.default(protractor_1.by.XPath("//input[@value='Change Password']"));
    }
    static getChangePassWordInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            this._changePassWordPage = new ChangePassWordPage();
            return this._changePassWordPage;
        });
    }
    ChangePassword(currentPassword, newPassword, confirmPassword) {
        this.txtCurrentPassword.sendKeys(currentPassword);
        this.txtNewPassword.sendKeys(newPassword);
        this.txtConfirmPassword.sendKeys(confirmPassword);
        this.btnChangePassword.click();
        return this;
    }
}
exports.default = ChangePassWordPage;
//# sourceMappingURL=change-password-page.js.map