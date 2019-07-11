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
describe('Login suite - TC08', function () {
    test_base_1.default.scheduleTestBase();
    let newPass = "liennguyen1";
    let expectedMsg = "Your password has been updated!";
    let homePage = new home_page_1.default();
    let loginPage;
    let changePasswordPage;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield logger_1.Logger.write(logger_1.FunctionType.TESTCASE, `TC08- User can change password`);
        homePage = home_page_1.default.getHomePageInstance();
    }), test_run_info_1.default.conditionTimeout);
    it('TC08- User can change password', () => __awaiter(this, void 0, void 0, function* () {
        loginPage = yield homePage.goToPage(general_1.PageName.LOGIN);
        yield loginPage.login(test_run_info_1.default.USERNAME, test_run_info_1.default.PASSWORD);
        changePasswordPage = yield homePage.goToPage(general_1.PageName.CHANGEPASSWORD);
        yield changePasswordPage.changePassword(test_run_info_1.default.PASSWORD, newPass, newPass);
        expect(yield changePasswordPage.getPasswordChangeDoneMsg()).toBe(expectedMsg, "Could not change password");
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield logger_1.Logger.write(logger_1.FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            changePasswordPage = yield homePage.goToPage(general_1.PageName.CHANGEPASSWORD);
            yield changePasswordPage.changePassword(newPass, test_run_info_1.default.PASSWORD, test_run_info_1.default.PASSWORD);
        }
        catch (err) { }
    }), test_run_info_1.default.conditionTimeout);
});
//# sourceMappingURL=TC-08.js.map