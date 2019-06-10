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
const test_base_1 = __importDefault(require("./test-base"));
const logger_1 = require("../utilities/general/logger");
const test_run_info_1 = __importDefault(require("../data-objects/general/test-run-info"));
const home_page_1 = __importDefault(require("../page-objects/home-page"));
describe('MAX suite - 459981', function () {
    test_base_1.default.scheduleTestBase();
    let expectedMsg = "Welcome liennguyenlogigear12@gmail.com";
    let homePage;
    let loginPage;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield logger_1.Logger.write(logger_1.FunctionType.TESTCASE, `TC01- User can login into Raiway with valid username and password`);
        homePage = home_page_1.default.getHomePageInstance();
    }), test_run_info_1.default.conditionTimeout);
    it('TC01- User can login into Raiway with valid username and password', () => __awaiter(this, void 0, void 0, function* () {
        loginPage = yield homePage.gotoLoginPage();
        expect(yield loginPage.Login("liennguyenlogigear12@gmail.com", "liennguyen1").getWelcomeMessage()).toBe(expectedMsg, "Could not login");
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield logger_1.Logger.write(logger_1.FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
        }
        catch (err) { }
    }), test_run_info_1.default.conditionTimeout);
});
//# sourceMappingURL=example1.js.map