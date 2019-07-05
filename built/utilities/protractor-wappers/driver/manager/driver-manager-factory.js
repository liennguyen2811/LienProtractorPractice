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
const test_run_info_1 = __importDefault(require("@data-objects/general/test-run-info"));
const protractor_1 = require("protractor");
const error_wapper_1 = require("@utilities/protractor-wappers/error-wapper");
class DriverManagerFactory {
    static getDriverInstance() {
        try {
            if (DriverManagerFactory._browserArray.length == 0) {
                DriverManagerFactory._currentBrowser = protractor_1.protractor.browser;
                DriverManagerFactory._browserArray.push(DriverManagerFactory._currentBrowser);
                return DriverManagerFactory._currentBrowser;
            }
            else {
                return DriverManagerFactory._currentBrowser;
            }
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.getDriverInstance, err.message);
        }
    }
    static setPageLoadTimeout(timeoutInSecond) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (timeoutInSecond == null)
                    timeoutInSecond = test_run_info_1.default.pageTimeout;
                yield DriverManagerFactory.getDriverInstance().manage().timeouts().pageLoadTimeout(timeoutInSecond * 1000);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.setPageLoadTimeout, err.message);
            }
        });
    }
}
DriverManagerFactory._browserArray = new Array();
exports.default = DriverManagerFactory;
//# sourceMappingURL=driver-manager-factory.js.map