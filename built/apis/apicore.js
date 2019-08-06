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
let XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;
class APICore {
    static request(options, json) {
        let response = new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                let http = new XMLHttpRequest();
                http.open(options.method.toString(), options.url + options.getParamString(), true);
                options.headers.forEach((value, key) => {
                    http.setRequestHeader(key, value);
                });
                if (json == null)
                    http.send(options.getBodyString());
                else
                    http.send(json);
                http.onerror = function () {
                    reject(Error(`Error while requesting API. Status code: ${http.status}. Body: ${http.responseText}.`));
                };
                http.onload = function () {
                    resolve(new APIResponse(http.status, http.responseText, http.getResponseHeader("icStatusDescription"), options));
                };
            });
        });
        return response;
    }
    static requestJson(options, json) {
        let response = new Promise(function (resolve, reject) {
            return __awaiter(this, void 0, void 0, function* () {
                let http = new XMLHttpRequest();
                http.open(options.method.toString(), options.url + options.getParamString(), true);
                options.headers.forEach((value, key) => {
                    http.setRequestHeader(key, value);
                });
                http.send(json);
                http.onerror = function () {
                    reject(Error(`Error while requesting API. Status code: ${http.status}. Body: ${http.responseText}.`));
                };
                http.onload = function () {
                    resolve(new APIResponse(http.status, http.responseText, http.getResponseHeader("icStatusDescription"), options));
                };
            });
        });
        return response;
    }
}
exports.APICore = APICore;
var Method;
(function (Method) {
    Method["POST"] = "POST";
    Method["PUT"] = "PUT";
    Method["GET"] = "GET";
    Method["DELETE"] = "DELETE";
})(Method = exports.Method || (exports.Method = {}));
class APIResponse {
    constructor(status, body, header, options) {
        this.status = status;
        this.body = body;
        this.header = header;
        this.options = options;
    }
}
exports.APIResponse = APIResponse;
class Options {
    constructor(url, method, headers = new Map(), body = new Map(), param = new Map()) {
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.body = body;
        this.param = param;
    }
    addHeader(key, value) {
        this.headers.set(key, value);
    }
    addBody(key, value) {
        if (value != "null") {
            this.body.set(key, value);
        }
    }
    addParam(key, value) {
        if (value != "null") {
            this.param.set(key, value);
        }
    }
    getParamString() {
        let result = "?";
        let i = 0;
        this.param.forEach((value, key) => {
            result += `${key}=${value}`;
            i++;
            if (i < this.param.size) {
                result += "&";
            }
        });
        result += "";
        if (result == "?") {
            return "";
        }
        else {
            return result;
        }
    }
    getBodyString() {
        let result = "{";
        let i = 0;
        this.body.forEach((value, key) => {
            result += `"${key}": "${value}"`;
            i++;
            if (i < this.body.size) {
                result += ", ";
            }
        });
        result += "}";
        return result;
    }
}
exports.Options = Options;
//# sourceMappingURL=apicore.js.map