"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CoordinateType;
(function (CoordinateType) {
    CoordinateType["LEFT"] = "left";
    CoordinateType["RIGHT"] = "right";
    CoordinateType["TOP"] = "top";
    CoordinateType["BOTTOM"] = "bottom";
})(CoordinateType = exports.CoordinateType || (exports.CoordinateType = {}));
var State;
(function (State) {
    State["ON"] = "On";
    State["OFF"] = "Off";
})(State = exports.State || (exports.State = {}));
var Button;
(function (Button) {
    Button["F1"] = "f1";
    Button["F2"] = "f2";
    Button["F3"] = "f3";
    Button["F4"] = "f4";
    Button["F5"] = "f5";
    Button["F6"] = "f6";
    Button["F7"] = "f7";
    Button["F8"] = "f8";
    Button["F9"] = "f9";
    Button["F10"] = "f10";
    Button["F11"] = "f11";
    Button["F12"] = "f12";
    Button["ENTER"] = "enter";
    Button["ESCAPE"] = "escape";
    Button["CTRL_A"] = "ctrl+a";
    Button["CTRL_C"] = "ctrl+c";
    Button["CTRL_V"] = "ctrl+v";
    Button["BACKSPACE"] = "backspace";
})(Button = exports.Button || (exports.Button = {}));
var PageName;
(function (PageName) {
    PageName["LOGIN"] = "Login";
    PageName["LOGOUT"] = "Log out";
    PageName["REGISTER"] = "Register";
    PageName["CHANGEPASSWORD"] = "Change password";
    PageName["CONTACT"] = "Contact";
    PageName["BOOKTICKET"] = "Book ticket";
})(PageName = exports.PageName || (exports.PageName = {}));
var RegisterItem;
(function (RegisterItem) {
    RegisterItem["EMAIL"] = "email";
    RegisterItem["PASSWORD"] = "password";
    RegisterItem["PID"] = "pid";
    RegisterItem["REGISTER"] = "register";
    RegisterItem["CONFIRMPASSWORD"] = "confirmPassword";
})(RegisterItem = exports.RegisterItem || (exports.RegisterItem = {}));
var ChangePasswordItem;
(function (ChangePasswordItem) {
    ChangePasswordItem["CURRENTPASSWORD"] = "currentPassword";
    ChangePasswordItem["NEWPASSWORD"] = "newPassword";
    ChangePasswordItem["CONFIRMPASSWORD"] = "confirmPassword";
})(ChangePasswordItem = exports.ChangePasswordItem || (exports.ChangePasswordItem = {}));
var Station;
(function (Station) {
    Station[Station["SAIGON"] = 0] = "SAIGON";
    Station[Station["PHANTHIET"] = 1] = "PHANTHIET";
    Station[Station["NHATRANG"] = 2] = "NHATRANG";
    Station[Station["DANANG"] = 3] = "DANANG";
    Station[Station["HUE"] = 4] = "HUE";
    Station[Station["QUANGNGAI"] = 5] = "QUANGNGAI";
})(Station = exports.Station || (exports.Station = {}));
var SeatType;
(function (SeatType) {
    SeatType[SeatType["HARDSEAT"] = 0] = "HARDSEAT";
    SeatType[SeatType["SOFTSEAT"] = 1] = "SOFTSEAT";
    SeatType[SeatType["SOFTSEATWITHAIR"] = 2] = "SOFTSEATWITHAIR";
    SeatType[SeatType["HARDBED"] = 3] = "HARDBED";
    SeatType[SeatType["SOFTBED"] = 4] = "SOFTBED";
    SeatType[SeatType["SOFTBEDWITHAIR"] = 5] = "SOFTBEDWITHAIR";
})(SeatType = exports.SeatType || (exports.SeatType = {}));
//# sourceMappingURL=general.js.map