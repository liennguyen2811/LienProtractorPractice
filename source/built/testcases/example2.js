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
const browser_wrapper_1 = __importDefault(require("../utilities/protractor-wappers/browser-wrapper"));
describe('Protractor Demo App', function () {
    it('should add one and two', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_wrapper_1.default.waitForAngularEnabled(false);
            yield browser_wrapper_1.default.get('http://18.136.107.136/Page/HomePage.cshtml');
        });
    });
});
//# sourceMappingURL=example2.js.map