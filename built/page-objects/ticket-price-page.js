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
const general_page_1 = __importDefault(require("@page-objects/general-page"));
const browser_wrapper_1 = __importDefault(require("@utilities/protractor-wappers/browser-wrapper"));
class TicketPricePage extends general_page_1.default {
    static getTicketPricePageInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            this._ticketPricePage = new TicketPricePage();
            return this._ticketPricePage;
        });
    }
    checkTableCellValuePrice(tablename, row, column, columnname, expected) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(yield this.getTableCellValueCheckPrice(tablename, row, column, columnname));
            let observedResult = yield this.getTableCellValueCheckPrice(tablename, row, column, columnname);
            console.log(observedResult);
            yield expect(expected).toBe(observedResult, "\nFailed at column: " + column + "\nActual: " + observedResult + "\nExpected: " + expected);
        });
    }
    checkTicketPriceForDN_SGTrip() {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_wrapper_1.default.sleepInSecond(10);
            yield this.checkTableCellValuePrice("MyTable MedTable", 3, 1, "SS", "310000");
            yield this.checkTableCellValuePrice("MyTable MedTable", 3, 2, "SS", "335000");
            yield this.checkTableCellValuePrice("MyTable MedTable", 3, 3, "SSC", "360000");
            yield this.checkTableCellValuePrice("MyTable MedTable", 3, 4, "HB", "410000");
            yield this.checkTableCellValuePrice("MyTable MedTable", 3, 5, "SB", "460000");
            yield this.checkTableCellValuePrice("MyTable MedTable", 3, 6, "SBC", "510000");
        });
    }
}
exports.default = TicketPricePage;
//# sourceMappingURL=ticket-price-page.js.map