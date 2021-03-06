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
const browser_wrapper_1 = __importDefault(require("@utilities/protractor-wappers/browser-wrapper"));
const test_run_info_1 = __importDefault(require("@data-objects/general/test-run-info"));
const general_page_old_1 = __importDefault(require("@page-objects/general-page-old"));
class HomePageOld extends general_page_old_1.default {
    static getHomePageInstance() {
        this._homePageold = new HomePageOld();
        return this._homePageold;
    }
    navigateToWebPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_wrapper_1.default.restart();
            yield browser_wrapper_1.default.maximize();
            yield browser_wrapper_1.default.get(test_run_info_1.default.RAILWAY_URL);
        });
    }
}
exports.default = HomePageOld;
//# sourceMappingURL=home-page-old.js.map