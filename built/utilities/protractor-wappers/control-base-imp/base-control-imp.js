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
const browser_wrapper_1 = __importDefault(require("../browser-wrapper"));
const error_wapper_1 = require("../error-wapper");
const stop_watch_1 = __importDefault(require("@utilities/general/stop-watch"));
const protractor_1 = require("protractor");
const general_1 = require("@data-objects/general/general");
const platform_1 = require("@data-objects/general/platform");
class BaseControl {
    constructor(obj) {
        this._elementTimeout = test_run_info_1.default.elementTimeout;
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
    element(by, timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (timeoutInSecond < 0) {
                    throw new error_wapper_1.errorwrapper.TimeoutError();
                }
                let sw = new stop_watch_1.default();
                sw.startClock;
                yield this.wait(sw.getTimeLeftInSecond(timeoutInSecond));
                let child;
                try {
                    child = this._element.element(by);
                    yield child.isDisplayed();
                }
                catch (err) {
                    if (err instanceof protractor_1.error.NoSuchElementError) {
                        yield browser_wrapper_1.default.sleepInSecond(0.5);
                        child = yield this.element(by, sw.getTimeLeftInSecond(timeoutInSecond));
                    }
                    else {
                        throw err;
                    }
                }
                return child;
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.element, err.message);
            }
        });
    }
    wait(timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_wrapper_1.default.wait(protractor_1.ExpectedConditions.elementToBeClickable(this._element), timeoutInSecond * 1000).then(() => { }, (error) => { });
            return this;
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
    isDisplayed(timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isDisplayed = false;
                yield this.waitForVisibilityOf(timeoutInSecond);
                yield this._element.isDisplayed().then(() => __awaiter(this, void 0, void 0, function* () {
                    isDisplayed = true;
                }), (error) => {
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
    getElementCoordinate(position, timeoutInSecond) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.waitForVisibilityOf(timeoutInSecond);
                let location = yield this._element.getLocation();
                let eSize = yield this._element.getSize();
                switch (position) {
                    case general_1.CoordinateType.LEFT:
                        return location.x;
                        ;
                    case general_1.CoordinateType.TOP:
                        return location.y;
                        ;
                    case general_1.CoordinateType.RIGHT:
                        return location.x + eSize.width;
                        ;
                    case general_1.CoordinateType.BOTTOM:
                        return location.y + eSize.height;
                        ;
                }
                return 0;
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getElementCoordinate, err.message);
            }
        });
    }
    waitForControlStable(timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (test_run_info_1.default.browser != platform_1.Browser.IE) {
                    let sw = new stop_watch_1.default();
                    sw.startClock();
                    yield this.wait(sw.getTimeLeftInSecond(timeoutInSecond));
                    let eleID = yield this._element.getAttribute('id');
                    let eleClass = yield this._element.getAttribute('class');
                    let bottom, left, right, top, width, x, y;
                    if (eleID != null && eleID != undefined && eleID != "") {
                        while (sw.getTimeLeftInSecond(timeoutInSecond) > 0) {
                            try {
                                let elementBottom = yield browser_wrapper_1.default.executeScript(`return document.getElementById('${eleID}').getBoundingClientRect().bottom`);
                                let elementLeft = yield browser_wrapper_1.default.executeScript(`return document.getElementById('${eleID}').getBoundingClientRect().left`);
                                let elementRight = yield browser_wrapper_1.default.executeScript(`return document.getElementById('${eleID}').getBoundingClientRect().right`);
                                let elementTop = yield browser_wrapper_1.default.executeScript(`return document.getElementById('${eleID}').getBoundingClientRect().top`);
                                let elementWidth = yield browser_wrapper_1.default.executeScript(`return document.getElementById('${eleID}').getBoundingClientRect().width`);
                                let elementX = yield browser_wrapper_1.default.executeScript(`return document.getElementById('${eleID}').getBoundingClientRect().x`);
                                let elementY = yield browser_wrapper_1.default.executeScript(`return document.getElementById('${eleID}').getBoundingClientRect().y`);
                                if (elementBottom == bottom && elementLeft == left && elementRight == right && elementTop == top && elementWidth == width && elementX == x && elementY == y) {
                                    break;
                                }
                                else {
                                    bottom = elementBottom;
                                    left = elementLeft;
                                    right = elementRight;
                                    top = elementTop;
                                    width = elementWidth;
                                    x = elementX;
                                    y = elementY;
                                }
                            }
                            catch (e) {
                            }
                            yield browser_wrapper_1.default.sleepInSecond(0.05);
                        }
                    }
                    else if (eleClass != null && eleClass != undefined && eleClass != "") {
                        while (sw.getTimeLeftInSecond(timeoutInSecond) > 0) {
                            try {
                                let elementBottom = yield browser_wrapper_1.default.executeScript(`return document.getElementsByClassName('${eleClass}')[0].getBoundingClientRect().bottom`);
                                let elementLeft = yield browser_wrapper_1.default.executeScript(`return document.getElementsByClassName('${eleClass}')[0].getBoundingClientRect().left`);
                                let elementRight = yield browser_wrapper_1.default.executeScript(`return document.getElementsByClassName('${eleClass}')[0].getBoundingClientRect().right`);
                                let elementTop = yield browser_wrapper_1.default.executeScript(`return document.getElementsByClassName('${eleClass}')[0].getBoundingClientRect().top`);
                                let elementWidth = yield browser_wrapper_1.default.executeScript(`return document.getElementsByClassName('${eleClass}')[0].getBoundingClientRect().width`);
                                let elementX = yield browser_wrapper_1.default.executeScript(`return document.getElementsByClassName('${eleClass}')[0].getBoundingClientRect().x`);
                                let elementY = yield browser_wrapper_1.default.executeScript(`return document.getElementsByClassName('${eleClass}')[0].getBoundingClientRect().y`);
                                if (elementBottom == bottom && elementLeft == left && elementRight == right && elementTop == top && elementWidth == width && elementX == x && elementY == y) {
                                    break;
                                }
                                else {
                                    bottom = elementBottom;
                                    left = elementLeft;
                                    right = elementRight;
                                    top = elementTop;
                                    width = elementWidth;
                                    x = elementX;
                                    y = elementY;
                                }
                            }
                            catch (e) {
                            }
                            yield browser_wrapper_1.default.sleepInSecond(0.05);
                        }
                    }
                }
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.waitForControlStable, err.message);
            }
        });
    }
    moveMouse(opt_offset, timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (timeoutInSecond < 0) {
                    throw new error_wapper_1.errorwrapper.TimeoutError();
                }
                let sw = new stop_watch_1.default();
                sw.startClock();
                yield this.wait(sw.getTimeLeftInSecond(timeoutInSecond));
                yield browser_wrapper_1.default.getActions().mouseMove(this._element, opt_offset).perform().then(() => __awaiter(this, void 0, void 0, function* () { }), (error) => __awaiter(this, void 0, void 0, function* () {
                    let _error = error;
                    if (_error.message.includes("Element is not currently interactable") || _error.name == error_wapper_1.errorwrapper.StaleElementReferenceError.caller.name) {
                        yield this.moveMouse(opt_offset, sw.getTimeLeftInSecond(timeoutInSecond));
                    }
                    else {
                        throw _error;
                    }
                }));
                return this;
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.moveMouse, err.message);
            }
        });
    }
}
exports.default = BaseControl;
//# sourceMappingURL=base-control-imp.js.map