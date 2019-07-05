"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_logger_1 = __importDefault(require("js-logger"));
var LogType;
(function (LogType) {
    LogType[LogType["DEBUG"] = 0] = "DEBUG";
    LogType[LogType["INFO"] = 1] = "INFO";
    LogType[LogType["WARN"] = 2] = "WARN";
    LogType[LogType["ERROR"] = 3] = "ERROR";
})(LogType = exports.LogType || (exports.LogType = {}));
var FunctionType;
(function (FunctionType) {
    FunctionType["UI"] = "UI";
    FunctionType["API"] = "API";
    FunctionType["OTHER"] = "OTHER";
    FunctionType["NONE"] = "NONE";
    FunctionType["TESTCASE"] = "TESTCASE";
})(FunctionType = exports.FunctionType || (exports.FunctionType = {}));
class Logger {
    static write(messageType, info, debugType = LogType.INFO) {
        return new Promise((resolve) => {
            let text = "";
            let i = 1;
            let bString = "=";
            let textLen = info.length;
            if (textLen > 131) {
                textLen = 131;
            }
            if (messageType != FunctionType.NONE) {
                if (messageType.toString() == FunctionType.TESTCASE.toString()) {
                    for (i; i < textLen; i++) {
                        bString = bString + "=";
                    }
                    text = `\n${bString}\n${info}\n${bString}\n`;
                }
                else {
                    text = `${messageType} >>>>> ${info}`;
                }
            }
            else {
                text = `${info}`;
            }
            switch (debugType) {
                case LogType.DEBUG:
                    resolve(js_logger_1.default.debug(text));
                    break;
                case LogType.INFO:
                    resolve(js_logger_1.default.info(text));
                    break;
                case LogType.WARN:
                    resolve(js_logger_1.default.warn(text));
                    break;
                case LogType.ERROR:
                    resolve(js_logger_1.default.error(text));
                    break;
            }
        });
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map