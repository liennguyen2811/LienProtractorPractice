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
class TicketPricePage extends general_page_1.default {
    static getTicketPricePageInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            this._ticketPricePage = new TicketPricePage();
            return this._ticketPricePage;
        });
    }
    checkTableCellValue(tablename, row, column, expected) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    checkTicketPriceForDN_SGTrip() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = TicketPricePage;
//# sourceMappingURL=ticket-price-page.js.map