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
const editable_imp_1 = __importDefault(require("../control-base-imp/editable-imp"));
const error_wapper_1 = require("../error-wapper");
const stop_watch_1 = __importDefault(require("@utilities/general/stop-watch"));
const protractor_1 = require("protractor");
class Checkbox extends editable_imp_1.default {
    constructor(obj) {
        super(obj);
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
}
exports.default = Checkbox;
//# sourceMappingURL=checkbox.js.map