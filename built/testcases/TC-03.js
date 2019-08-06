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
const logger_1 = require("@utilities/general/logger");
const test_run_info_1 = __importDefault(require("@data-objects/general/test-run-info"));
const test_base_1 = __importDefault(require("@testcases/test-base"));
const home_page_1 = __importDefault(require("@page-objects/home-page"));
const general_1 = require("@data-objects/general/general");
describe('Login suite - TC03', function () {
    test_base_1.default.scheduleTestBase();
    let homePage = new home_page_1.default();
    let loginPage;
    let bookTickPage;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield logger_1.Logger.write(logger_1.FunctionType.TESTCASE, `TC03- Login page displays when un-logged User clicks on Book ticket tab`);
        homePage = home_page_1.default.getHomePageInstance();
    }), test_run_info_1.default.conditionTimeout);
    it('TC03- Login page displays when un-logged User clicks on Book ticket tab', () => __awaiter(this, void 0, void 0, function* () {
        bookTickPage = yield homePage.goToPage(general_1.PageName.BOOKTICKET);
        expect(yield bookTickPage.isLoginPageDisplayed(test_run_info_1.default.shortTimeout)).toBe(true, "Login page does not display");
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield logger_1.Logger.write(logger_1.FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
        }
        catch (err) { }
    }), test_run_info_1.default.conditionTimeout);
});
//# sourceMappingURL=TC-03.js.map