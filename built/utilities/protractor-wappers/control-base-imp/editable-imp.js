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
const base_control_imp_1 = __importDefault(require("./base-control-imp"));
const error_wapper_1 = require("../error-wapper");
const stop_watch_1 = __importDefault(require("@utilities/general/stop-watch"));
const browser_wrapper_1 = __importDefault(require("../browser-wrapper"));
class Editable extends base_control_imp_1.default {
    constructor(obj) {
        super(obj);
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
                throw new error_wapper_1.errorwrapper.CustomError(this.clear, err.message);
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
}
exports.default = Editable;
//# sourceMappingURL=editable-imp.js.map