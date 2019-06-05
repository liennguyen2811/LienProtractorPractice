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
const browser_wrapper_1 = __importDefault(require("./browser-wrapper"));
const error_wapper_1 = require("./error-wapper");
const stop_watch_1 = __importDefault(require("../general/stop-watch"));
const protractor_1 = require("protractor");
class ElementWrapper {
    constructor(obj) {
        this._elementTimeout = 60;
        if (obj.constructor.name === "ElementFinder") {
            let eleFinder = obj;
            this._by = eleFinder.locator();
            this._element = eleFinder;
        }
        else {
            let loc = obj;
            this._by = loc;
            this._element = browser_wrapper_1.default.getDriverInstance().element(this._by);
        }
    }
    wait(timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_wrapper_1.default.wait(protractor_1.ExpectedConditions.elementToBeClickable(this._element), timeoutInSecond * 1000).then(() => { }, (error) => { });
            return this;
        });
    }
    waitForPresenceOf(timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_wrapper_1.default.wait(protractor_1.ExpectedConditions.presenceOf(this._element), timeoutInSecond * 1000).then(() => { }, (error) => { });
            return this;
        });
    }
    getControlValue() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.getAttribute("value");
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getControlValue, err.message);
            }
        });
    }
    getAttribute(attributeName, timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let sw = new stop_watch_1.default();
            sw.startClock();
            try {
                yield this.waitForPresenceOf(sw.getTimeLeftInSecond(timeoutInSecond));
                return yield this._element.getAttribute(attributeName);
            }
            catch (err) {
                if (err instanceof protractor_1.error.StaleElementReferenceError) {
                    return yield this.getAttribute(attributeName, sw.getTimeLeftInSecond(timeoutInSecond));
                }
                else {
                    throw new error_wapper_1.errorwrapper.CustomError(this.getAttribute, err.message);
                }
            }
        });
    }
    getText(timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.waitForPresenceOf(timeoutInSecond);
                return yield this._element.getText();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getText, err.message);
            }
        });
    }
    isSelected(timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.wait(timeoutInSecond);
                return yield this._element.isSelected();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.isSelected, err.message);
            }
        });
    }
    waitForVisibilityOf(timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_wrapper_1.default.wait(protractor_1.ExpectedConditions.visibilityOf(this._element), timeoutInSecond * 1000).then(() => { }, (error) => { });
            return this;
        });
    }
    isEnabled(timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.waitForPresenceOf(timeoutInSecond);
                return yield this._element.isEnabled();
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.isEnabled, err.message);
            }
        });
    }
    click(timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            if (timeoutInSecond < 0) {
                throw new error_wapper_1.errorwrapper.TimeoutError;
            }
            let stopWatch = new stop_watch_1.default();
            stopWatch.startClock();
            yield this.wait(stopWatch.getTimeLeftInSecond(timeoutInSecond));
            yield this._element.click().then(() => __awaiter(this, void 0, void 0, function* () { }), (err) => __awaiter(this, void 0, void 0, function* () {
                let _error = err;
                if (_error.message.includes("Other element would recieve the click") || _error.message.includes("element isnot attached to the page document")) {
                    yield this.click(stopWatch.getTimeLeftInSecond(timeoutInSecond));
                }
                else {
                    throw _error;
                }
            }));
            return this;
        });
    }
    doubleClick(timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (timeoutInSecond < 0) {
                    throw new error_wapper_1.errorwrapper.TimeoutError;
                }
                let stopWatch = new stop_watch_1.default();
                stopWatch.startClock();
                yield this.wait(stopWatch.getTimeLeftInSecond(timeoutInSecond));
                yield browser_wrapper_1.default.getActions().doubleClick(this._element).perform().then(() => __awaiter(this, void 0, void 0, function* () { }), (err) => __awaiter(this, void 0, void 0, function* () {
                    let _error = err;
                    if (_error.message.includes("Other element would recieve the click") || _error.message.includes("element isnot attached to the page document")) {
                        yield this.doubleClick(stopWatch.getTimeLeftInSecond(timeoutInSecond));
                    }
                    else {
                        throw _error;
                    }
                }));
                return this;
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.doubleClick, err.message);
            }
        });
    }
    type(value, timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (timeoutInSecond < 0) {
                    throw new error_wapper_1.errorwrapper.TimeoutError;
                }
                let stopWatch = new stop_watch_1.default();
                stopWatch.startClock();
                yield this.wait(stopWatch.getTimeLeftInSecond(timeoutInSecond));
                yield browser_wrapper_1.default.getActions().mouseMove(this._element).perform();
                yield this._element.sendKeys(value).then(() => __awaiter(this, void 0, void 0, function* () {
                    let enterValue = yield this.getControlValue();
                    if (enterValue == null) {
                        enterValue = yield this.getText();
                        if ((enterValue != value)) {
                            return yield this.type(value, stopWatch.getTimeLeftInSecond(timeoutInSecond));
                        }
                        else {
                            if ((enterValue != value)) {
                                return yield this.type(value, stopWatch.getTimeLeftInSecond(timeoutInSecond));
                            }
                        }
                    }
                }));
                return this;
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.type, err.message);
            }
        });
    }
    uploadFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.wait(this._elementTimeout);
                yield browser_wrapper_1.default.getActions().mouseMove(this._element).perform();
                yield this._element.sendKeys(filePath);
                return this;
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.uploadFile, err.message);
            }
        });
    }
    pressButton(button) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.wait(this._elementTimeout);
                yield browser_wrapper_1.default.getActions().mouseMove(this._element).perform();
                yield this._element.sendKeys(button);
                return this;
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.pressButton, err.message);
            }
        });
    }
    clear(timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (timeoutInSecond < 0) {
                    throw new error_wapper_1.errorwrapper.TimeoutError;
                }
                let stopWatch = new stop_watch_1.default();
                stopWatch.startClock();
                yield this.wait(stopWatch.getTimeLeftInSecond(timeoutInSecond));
                yield this._element.clear().then(() => __awaiter(this, void 0, void 0, function* () { }), (err) => __awaiter(this, void 0, void 0, function* () {
                    let _error = err;
                    if (_error.message.includes("Element is not currently interactable")) {
                        yield this.clear(stopWatch.getTimeLeftInSecond(timeoutInSecond));
                    }
                    else {
                        throw _error;
                    }
                }));
                return this;
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.type, err.message);
            }
        });
    }
    setCheckBox(state, timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tagName = yield this._element.getAttribute("tagName");
                let isChecked = false;
                if (timeoutInSecond < 0) {
                    throw new error_wapper_1.errorwrapper.TimeoutError();
                }
                let stopWatch = new stop_watch_1.default();
                stopWatch.startClock();
                yield this.wait(stopWatch.getTimeLeftInSecond(timeoutInSecond));
                if (tagName.toLowerCase() == "div") {
                    let childElement = yield this._element.element(protractor_1.by.xpath('(//input[not(@disabled)])[1]'));
                    isChecked = yield childElement.isSelected();
                }
                else if (tagName.toLowerCase() == "input") {
                    isChecked = yield this._element.isSelected();
                }
                if ((isChecked == false && state) || isChecked && state == false) {
                    yield this._element.click().then(() => __awaiter(this, void 0, void 0, function* () { }), (error) => __awaiter(this, void 0, void 0, function* () {
                        if (error.message.includes("Other element would receive the click")) {
                            yield this.setCheckBox(state, stopWatch.getTimeLeftInSecond(timeoutInSecond));
                        }
                        else {
                            throw error;
                        }
                    }));
                }
                return this;
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.setCheckBox, err.message);
            }
        });
    }
    isDisplayed(timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isDisplayed = false;
                yield this.waitForVisibilityOf(timeoutInSecond);
                yield this._element.isDisplayed().then(() => {
                    isDisplayed = true;
                }, (error) => {
                    let _err = error;
                    if (_err.message.includes("No element found using locator") || _err.message.includes("Index out of bound")) {
                        isDisplayed = false;
                    }
                });
                return isDisplayed;
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.isDisplayed, err.message);
            }
        });
    }
}
exports.default = ElementWrapper;
//# sourceMappingURL=element-wrapper.js.map