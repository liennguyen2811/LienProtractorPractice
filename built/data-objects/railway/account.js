"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("@utilities/general/utility");
const error_wapper_1 = require("@utilities/protractor-wappers/error-wapper");
class Account {
    constructor() {
        this.email = "";
        this.password = "";
        this.confirmpassword = "";
        this.regPID = "";
    }
    get Email() {
        return this.email;
    }
    set Email(email) {
        this.email = email;
    }
    get Password() {
        return this.email;
    }
    set Password(password) {
        this.email = password;
    }
    get ConfirmPassword() {
        return this.confirmpassword;
    }
    set ConfirmPassword(confirmpassword) {
        this.confirmpassword = confirmpassword;
    }
    get RegPID() {
        return this.regPID;
    }
    set RegPID(regPID) {
        this.regPID = regPID;
    }
    initAccount() {
        try {
            this.email = utility_1.Utility.getRandomGmail();
            this.password = utility_1.Utility.createRandomString(6);
            this.confirmpassword = this.password;
            this.regPID = utility_1.Utility.createRandomString(8);
            return this;
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.initAccount, err.message);
        }
    }
}
exports.Account = Account;
//# sourceMappingURL=account.js.map