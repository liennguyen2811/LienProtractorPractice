"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("../../utilities/general/utility");
const error_wapper_1 = require("../../utilities/protractor-wappers/error-wapper");
class Account {
    constructor() {
        this.email = "";
        this.password = "";
        this.confirmpassword = "";
        this.regPID = "";
    }
    initAccount() {
        try {
            this.email = utility_1.Utility.getRandomGmailByIndex();
            this.password = utility_1.Utility.createRandomString(6);
            this.confirmpassword = this.password;
            this.regPID = utility_1.Utility.createRandomString(6);
            return this;
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.initAccount, err.message);
        }
    }
}
exports.Account = Account;
//# sourceMappingURL=account.js.map