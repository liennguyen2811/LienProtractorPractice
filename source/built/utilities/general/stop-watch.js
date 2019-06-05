"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_wapper_1 = require("../protractor-wappers/error-wapper");
class StopWatch {
    constructor() {
        this._startTime = 0;
    }
    startClock() {
        try {
            if (this._startTime == null) {
                this._startTime = new Date().getTime();
            }
            else {
                throw Error("Clock has already started");
            }
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.startClock, err.message);
        }
    }
    getElapsedTime() {
        try {
            let endTime = new Date().getTime();
            return endTime - this._startTime;
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.getElapsedTime, err.message);
        }
    }
    getElapsedTimeInSecond() {
        try {
            let endTime = new Date().getTime();
            return endTime - this._startTime / 1000;
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.getElapsedTime, err.message);
        }
    }
    getTimeLeftInSecond(maxTimeInSecond) {
        try {
            return maxTimeInSecond - this.getElapsedTime();
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.getElapsedTimeInSecond, err.message);
        }
    }
}
exports.default = StopWatch;
//# sourceMappingURL=stop-watch.js.map