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
const protractor_1 = require("protractor");
const browser_wrapper_1 = __importDefault(require("../browser-wrapper"));
const error_wapper_1 = require("../error-wapper");
class Frame extends editable_imp_1.default {
    constructor(obj) {
        super(obj);
    }
    switchToFrameById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let webElement = browser_wrapper_1.default.getDriverInstance().findElement(protractor_1.By.id('id'));
                yield browser_wrapper_1.default.getDriverInstance().switchTo().frame(webElement);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.switchToFrameById, err.message);
            }
        });
    }
    switchToFrame(index) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield browser_wrapper_1.default.getDriverInstance().switchTo().frame(index);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.switchToFrame, err.message);
            }
        });
    }
}
exports.default = Frame;
//# sourceMappingURL=frame.js.map