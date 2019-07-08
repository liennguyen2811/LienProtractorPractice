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
const link_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/link"));
const protractor_1 = require("protractor");
const logger_1 = require("@utilities/general/logger");
const error_wapper_1 = require("@utilities/protractor-wappers/error-wapper");
class GeneralPage {
    constructor() {
        this.navigationItem = new link_1.default(protractor_1.by.xpath("//div[@id= 'menu']//a[@href = '/Account/Login.cshtml']"));
    }
    goToLoginPage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Going to Login Page`);
                yield this.navigationItem.click();
                let loginPage = require(`../page-objects/login-page`).default;
                return yield loginPage.getLoginPageInstance();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.goToLoginPage, err.message);
            }
        });
    }
}
exports.default = GeneralPage;
//# sourceMappingURL=general-page.js.map