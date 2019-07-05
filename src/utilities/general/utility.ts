import { errorwrapper } from "@utilities/protractor-wappers/error-wapper";
import TestRunInfo, { Station, SeatType } from "@data-objects/general/test-run-info";
import uuidv4 from 'uuid/v4';
import { JsonConvert, ValueCheckingMode } from "json2typescript";
import * as filePath from "path"


export class Utility{
    /**
	 * Insert value
	 * @param {any} str string to be inserted
	 * @param {any} index location
	 * @param {any} value value to insert
	 * @returns new string
	 * @memberof Gmail
	 */
	public static insert(str: string, index: number, value: any): string {
		try {
			return str.substr(0, index) + value + str.substr(index);
		} catch (err) {
			throw new errorwrapper.CustomError(this.insert, err.message);
		}
	}

    
    /**
	 * Generate a string that contains random numbers
	 * @static
	 * @param {number} length length of the generated number
	 * @param {number} [min=-1] min value of the generated number. Ignore this param by entering -1
	 * @param {number} [max=-1] max value of the generated number. Ignore this param by entering -1
	 * @returns {number} a random number
	 * @memberof Utility
	 */
	public static getRandomNumber(length: number, min: number = -1, max: number = -1): number {
		try {
			let randomNumber: number;
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
		} catch (err) {
			throw new errorwrapper.CustomError(this.getRandomNumber, err.message);
		}
	}
/**
	 * get random Gmail by index
	 * @returns random gmail
	 * @memberof Gmail
	 */
	public static getRandomGmailByIndex(): string {
		try {
			let today: number = (new Date().getTime());
			let index = Math.floor(Math.abs(today - 1525340325732));

			let email = "testautomationrailway";
			let hexIndex = index.toString(2);
			let hexIndexArray = hexIndex.split("");
			for (let i = 0; i < hexIndexArray.length; i++) {
				if (hexIndexArray[i] == "1") {
					email = this.insert(email, email.length - hexIndexArray.length + i, ".")

				}
			}

			if (email.startsWith(".") == true) {
				return email.substring(1, email.length) + "@gmail.com";
			}
			return email + "@gmail.com";
		} catch (err) {
			throw new errorwrapper.CustomError(this.getRandomGmailByIndex, err.message);
		}
    }
    /**
	 * Generate a string that contains random numbers and alphabet characters
	 * @static
	 * @param {number} length length of the string, must be longer than prefix
	 * @param {string} [prefix=""] text which will be put in front of the random string
	 * @returns {string} a random string with fixed length including prefix
	 * @memberof Utility
	 */
	public static createRandomString(length: number, prefix: string = ""): string {
		try {
			if (length < 1 || isNaN(length)) {
				throw 'Invalid input. Should be a number greater than 0';
			}
			let uuid = uuidv4().replace(/-/g, '');
			let uuidLength = uuid.length;
			let prefixLength = prefix.length;

			if (length > uuidLength) {
				let repetition = Math.ceil(length / uuidLength);
				uuid = uuid.repeat(repetition);
			}

			let randomString: string = prefix + uuid.substring(0, length - prefixLength);
			return randomString;
		} catch (err) {
			throw new errorwrapper.CustomError(this.createRandomString, err.message);
		}
	}
	/**
	 * Add a mount of time to a current date
	 * @static
	 * @param {number} day number of added day
	 * @param {number} month number of added day
	 * @param {number} year number of added day
	 * @param {string} dayFormat day type ("numeric", "2-digit")
	 * @param {string} monthFormat month type ("numeric", "2-digit", "narrow", "short", "long")
	 * @param {string} yearFormat year type ("numeric", "2-digit")
	 * @returns
	 * @memberof Utility
	 */
	public static addDateToCurrentDate(day: number = 0, month: number = 0, year: number = 0, dayFormat: string = "", monthFormat: string = "", yearFormat: string = ""): any {
		try {
			let tmpdate: Date = new Date(Date.now());
			var date: Date = new Date(Date.now());
			if (day != null) {
				date= new Date(tmpdate.setDate(tmpdate.getDate() + day));
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

		} catch (err) {
			throw new errorwrapper.CustomError(this.addDateToCurrentDate, err.message);
		}

	}
	public static GenerateStation(): string
	{
			let list= [];
			list.push(this.TranslateStation(Station.DANANG));
			list.push(this.TranslateStation(Station.PHANTHIET));
			list.push(this.TranslateStation(Station.NHATRANG));
			list.push(this.TranslateStation(Station.DANANG));
			list.push(this.TranslateStation(Station.HUE));
			list.push(this.TranslateStation(Station.QUANGNGAI));
			var randomStation = list[Math.floor(Math.random() * list.length)];
			return randomStation;
	}
	public static GenerateSeatType(): string
	{
			let list= [];
			list.push(this.TranslateSeatType(SeatType.HARDBED));
			list.push(this.TranslateSeatType(SeatType.SOFTSEAT));
			list.push(this.TranslateSeatType(SeatType.SOFTSEATWITHAIR));
			list.push(this.TranslateSeatType(SeatType.HARDBED));
			list.push(this.TranslateSeatType(SeatType.SOFTBED));
			list.push(this.TranslateSeatType(SeatType.SOFTBEDWITHAIR));
			var randomStation = list[Math.floor(Math.random() * list.length)];
			return randomStation;

	}
	public static TranslateStation(station: Station): string
	{
			let result: string = "";
			if (station == Station.SAIGON)
			{
					result = "Sài Gòn";
			}
			else if (station == Station.PHANTHIET)
			{
					result = "Phan Thiết";
			}
			else if (station == Station.NHATRANG)
			{
					result = "Nha Trang";
			}
			else if (station == Station.DANANG)
			{
					result = "Đà Nẵng";
			}
			else if (station == Station.HUE)
			{
					result = "Huế";
			}
			else if (station == Station.QUANGNGAI)
			{
					result = "Quãng Ngãi";
			}
			return result;
	}
	public static TranslateSeatType(seattype: SeatType): string
	{
			let result: string = "";
			if (seattype == SeatType.HARDBED)
			{
					result = "Hard bed";
			}
			else if (seattype == SeatType.SOFTSEAT)
			{
					result = "Soft seat";
			}
			else if (seattype == SeatType.SOFTSEATWITHAIR)
			{
					result = "Soft seat with air conditioner";
			}
			else if (seattype == SeatType.SOFTBED)
			{
					result = "Soft bed";
			}
			else if (seattype == SeatType.SOFTBEDWITHAIR)
			{
					result = "Soft bed with air conditioner";
			}

			return result;
	}

	/**
	 * Get the current file directory
	 * @static
	 * @param {string} filename
	 * @memberof Utility
	 */
	public static getPath(filename?: string): string {
		try{
			let slitString: number = "built\\utilities\\general".length;
			let projectPath: string = __dirname.slice(0,__dirname.length-slitString);

			if (filename == null){
				return projectPath;
			}else {
				return filePath.join(projectPath, filename);
			}
		}catch(err){
			throw new errorwrapper.CustomError(this.getPath, err.message)
		}
	}

}
export class JsonUtility{

	/**
	 * @static
	 * @param {*}json
	 * @param {new()=>} classReference
	 * @return{*}
	 * @memberof JsonUtility
	 */
	public static deserialize(json: any, classReference: new()=>any){
		try{
			let jsonConvert = new JsonConvert();
			jsonConvert.ignorePrimitiveChecks = false;
			jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
			try{
				return jsonConvert.deserialize(json,classReference);
			} catch(e){
				console.log((<Error>e));
			}
		}catch(err){
			throw new errorwrapper.CustomError(this.deserialize, err.message);
		}
	}
}
