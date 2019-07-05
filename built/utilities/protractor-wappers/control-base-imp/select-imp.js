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
class Select extends base_control_imp_1.default {
    constructor(obj) {
        super(obj);
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
}
exports.default = Select;
//# sourceMappingURL=select-imp.js.map