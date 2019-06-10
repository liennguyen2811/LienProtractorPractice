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
const logger_1 = require("../general/logger");
const error_wapper_1 = require("./error-wapper");
const test_run_info_1 = __importDefault(require("../../data-objects/general/test-run-info"));
class BrowserWrapper {
    static getDriverInstance() {
        try {
            if (BrowserWrapper._browserArray.length == 0) {
                BrowserWrapper._currentBrowser = protractor_1.protractor.browser;
                BrowserWrapper._browserArray.push(BrowserWrapper._currentBrowser);
                return BrowserWrapper._currentBrowser;
            }
            else {
                return BrowserWrapper._currentBrowser;
            }
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.getDriverInstance, err.message);
        }
    }
    static get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Navigate to ${url}`);
                let currentBrowser = yield BrowserWrapper.getDriverInstance();
                yield currentBrowser.waitForAngularEnabled(false);
                yield currentBrowser.get(url);
                yield currentBrowser.waitForAngularEnabled(false);
            }
            catch (err) {
                throw new err;
            }
        });
    }
    static maximize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, 'Maximnizing window');
                yield BrowserWrapper.getDriverInstance().manage().window().maximize();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.maximize, err.message);
            }
        });
    }
    static quit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BrowserWrapper.getDriverInstance().quit();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.quit, err.message);
            }
        });
    }
    static restart(waitForAngularEnabled = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Restart browser`);
                let currentBrowser = BrowserWrapper.getDriverInstance();
                yield currentBrowser.restart();
                BrowserWrapper._browserArray.length = 0;
                currentBrowser = BrowserWrapper.getDriverInstance();
                yield currentBrowser.waitForAngularEnabled(waitForAngularEnabled);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.restart, err.message);
            }
        });
    }
    static restartAllBrowsers(waitForAngularEnabled = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Restarting all browsers`);
                let numberBrowsers = BrowserWrapper._browserArray.length;
                let currentBrowser;
                if (numberBrowsers != 1) {
                    for (let i = 1; i <= numberBrowsers; i++) {
                        BrowserWrapper._currentBrowser = BrowserWrapper._browserArray[i - 1];
                        currentBrowser = BrowserWrapper.getDriverInstance();
                        yield currentBrowser.restart();
                        currentBrowser = BrowserWrapper.getDriverInstance();
                        yield currentBrowser.waitForAngularEnabled(waitForAngularEnabled);
                    }
                }
                currentBrowser = BrowserWrapper.getDriverInstance();
                yield currentBrowser.restart();
                BrowserWrapper._browserArray.length = 0;
                currentBrowser = BrowserWrapper.getDriverInstance();
                yield currentBrowser.waitForAngularEnabled(waitForAngularEnabled);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.restartAllBrowsers, err.message);
            }
        });
    }
    static executeScript(script, ...var_args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BrowserWrapper.getDriverInstance().executeScript(script, var_args);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.executeScript, err.message);
            }
        });
    }
    static switchToFrame(index) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BrowserWrapper.getDriverInstance().switchTo().frame(index);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.switchToFrame, err.message);
            }
        });
    }
    static switchToFrameById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let webElement = BrowserWrapper.getDriverInstance().findElement(protractor_1.By.id('id'));
                yield BrowserWrapper.getDriverInstance().switchTo().frame(webElement);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.switchToFrameById, err.message);
            }
        });
    }
    static waitForAlertDisplay() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BrowserWrapper.getDriverInstance().wait(protractor_1.protractor.ExpectedConditions.alertIsPresent);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.waitForAlertDisplay, err.message);
            }
        });
    }
    static acceptAlert() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BrowserWrapper.getDriverInstance().switchTo().alert().accept();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.acceptAlert, err.message);
            }
        });
    }
    static close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BrowserWrapper.getDriverInstance().close();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.close, err.message);
            }
        });
    }
    static scrollToTop() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.executeScript("window.scrollTo(0, 0);");
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.scrollToTop, err.message);
            }
        });
    }
    static sleepInSecond(second) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield BrowserWrapper.getDriverInstance().sleep(second * 1000);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.sleepInSecond, err.mess);
            }
        });
    }
    static getActions() {
        try {
            return BrowserWrapper.getDriverInstance().actions();
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.getActions, err.message);
        }
    }
    static settingWaitForAngularEnabled(waitForAngularEnabled) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Setting wait for agular enabled`);
                let currentBrowser = yield BrowserWrapper.getDriverInstance();
                yield currentBrowser.waitForAngularEnabled(waitForAngularEnabled);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.settingWaitForAngularEnabled, err.message);
            }
        });
    }
    static refreshPage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let currentBrowser = BrowserWrapper.getDriverInstance();
                yield currentBrowser.switchTo().alert().then((alert) => __awaiter(this, void 0, void 0, function* () {
                    yield this.acceptAlert();
                }), () => { });
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.refreshPage, err.message);
            }
        });
    }
    static getSize() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield BrowserWrapper.getDriverInstance().driver.manage().window().getSize();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getSize, err.message);
            }
        });
    }
    static waitForAngularEnabled(enabled) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let currentBrowser = yield BrowserWrapper.getDriverInstance();
                yield currentBrowser.waitForAngularEnabled(enabled);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.waitForAngularEnabled, err.message);
            }
        });
    }
    static wait(condition, opt_timeout, opt_message) {
        try {
            return BrowserWrapper.getDriverInstance().wait(condition, opt_timeout, opt_message);
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.wait, err.message);
        }
    }
    static setPageLoadTimeout(timeoutInSecond) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (timeoutInSecond == null)
                    timeoutInSecond = test_run_info_1.default.pageTimeout;
                yield BrowserWrapper.getDriverInstance().manage().timeouts().pageLoadTimeout(timeoutInSecond * 1000);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.setPageLoadTimeout, err.message);
            }
        });
    }
}
BrowserWrapper._browserArray = new Array();
exports.default = BrowserWrapper;
//# sourceMappingURL=browser-wrapper.js.map