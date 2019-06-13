"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const drivertype_1 = require("./drivertype");
const RunningMode_1 = require("./RunningMode");
class DriverProperty {
    constructor() {
        this.remoteUrl = "";
        this._isRemoteMode = false;
        this.driverType = drivertype_1.DriverType.Chrome;
        this.driverExecutable = "";
        this.runningMode = RunningMode_1.RunningMode.Local;
        this.capabilities = "";
        this.arguments = "";
        this.provider = "";
    }
    getCapabilities() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.capabilities;
        });
    }
    setCapabilities(capabilities) {
        return __awaiter(this, void 0, void 0, function* () {
            this.capabilities = capabilities;
        });
    }
    getDriverExecutable() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.driverExecutable;
        });
    }
    setDriverExecutable(driverExecutable) {
        return __awaiter(this, void 0, void 0, function* () {
            this.driverExecutable = driverExecutable;
        });
    }
    getRunningMode() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.runningMode;
        });
    }
    setRunningMode(runningMode) {
        return __awaiter(this, void 0, void 0, function* () {
            this.runningMode = runningMode;
        });
    }
    isRemoteMode() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.getRunningMode() != null && (yield this.getRunningMode()) == RunningMode_1.RunningMode.Remote) {
                this._isRemoteMode = true;
            }
            return this._isRemoteMode;
        });
    }
    getRemoteUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.remoteUrl;
        });
    }
    setRemoteUrl(remoteUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            this.remoteUrl = remoteUrl;
        });
    }
    getDriverType() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.driverType;
        });
    }
    setDriverType(driverType) {
        return __awaiter(this, void 0, void 0, function* () {
            this.driverType = driverType;
        });
    }
    getArguments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.arguments;
        });
    }
    setArguments(arg) {
        return __awaiter(this, void 0, void 0, function* () {
            this.arguments = arg;
        });
    }
    getProvider() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.provider;
        });
    }
    setProvider(provider) {
        return __awaiter(this, void 0, void 0, function* () {
            this.provider = provider;
        });
    }
}
exports.default = DriverProperty;
//# sourceMappingURL=driverproperty.js.map