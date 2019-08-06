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
const ticket_price_page_1 = __importDefault(require("@page-objects/ticket-price-page"));
const element_1 = __importDefault(require("@utilities/protractor-wappers/control-common-imp/element"));
const protractor_1 = require("protractor");
const logger_1 = require("@utilities/general/logger");
class TimeTablePage extends general_page_1.default {
    trainTimeTableRow(departStation, arriveStation) {
        return new element_1.default(protractor_1.by.xpath(`//td[.='${departStation}']/following-sibling::td[.='${arriveStation}']/following-sibling::td[.='check price']`));
    }
    static getTimeTablePageInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            this._timeTablePage = new TimeTablePage();
            return this._timeTablePage;
        });
    }
    goToTabTimeTableRow(departStation, arriveStation) {
        return __awaiter(this, void 0, void 0, function* () {
            yield logger_1.Logger.write(logger_1.FunctionType.UI, `Select trip from ${departStation} to ${arriveStation} `);
            yield this.trainTimeTableRow(departStation, arriveStation).click();
            return new ticket_price_page_1.default();
        });
    }
}
exports.default = TimeTablePage;
//# sourceMappingURL=time-table-page.js.map