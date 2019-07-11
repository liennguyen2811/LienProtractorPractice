"use strict";
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
const error_wapper_1 = require("@utilities/protractor-wappers/error-wapper");
const v4_1 = __importDefault(require("uuid/v4"));
const json2typescript_1 = require("json2typescript");
const filePath = __importStar(require("path"));
const general_1 = require("@data-objects/general/general");
class Utility {
    static insert(str, index, value) {
        try {
            return str.substr(0, index) + value + str.substr(index);
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.insert, err.message);
        }
    }
    static getRandomNumber(length, min = -1, max = -1) {
        try {
            let randomNumber;
            if (min == -1 && max == -1) {
                let firstNumber = Math.floor((Math.random() * 9) + 1);
                let result = "";
                for (let i = 1; i < length; i++) {
                    result += Math.floor(Math.random() * 10).toString();
                }
                randomNumber = parseInt(firstNumber + result);
            }
            else {
                randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
            }
            return randomNumber;
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.getRandomNumber, err.message);
        }
    }
    static getRandomGmail() {
        try {
            let email = this.createRandomString(15, "railway");
            return email + "@gmail.com";
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.getRandomGmail, err.message);
        }
    }
    static createRandomString(length, prefix = "") {
        try {
            if (length < 1 || isNaN(length)) {
                throw 'Invalid input. Should be a number greater than 0';
            }
            let uuid = v4_1.default().replace(/-/g, '');
            let uuidLength = uuid.length;
            let prefixLength = prefix.length;
            if (length > uuidLength) {
                let repetition = Math.ceil(length / uuidLength);
                uuid = uuid.repeat(repetition);
            }
            let randomString = prefix + uuid.substring(0, length - prefixLength);
            return randomString;
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.createRandomString, err.message);
        }
    }
    static addDateToCurrentDate(day = 0, month = 0, year = 0, dayFormat = "", monthFormat = "", yearFormat = "") {
        try {
            let tmpdate = new Date(Date.now());
            var date = new Date(Date.now());
            if (day != null) {
                date = new Date(tmpdate.setDate(tmpdate.getDate() + day));
            }
            if (month != null) {
                date = new Date(tmpdate.setMonth(tmpdate.getMonth() + month));
            }
            if (year != null) {
                date = new Date(tmpdate.setFullYear(tmpdate.getFullYear() + year));
            }
            if (dayFormat == "") {
                dayFormat = "numeric";
            }
            if (monthFormat == "") {
                monthFormat = "2-digit";
            }
            if (yearFormat == "") {
                yearFormat = "numeric";
            }
            var options = { year: `${yearFormat}`, month: `${monthFormat}`, day: `${dayFormat}` };
            return date.toLocaleString('en-US', options);
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.addDateToCurrentDate, err.message);
        }
    }
    static GenerateStation() {
        let list = [];
        list.push(this.TranslateStation(general_1.Station.DANANG));
        list.push(this.TranslateStation(general_1.Station.PHANTHIET));
        list.push(this.TranslateStation(general_1.Station.NHATRANG));
        list.push(this.TranslateStation(general_1.Station.DANANG));
        list.push(this.TranslateStation(general_1.Station.HUE));
        list.push(this.TranslateStation(general_1.Station.QUANGNGAI));
        var randomStation = list[Math.floor(Math.random() * list.length)];
        return randomStation;
    }
    static GenerateSeatType() {
        let list = [];
        list.push(this.TranslateSeatType(general_1.SeatType.HARDBED));
        list.push(this.TranslateSeatType(general_1.SeatType.SOFTSEAT));
        list.push(this.TranslateSeatType(general_1.SeatType.SOFTSEATWITHAIR));
        list.push(this.TranslateSeatType(general_1.SeatType.HARDBED));
        list.push(this.TranslateSeatType(general_1.SeatType.SOFTBED));
        list.push(this.TranslateSeatType(general_1.SeatType.SOFTBEDWITHAIR));
        var randomStation = list[Math.floor(Math.random() * list.length)];
        return randomStation;
    }
    static TranslateStation(station) {
        let result = "";
        if (station == general_1.Station.SAIGON) {
            result = "Sài Gòn";
        }
        else if (station == general_1.Station.PHANTHIET) {
            result = "Phan Thiết";
        }
        else if (station == general_1.Station.NHATRANG) {
            result = "Nha Trang";
        }
        else if (station == general_1.Station.DANANG) {
            result = "Đà Nẵng";
        }
        else if (station == general_1.Station.HUE) {
            result = "Huế";
        }
        else if (station == general_1.Station.QUANGNGAI) {
            result = "Quãng Ngãi";
        }
        return result;
    }
    static TranslateSeatType(seattype) {
        let result = "";
        if (seattype == general_1.SeatType.HARDBED) {
            result = "Hard bed";
        }
        else if (seattype == general_1.SeatType.SOFTSEAT) {
            result = "Soft seat";
        }
        else if (seattype == general_1.SeatType.SOFTSEATWITHAIR) {
            result = "Soft seat with air conditioner";
        }
        else if (seattype == general_1.SeatType.SOFTBED) {
            result = "Soft bed";
        }
        else if (seattype == general_1.SeatType.SOFTBEDWITHAIR) {
            result = "Soft bed with air conditioner";
        }
        return result;
    }
    static getPath(filename) {
        try {
            let slitString = "built\\utilities\\general".length;
            let projectPath = __dirname.slice(0, __dirname.length - slitString);
            if (filename == null) {
                return projectPath;
            }
            else {
                return filePath.join(projectPath, filename);
            }
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.getPath, err.message);
        }
    }
}
exports.Utility = Utility;
class JsonUtility {
    static deserialize(json, classReference) {
        try {
            let jsonConvert = new json2typescript_1.JsonConvert();
            jsonConvert.ignorePrimitiveChecks = false;
            jsonConvert.valueCheckingMode = json2typescript_1.ValueCheckingMode.DISALLOW_NULL;
            try {
                return jsonConvert.deserialize(json, classReference);
            }
            catch (e) {
                console.log(e);
            }
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.deserialize, err.message);
        }
    }
}
exports.JsonUtility = JsonUtility;
//# sourceMappingURL=utility.js.map