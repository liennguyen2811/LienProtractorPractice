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
const home_page_old_1 = __importDefault(require("@page-objects/home-page-old"));
const test_run_info_1 = __importDefault(require("@data-objects/general/test-run-info"));
const test_base_1 = __importDefault(require("@testcases/test-base"));
describe('Login suite - TC04', function () {
    test_base_1.default.scheduleTestBase();
    let expectedMsg = "You have used 4 out of 5 login attempts. After all 5 have been used, you will be unable to login for 15 minutes";
    let homePage = new home_page_old_1.default();
    let loginPage;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        homePage = home_page_old_1.default.getHomePageInstance();
    }), test_run_info_1.default.conditionTimeout);
    it('Login page displays when un-logged User clicks on Book ticket tab', () => __awaiter(this, void 0, void 0, function* () {
        loginPage = yield homePage.goToLoginPage();
        expect(yield loginPage.checkNonPassWordWithValidInfo(test_run_info_1.default.USERNAME, test_run_info_1.default.PASSWORD)).toBe(expectedMsg, "Failed by BugJiraID-02: The warning message does not display after wrong loging 4 times in Railway website");
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        try {
            homePage.logout();
        }
        catch (err) { }
    }), test_run_info_1.default.conditionTimeout);
});
//# sourceMappingURL=TC-04.js.map