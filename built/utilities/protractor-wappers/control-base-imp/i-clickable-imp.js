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
const error_wapper_1 = require("../error-wapper");
const stop_watch_1 = __importDefault(require("@utilities/general/stop-watch"));
const i_base_control_imp_1 = __importDefault(require("./i-base-control-imp"));
const browser_wrapper_1 = __importDefault(require("../browser-wrapper"));
class Clickable extends i_base_control_imp_1.default {
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
    moveMouseAndClick(timeoutInSecond = this._elementTimeout, opt_offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (timeoutInSecond < 0) {
                    throw new error_wapper_1.errorwrapper.NoSuchElementError(this._by);
                }
                let stopWatch = new stop_watch_1.default();
                stopWatch.startClock();
                yield this.wait(stopWatch.getTimeLeftInSecond(timeoutInSecond));
                yield browser_wrapper_1.default.getActions().mouseMove(this._element, opt_offset).click().perform().then(() => __awaiter(this, void 0, void 0, function* () { }), (error) => __awaiter(this, void 0, void 0, function* () {
                    let _error = error;
                    if (_error.message.includes("Element is not currently interactable") || _error.name == error_wapper_1.errorwrapper.StaleElementReferenceError.name) {
                        yield this.moveMouseAndClick(stopWatch.getTimeLeftInSecond(timeoutInSecond), opt_offset);
                    }
                    else {
                        throw _error;
                    }
                }));
                return this;
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.moveMouseAndClick, err.message);
            }
        });
    }
}
exports.Clickable = Clickable;
//# sourceMappingURL=i-clickable-imp.js.map