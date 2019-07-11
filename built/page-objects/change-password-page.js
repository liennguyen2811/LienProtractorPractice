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
const error_wapper_1 = require("@utilities/protractor-wappers/error-wapper");
const textbox_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/textbox"));
const general_1 = require("@data-objects/general/general");
const button_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/button"));
class ChangePassWordPage extends general_page_1.default {
    constructor() {
        super(...arguments);
        this.change = new button_1.default(protractor_1.by.xpath("//input[@value='Change Password']"));
    }
    changePassworkItem(item) {
        return new textbox_1.default(protractor_1.by.xpath(`//input[@id='${item}']`));
    }
    static getChangePassWordPageInstance() {
        this._changePassWordPage = new ChangePassWordPage();
        return this._changePassWordPage;
    }
    changePassword(currentPassword, newPassword, confirmPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.changePassworkItem(general_1.ChangePasswordItem.CURRENTPASSWORD).sendKeys(currentPassword);
                yield this.changePassworkItem(general_1.ChangePasswordItem.NEWPASSWORD).sendKeys(newPassword);
                yield this.changePassworkItem(general_1.ChangePasswordItem.CONFIRMPASSWORD).sendKeys(confirmPassword);
                yield this.change.click();
                return this;
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.changePassword, err.message);
            }
        });
    }
}
exports.default = ChangePassWordPage;
//# sourceMappingURL=change-password-page.js.map