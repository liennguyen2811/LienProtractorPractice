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
const test_run_info_1 = __importDefault(require("../../data-objects/data-objects/general/test-run-info"));
const protractor_1 = require("protractor");
const element_wrapper_1 = __importDefault(require("./element-wrapper"));
const stop_watch_1 = __importDefault(require("../general/stop-watch"));
const error_wapper_1 = require("./error-wapper");
const browser_wrapper_1 = __importDefault(require("./browser-wrapper"));
class SelectElementWrapper {
    constructor(by) {
        this._elementTimeout = test_run_info_1.default.elementTimeout;
        this._by = by;
        this._element = new element_wrapper_1.default(this._by);
    }
    selectByID(id, timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let sw = new stop_watch_1.default();
            sw.startClock();
            try {
                yield this._element.waitForControlStable();
                yield this._element.click(sw.getTimeLeftInSecond(timeoutInSecond));
                let e = yield this._element.element(protractor_1.by.xpath(`//*[@id = '${id}']`), sw.getTimeLeftInSecond(timeoutInSecond));
                yield e.click();
            }
            catch (_err) {
                let err = _err;
                if (err.message.includes("element not visible") || err.message.includes("element not interactable")) {
                    yield this.selectByID(id, sw.getTimeLeftInSecond(timeoutInSecond));
                }
                else {
                    throw new error_wapper_1.errorwrapper.CustomError(this.selectByID, err.message);
                }
            }
        });
    }
    selectOption(by, timeoutInSecond = this._elementTimeout) {
        return __awaiter(this, void 0, void 0, function* () {
            let sw = new stop_watch_1.default();
            sw.startClock();
            try {
                yield this._element.waitForControlStable();
                yield this._element.click(sw.getTimeLeftInSecond(timeoutInSecond));
                let optionElement = yield this._element.element(by, sw.getTimeLeftInSecond(timeoutInSecond));
                yield optionElement.click();
                yield this._element.waitForControlStable();
            }
            catch (err) {
                if (err.message.includes("element not interactable")) {
                    yield this.selectOption(by, sw.getTimeLeftInSecond(timeoutInSecond));
                }
                else {
                    throw new error_wapper_1.errorwrapper.CustomError(this.selectOption, err.message);
                }
            }
        });
    }
    selectOptionByText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tagName = yield this._element.getAttribute("tagName");
                let locator = "";
                let tagNameLowCase = yield tagName.toLowerCase();
                if (tagNameLowCase == "select") {
                    locator = protractor_1.by.xpath(`//option[text()='${text}']`);
                }
                else if (tagNameLowCase == "div") {
                    locator = protractor_1.by.xpath(`//div[@role='option']//span[contains(text(),'${text}')]`);
                }
                yield this.selectOption(locator);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.selectOptionByText, err.message);
            }
        });
    }
    selectOptionByTextWithIndex(text, index) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tagName = yield this._element.getAttribute("tagName");
                let locator = "";
                if (tagName.toLowerCase() == "select") {
                    locator = protractor_1.by.xpath(`(//option[text()='${text}'])[${index}]`);
                }
                else if (tagName.toLowerCase() == "div") {
                    locator = protractor_1.by.xpath(`(//div[@role='option']//span[text()='${text}'])[${index}]`);
                }
                yield this.selectOption(locator);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.selectOptionByTextWithIndex, err.message);
            }
        });
    }
    selectOptionByTextContains(text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tagName = yield this._element.getAttribute("tagName");
                let locator = "";
                if (tagName.toLowerCase() == "select") {
                    locator = protractor_1.by.xpath(`//option[contains(text(),'${text}')]`);
                }
                else if (tagName.toLowerCase() == "div") {
                    locator = protractor_1.by.xpath(`//div[@role='option']//span[contains(text(),'${text}')]`);
                }
                yield this.selectOption(locator);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.selectOptionByTextContains, err.message);
            }
        });
    }
    selectOptionByIndex(index) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tagName = yield this._element.getAttribute("tagName");
                let locator = "";
                if (tagName.toLowerCase() == "select") {
                    let elementId = yield this._element.getAttribute("id");
                    if (elementId == null) {
                        let elementClass = yield this._element.getAttribute("className");
                        yield browser_wrapper_1.default.executeScript(`document.getElementsByClassName("${elementClass}").selectedIndex = ${index}`);
                    }
                    else
                        yield browser_wrapper_1.default.executeScript(`document.getElementById("${elementId}").selectedIndex = ${index}`);
                }
                else if (tagName.toLowerCase() == "div") {
                    locator = protractor_1.by.xpath(`//div[@role='option'][${index}]`);
                    yield this.selectOption(locator);
                }
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.selectOptionByIndex, err.message);
            }
        });
    }
}
exports.default = SelectElementWrapper;
//# sourceMappingURL=select-element-wapper.js.map