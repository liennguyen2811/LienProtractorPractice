"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const json2typescript_1 = require("json2typescript");
let ConfigInfo = class ConfigInfo {
    constructor() {
        this.browser = "";
        this.elementTimeout = 0;
        this.pageTimeout = 0;
        this.testTimeout = 0;
    }
};
__decorate([
    json2typescript_1.JsonProperty("browser", String),
    __metadata("design:type", String)
], ConfigInfo.prototype, "browser", void 0);
__decorate([
    json2typescript_1.JsonProperty("elementTimeout", Number),
    __metadata("design:type", Number)
], ConfigInfo.prototype, "elementTimeout", void 0);
__decorate([
    json2typescript_1.JsonProperty("pageTimeout", Number),
    __metadata("design:type", Number)
], ConfigInfo.prototype, "pageTimeout", void 0);
__decorate([
    json2typescript_1.JsonProperty("testTimeout", Number),
    __metadata("design:type", Number)
], ConfigInfo.prototype, "testTimeout", void 0);
ConfigInfo = __decorate([
    json2typescript_1.JsonObject
], ConfigInfo);
exports.ConfigInfo = ConfigInfo;
//# sourceMappingURL=config.js.map