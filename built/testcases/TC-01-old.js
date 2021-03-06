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
const home_page_old_1 = __importDefault(require("@page-objects/home-page-old"));
const test_run_info_1 = __importDefault(require("@data-objects/general/test-run-info"));
const test_base_1 = __importDefault(require("@testcases/test-base"));
const home_page_old_2 = __importDefault(require("@page-objects/home-page-old"));
describe('Login suite TC01', function () {
    test_base_1.default.scheduleTestBase();
    let expectedMsg = "aaaWelcome liennguyenlogigear12@gmail.com";
    let homePageOld = new home_page_old_2.default();
    let loginPageOld;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield logger_1.Logger.write(logger_1.FunctionType.TESTCASE, `TC01- User can login into Raiway with valid username and password`);
        homePageOld = home_page_old_1.default.getHomePageInstance();
    }), test_run_info_1.default.conditionTimeout);
    it('TC01- User can login into Raiway with valid username and password', () => __awaiter(this, void 0, void 0, function* () {
        loginPageOld = yield homePageOld.goToLoginPage();
        yield loginPageOld.login(test_run_info_1.default.USERNAME, test_run_info_1.default.PASSWORD);
        expect(yield homePageOld.getWelcomeMessage()).toBe(expectedMsg, "Failed by: Could not login");
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield logger_1.Logger.write(logger_1.FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            homePageOld.logout();
        }
        catch (err) { }
    }), test_run_info_1.default.conditionTimeout);
});
//# sourceMappingURL=TC-01-old.js.map