"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const error_wapper_1 = require("@utilities/protractor-wappers/error-wapper");
const config_1 = require("@data-objects/general/config");
const utility_1 = require("@utilities/general/utility");
class TestRunInfo {
    static setUpTestRunInfo(JsonPath) {
        try {
            let jsonString = fs_1.default.readFileSync(JsonPath, 'utf8');
            let configData = utility_1.JsonUtility.deserialize(JSON.parse(jsonString), config_1.ConfigInfo);
            TestRunInfo.browser = configData.browser.toLocaleLowerCase();
            console.log("TestRunInfo.browser ", TestRunInfo.browser);
            TestRunInfo.elementTimeout = configData.elementTimeout;
            TestRunInfo.testTimeout = configData.testTimeout;
            console.log("TestRunInfo.testTimeout ", TestRunInfo.testTimeout);
            TestRunInfo.pageTimeout = configData.pageTimeout;
            TestRunInfo.shortTimeout = TestRunInfo.testTimeout / 12;
            TestRunInfo.conditionTimeout = TestRunInfo.testTimeout / 2;
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.setUpTestRunInfo, err.message);
        }
    }
}
TestRunInfo.RAILWAY_URL = "http://18.136.107.136/Account/Login.cshtml";
TestRunInfo.USERNAME = "liennguyenlogigear12@gmail.com";
TestRunInfo.PASSWORD = "liennguyen";
exports.default = TestRunInfo;
var Station;
(function (Station) {
    Station[Station["SAIGON"] = 0] = "SAIGON";
    Station[Station["PHANTHIET"] = 1] = "PHANTHIET";
    Station[Station["NHATRANG"] = 2] = "NHATRANG";
    Station[Station["DANANG"] = 3] = "DANANG";
    Station[Station["HUE"] = 4] = "HUE";
    Station[Station["QUANGNGAI"] = 5] = "QUANGNGAI";
})(Station = exports.Station || (exports.Station = {}));
var SeatType;
(function (SeatType) {
    SeatType[SeatType["HARDSEAT"] = 0] = "HARDSEAT";
    SeatType[SeatType["SOFTSEAT"] = 1] = "SOFTSEAT";
    SeatType[SeatType["SOFTSEATWITHAIR"] = 2] = "SOFTSEATWITHAIR";
    SeatType[SeatType["HARDBED"] = 3] = "HARDBED";
    SeatType[SeatType["SOFTBED"] = 4] = "SOFTBED";
    SeatType[SeatType["SOFTBEDWITHAIR"] = 5] = "SOFTBEDWITHAIR";
})(SeatType = exports.SeatType || (exports.SeatType = {}));
//# sourceMappingURL=test-run-info.js.map