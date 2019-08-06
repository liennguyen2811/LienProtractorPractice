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
    PageName["TIMETABLE"] = "Timetable";
    PageName["MYTICKET"] = "My ticket";
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
    Station["SAIGON"] = "S\u00E0i G\u00F2n";
    Station["PHANTHIET"] = "Phan Thi\u1EBFt";
    Station["NHATRANG"] = "Nha Trang";
    Station["DANANG"] = "\u0110\u00E0 N\u1EB5ng";
    Station["HUE"] = "Hu\u1EBF";
    Station["QUANGNGAI"] = "Qu\u00E3ng Ng\u00E3i";
})(Station = exports.Station || (exports.Station = {}));
var SeatType;
(function (SeatType) {
    SeatType["HARDSEAT"] = "Hard seat";
    SeatType["SOFTSEAT"] = "Soft seat";
    SeatType["SOFTSEATWITHAIR"] = "Soft seat with air conditioner";
    SeatType["HARDBED"] = "Hard bed";
    SeatType["SOFTBED"] = "Soft bed";
    SeatType["SOFTBEDWITHAIR"] = "Soft bed with air conditioner";
})(SeatType = exports.SeatType || (exports.SeatType = {}));
//# sourceMappingURL=general.js.map