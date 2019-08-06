import { Utility } from "@utilities/general/utility";

let XMLHttpRequest = require("XMLHttpRequest").XMLHttpRequest;


export class APICore {
	/**
	 * Send API request with data/body
	 * @static
	 * @param {Options} options 
	 * @returns {Promise<APIResponse>} API response
	 * @memberof APICore
	 */

	static request(options: Options, json?: string): Promise<APIResponse> {
		let response: Promise<APIResponse> = new Promise(async function (resolve, reject) {
			let http = new XMLHttpRequest();

			//Open request
			http.open(options.method.toString(), options.url + options.getParamString(), true);
			
			//Add headers
			options.headers.forEach((value: any, key: string) => {
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
			// await Utility.delay(1);
		});
	
		return response;
    }


    	/**
	 * Send API request with body JSON
	 * @static
	 * @param {Options} options
	 * @param {string} json
	 * @returns {Promise<APIResponse>}
	 * @memberof APICore
	 */
	static requestJson(options: Options, json: string): Promise<APIResponse> {
		let response: Promise<APIResponse> = new Promise(async function (resolve, reject) {
			let http = new XMLHttpRequest();
			//Open request
			http.open(options.method.toString(), options.url + options.getParamString(), true);

			//Add headers
			options.headers.forEach((value: any, key: string) => {
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
		return response;
	}
}
export enum Method {
	POST = "POST",
	PUT = "PUT",
	GET = "GET",
	DELETE = "DELETE"
}


export class APIResponse {
	status: number;
	body: string;
	header: string;
	options: Options;

	constructor(status: number, body: string, header: string, options: Options) {
		this.status = status;
		this.body = body;
		this.header = header;
		this.options = options;
    }
}
    export class Options {
        url: string;
        method: Method;
        headers: Map<string, any>;
        body: Map<string, any>;
        param: Map<string, any>
    
        constructor(url: string,
            method: Method,
            headers: Map<string, any> = new Map<string, any>(),
            body: Map<string, any> = new Map<string, any>(),
            param: Map<string, any> = new Map<string, any>(),
        ) {
            this.url = url;
            this.method = method;
            this.headers = headers;
            this.body = body;
            this.param = param;
        }
    
        addHeader(key: string, value: any) {
            this.headers.set(key, value);
        }
    
        addBody(key: string, value: any) {
            if (value != "null") {
                this.body.set(key, value);
            }
        }
    
        addParam(key: string, value: any) {
            if (value != "null") {
                this.param.set(key, value);
            }
        }
    
        getParamString(): string {
            let result: string = "?";
            let i = 0;
    
            this.param.forEach((value: any, key: string) => {
                result += `${key}=${value}`;
                i++;
                if (i < this.param.size) {
                    result += "&";
                }
            });
            result += "";
    
            if (result == "?") {
                return ""
            } else {
                return result;
            }
        }
    
        getBodyString(): string {
            let result: string = "{";
            let i = 0;
    
            this.body.forEach((value: any, key: string) => {
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
    