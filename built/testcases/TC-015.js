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
const ticket_1 = require("@data-objects/railway/ticket");
describe('Mangage ticket TC15', function () {
    test_base_1.default.scheduleTestBase();
    let ticket = new ticket_1.Ticket();
    let expectedMsg = "Sorry, can't find any results that match your filters.\r\nPlease change the filters and try again.";
    let homePage = new home_page_1.default();
    let loginPage;
    let bookTickePage;
    let myTickePage;
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        yield logger_1.Logger.write(logger_1.FunctionType.TESTCASE, `TC15- User can cancel a ticket`);
        homePage = home_page_1.default.getHomePageInstance();
    }), test_run_info_1.default.conditionTimeout);
    it('TC15- User can cancel a ticket', () => __awaiter(this, void 0, void 0, function* () {
        loginPage = yield homePage.goToPage(general_1.PageName.LOGIN);
        yield loginPage.login(test_run_info_1.default.USERNAME, test_run_info_1.default.PASSWORD);
        bookTickePage = yield homePage.goToPage(general_1.PageName.BOOKTICKET);
        ticket.initTicket(general_1.Station.NHATRANG, general_1.Station.PHANTHIET, general_1.SeatType.SOFTBEDWITHAIR, 1);
        yield bookTickePage.getBookTicket(ticket);
        myTickePage = yield bookTickePage.goToPage(general_1.PageName.MYTICKET);
        yield myTickePage.cancelTicket();
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        yield logger_1.Logger.write(logger_1.FunctionType.NONE, `Final - Cleaning Up\n`);
        try {
            homePage.goToPage(general_1.PageName.LOGOUT);
        }
        catch (err) { }
    }), test_run_info_1.default.conditionTimeout);
});
//# sourceMappingURL=TC-015.js.map