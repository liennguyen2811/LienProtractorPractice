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
const account_1 = require("@data-objects/railway/account");
describe('Manage account TC07', function () {
    test_base_1.default.scheduleTestBase();
    let homePage = new home_page_1.default();
    let loginPage;
    let registerPage;
    let account = new account_1.Account();
    let expectedText = "Invalid username or password. Please try again.";
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield logger_1.Logger.write(logger_1.FunctionType.API, `TC07- User can not login with an account has not been activated`);
        homePage = home_page_1.default.getHomePageInstance();
        loginPage = yield homePage.goToPage(general_1.PageName.LOGIN);
        registerPage = yield loginPage.goToPage(general_1.PageName.REGISTER);
        account.initAccount();
        yield registerPage.RegisterAccount(account);
    }), test_run_info_1.default.conditionTimeout);
    it('TC07- User can not login with an account has not been activated', () => __awaiter(this, void 0, void 0, function* () {
        loginPage = yield homePage.goToPage(general_1.PageName.LOGIN);
        yield loginPage.login(account.Email, account.Password);
        expect(yield loginPage.getErrormessage()).toBe(expectedText, "Error register message does not appear");
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield logger_1.Logger.write(logger_1.FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
        }
        catch (err) { }
    }), test_run_info_1.default.conditionTimeout);
});
//# sourceMappingURL=TC-07.js.map