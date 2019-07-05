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
const logger_1 = require("@utilities/general/logger");
const error_wapper_1 = require("@utilities/protractor-wappers/error-wapper");
const protractor_1 = require("protractor");
const driver_manager_factory_1 = __importDefault(require("./manager/driver-manager-factory"));
let protractor = require("protractor");
class DriverUtils extends driver_manager_factory_1.default {
    static getDriverInstance() {
        try {
            if (DriverUtils._browserArray.length == 0) {
                DriverUtils._currentBrowser = protractor.browser;
                DriverUtils._browserArray.push(DriverUtils._currentBrowser);
                return DriverUtils._currentBrowser;
            }
            else {
                return DriverUtils._currentBrowser;
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
                let currentBrowser = yield DriverUtils.getDriverInstance();
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
                yield DriverUtils.getDriverInstance().manage().window().maximize();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.maximize, err.message);
            }
        });
    }
    static quit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield DriverUtils.getDriverInstance().quit();
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
                let currentBrowser = DriverUtils.getDriverInstance();
                yield currentBrowser.restart();
                DriverUtils._browserArray.length = 0;
                currentBrowser = DriverUtils.getDriverInstance();
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
                let numberBrowsers = DriverUtils._browserArray.length;
                let currentBrowser;
                if (numberBrowsers != 1) {
                    for (let i = 1; i <= numberBrowsers; i++) {
                        DriverUtils._currentBrowser = DriverUtils._browserArray[i - 1];
                        currentBrowser = DriverUtils.getDriverInstance();
                        yield currentBrowser.restart();
                        currentBrowser = DriverUtils.getDriverInstance();
                        yield currentBrowser.waitForAngularEnabled(waitForAngularEnabled);
                    }
                }
                currentBrowser = DriverUtils.getDriverInstance();
                yield currentBrowser.restart();
                DriverUtils._browserArray.length = 0;
                currentBrowser = DriverUtils.getDriverInstance();
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
                return yield DriverUtils.getDriverInstance().executeScript(script, var_args);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.executeScript, err.message);
            }
        });
    }
    static switchToFrame(index) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield DriverUtils.getDriverInstance().switchTo().frame(index);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.switchToFrame, err.message);
            }
        });
    }
    static switchToFrameById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let webElement = DriverUtils.getDriverInstance().findElement(protractor_1.By.id('id'));
                yield DriverUtils.getDriverInstance().switchTo().frame(webElement);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.switchToFrameById, err.message);
            }
        });
    }
    static waitForAlertDisplay() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield DriverUtils.getDriverInstance().wait(protractor.ExpectedConditions.alertIsPresent);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.waitForAlertDisplay, err.message);
            }
        });
    }
    static acceptAlert() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield DriverUtils.getDriverInstance().switchTo().alert().accept();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.acceptAlert, err.message);
            }
        });
    }
    static close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield DriverUtils.getDriverInstance().close();
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
                yield DriverUtils.getDriverInstance().sleep(second * 1000);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.sleepInSecond, err.mess);
            }
        });
    }
    static getActions() {
        try {
            return DriverUtils.getDriverInstance().actions();
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.getActions, err.message);
        }
    }
    static settingWaitForAngularEnabled(waitForAngularEnabled) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield logger_1.Logger.write(logger_1.FunctionType.UI, `Setting wait for agular enabled`);
                let currentBrowser = yield DriverUtils.getDriverInstance();
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
                let currentBrowser = DriverUtils.getDriverInstance();
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
                return yield DriverUtils.getDriverInstance().driver.manage().window().getSize();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getSize, err.message);
            }
        });
    }
    static waitForAngularEnabled(enabled) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let currentBrowser = yield DriverUtils.getDriverInstance();
                yield currentBrowser.waitForAngularEnabled(enabled);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.waitForAngularEnabled, err.message);
            }
        });
    }
    static wait(condition, opt_timeout, opt_message) {
        try {
            return DriverUtils.getDriverInstance().wait(condition, opt_timeout, opt_message);
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.wait, err.message);
        }
    }
}
exports.default = DriverUtils;
//# sourceMappingURL=driverutils.js.map