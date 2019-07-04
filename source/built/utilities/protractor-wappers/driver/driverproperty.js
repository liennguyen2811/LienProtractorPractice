"use strict";
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
    agetCapabilities() {
        return this.capabilities;
    }
    setCapabilities(capabilities) {
        this.capabilities = capabilities;
    }
    getDriverExecutable() {
        return this.driverExecutable;
    }
    setDriverExecutable(driverExecutable) {
        this.driverExecutable = driverExecutable;
    }
    getRunningMode() {
        return this.runningMode;
    }
    setRunningMode(runningMode) {
        this.runningMode = runningMode;
    }
    isRemoteMode() {
        if (this.getRunningMode() != null && this.getRunningMode() == RunningMode_1.RunningMode.Remote) {
            this._isRemoteMode = true;
        }
        return this._isRemoteMode;
    }
    getRemoteUrl() {
        return this.remoteUrl;
    }
    setRemoteUrl(remoteUrl) {
        this.remoteUrl = remoteUrl;
    }
    getDriverType() {
        return this.driverType;
    }
    setDriverType(driverType) {
        this.driverType = driverType;
    }
    getArguments() {
        return this.arguments;
    }
    setArguments(arg) {
        this.arguments = arg;
    }
    getProvider() {
        return this.provider;
    }
    setProvider(provider) {
        this.provider = provider;
    }
}
exports.default = DriverProperty;
//# sourceMappingURL=driverproperty.js.map