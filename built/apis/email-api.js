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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_path_1 = __importDefault(require("@test-data/general/project-path"));
const fs = __importStar(require("fs"));
const googleapis_1 = require("googleapis");
const readline_1 = __importDefault(require("readline"));
const error_wapper_1 = require("@utilities/protractor-wappers/error-wapper");
const apicore_1 = require("./apicore");
const test_run_info_1 = __importDefault(require("@data-objects/general/test-run-info"));
const SCOPES = ['https://mail.google.com/'];
const TOKEN_PATH = `${project_path_1.default.project}/token.json`;
class GmailHelper {
    email(from, to, subject, body) {
        let mail = '';
        mail += `From: ${from} \n`;
        mail += `To: ${to} \n`;
        mail += `Subject: ${subject} \n`;
        mail += "Date: Fri, 21 Nov 1997 09:55:06 -0600 \n";
        mail += "Message-ID: <1234@local.machine.example> \n";
        mail += "Content-Type: text/html; charset='UTF-8' \n";
        mail += "Content-Transfer-Encoding: base64 \n";
        mail += body;
        return mail;
    }
    authorize(credentials, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const { client_secret, client_id, redirect_uris } = credentials.installed;
            const oAuth2Client = new googleapis_1.google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
            yield fs.readFile(TOKEN_PATH, (err, token) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return yield this.getNewToken(oAuth2Client, callback);
                yield oAuth2Client.setCredentials(JSON.parse(token));
                yield callback(oAuth2Client);
            }));
        });
    }
    getNewToken(oAuth2Client, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let SCOPES = ['https://mail.google.com/'];
            let TOKEN_PATH = `${project_path_1.default.project}/token.json`;
            const authUrl = yield oAuth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: SCOPES,
            });
            console.log('Authorize this app by visiting this url:', authUrl);
            const rl = yield readline_1.default.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            yield rl.question('Enter the code from that page here: ', (code) => __awaiter(this, void 0, void 0, function* () {
                yield rl.close();
                yield oAuth2Client.getToken(code, (err, token) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        return console.error('Error retrieving access token', err);
                    yield oAuth2Client.setCredentials(token);
                    yield fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => __awaiter(this, void 0, void 0, function* () {
                        if (err)
                            return console.error(err);
                        console.log('Token stored to', TOKEN_PATH);
                    }));
                    yield callback(oAuth2Client);
                }));
            }));
        });
    }
    static authorizeGmail() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let gmail = new GmailHelper();
                let credentialFile = fs.readFileSync(`${project_path_1.default.project}/credentials.json`, "utf-8");
                yield gmail.authorize(credentialFile);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.authorizeGmail, err.message);
            }
        });
    }
    static getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let credentialFile = fs.readFileSync(`${project_path_1.default.project}/credentials.json`, "utf-8");
                let tokenFile = fs.readFileSync(`${project_path_1.default.project}/token.json`, "utf-8");
                let client_id = JSON.parse(credentialFile).installed.client_id;
                let client_secret = JSON.parse(credentialFile).installed.client_secret;
                let refresh_token = JSON.parse(tokenFile).refresh_token;
                let url = "https://accounts.google.com/o/oauth2/token";
                let options = new apicore_1.Options(url, apicore_1.Method.POST);
                console.log("options", options);
                options.addHeader("Content-Type", "application/json; charset=utf-8");
                options.addBody("client_id", client_id);
                options.addBody("client_secret", client_secret);
                options.addBody("refresh_token", refresh_token);
                options.addBody("grant_type", "refresh_token");
                return yield apicore_1.APICore.request(options);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getAccessToken, err.message);
            }
        });
    }
    static getLinkActiveByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let getAccessTokenResponse = yield GmailHelper.getAccessToken();
                ;
                let accessToken = JSON.parse(getAccessTokenResponse.body).access_token;
                let getEmailListResponse = yield GmailHelper.getEmailList(accessToken);
                for (let message of JSON.parse(getEmailListResponse.body).messages) {
                    let url = "https://www.googleapis.com/gmail/v1/users/me/messages/" + message.id + "?format=metadata&metadataHeaders=Subject&access_token=" + accessToken;
                    let options = new apicore_1.Options(url, apicore_1.Method.GET);
                    options.addHeader("Content-Type", "application/json; charset=utf-8");
                    let getMessageResponse = yield apicore_1.APICore.request(options);
                    if (JSON.parse(getMessageResponse.body).payload.headers[0].value != undefined) {
                        if (JSON.parse(getMessageResponse.body).payload.headers[0].name == "Subject" && JSON.parse(getMessageResponse.body).payload.headers[0].value == title) {
                            let bodylink = yield JSON.parse(getMessageResponse.body).snippet;
                            console.log("bodylink----", bodylink);
                            let activeLink = bodylink.substring(bodylink.indexOf("http"), bodylink.indexOf(" to"));
                            return activeLink;
                        }
                    }
                }
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getLinkActiveByTitle, err.message);
            }
        });
    }
    static getEmailList(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let url = "https://www.googleapis.com/gmail/v1/users/me/messages?access_token=" + accessToken;
                let options = new apicore_1.Options(url, apicore_1.Method.GET);
                options.addHeader("Content-Type", "application/json; charset=utf-8");
                return yield apicore_1.APICore.request(options);
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getEmailList, err.message);
            }
        });
    }
    getBodyLink(str) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pos = yield str.indexOf(test_run_info_1.default.RAILWAY_URL);
                let newString = yield str.substr(pos, 175);
                return newString.split(`"`)[0];
            }
            catch (err) {
                throw new error_wapper_1.errorwrapper.CustomError(this.getBodyLink, err.message);
            }
        });
    }
}
exports.GmailHelper = GmailHelper;
//# sourceMappingURL=email-api.js.map