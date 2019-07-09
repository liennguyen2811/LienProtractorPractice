"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Navigation {
    constructor(value) {
        this.value = value;
    }
    toString() {
        return this.value;
    }
    Navigation(value) {
        this.value = value;
    }
    getvalue() {
        return this.value;
    }
}
Navigation.login = new Navigation("/Account/Login.cshtml");
Navigation.logout = new Navigation("L/Account/Logout");
exports.default = Navigation;
//# sourceMappingURL=navigation.js.map