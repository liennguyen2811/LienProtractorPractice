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
const test_run_info_1 = __importDefault(require("../data-objects/general/test-run-info"));
const browser_wrapper_1 = __importDefault(require("../utilities/protractor-wappers/browser-wrapper"));
const logger_1 = require("../utilities/general/logger");
class TestBase {
    static scheduleTestBase() {
        return __awaiter(this, void 0, void 0, function* () {
            beforeEach(() => __awaiter(this, void 0, void 0, function* () {
                jasmine.DEFAULT_TIMEOUT_INTERVAL = test_run_info_1.default.testTimeout;
                yield browser_wrapper_1.default.setPageLoadTimeout(1);
                yield logger_1.Logger.write(logger_1.FunctionType.NONE, `Intial - Setting Up\n`);
                yield this.navigateToWebPage(test_run_info_1.default.RAILWAY_URL);
            }), test_run_info_1.default.conditionTimeout);
        });
    }
    ;
    static navigateToWebPage(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield browser_wrapper_1.default.restart();
            yield browser_wrapper_1.default.maximize();
            yield browser_wrapper_1.default.get(url);
        });
    }
    ;
}
exports.default = TestBase;
//# sourceMappingURL=test-base.js.map