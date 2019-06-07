"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestRunInfo {
}
TestRunInfo.browser = "Chrome";
TestRunInfo.elementTimeout = 60;
TestRunInfo.RAILWAY_URL = "http://18.136.107.136/Page/HomePage.cshtml";
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