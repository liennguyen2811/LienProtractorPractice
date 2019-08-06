import ProjectPath from '@test-data/general/project-path';
import * as fs from 'fs';
import { google } from 'googleapis';
import readline from 'readline';
import { errorwrapper } from '@utilities/protractor-wappers/error-wapper';
import { APIResponse, APICore, Method, Options } from './apicore';
import TestRunInfo from '@data-objects/general/test-run-info';
import { Base64 } from 'js-base64';


const SCOPES = ['https://mail.google.com/'];
const TOKEN_PATH = `${ProjectPath.project}/token.json`;

export class GmailHelper{
     /**
     * Create email template
     * @param {string} from
     * @param {string} to
     * @param {string} subject
     * @param {string} body
     * @returns {string}
     * @memberof GmailHelper
     */
	private email(from: string, to: string, subject: string, body: string): string {
		let mail = '';
		mail += `From: ${from} \n`
		mail += `To: ${to} \n`
		mail += `Subject: ${subject} \n`
		mail += "Date: Fri, 21 Nov 1997 09:55:06 -0600 \n"
		mail += "Message-ID: <1234@local.machine.example> \n"
		mail += "Content-Type: text/html; charset='UTF-8' \n"
		mail += "Content-Transfer-Encoding: base64 \n"
		mail += body
		return mail;
    }
    
     /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
	private async authorize(credentials: any, callback?: any): Promise<any> {
		const { client_secret, client_id, redirect_uris } = credentials.installed;
		const oAuth2Client = new google.auth.OAuth2(
			client_id, client_secret, redirect_uris[0]);

		// Check if we have previously stored a token.
		await fs.readFile(TOKEN_PATH, async (err: any, token: any) => {
			if (err) return await this.getNewToken(oAuth2Client, callback);
			await oAuth2Client.setCredentials(JSON.parse(token));
			await callback(oAuth2Client);
		});
    }
    
     /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
	private async getNewToken(oAuth2Client: any, callback: any): Promise<void> {
		let SCOPES = ['https://mail.google.com/'];
		let TOKEN_PATH = `${ProjectPath.project}/token.json`;

		const authUrl = await oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: SCOPES,
		});
		console.log('Authorize this app by visiting this url:', authUrl);
		const rl = await readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});
		await rl.question('Enter the code from that page here: ', async (code: any) => {
			await rl.close();
			await oAuth2Client.getToken(code, async (err: any, token: any) => {
				if (err) return console.error('Error retrieving access token', err);
				await oAuth2Client.setCredentials(token);
				// Store the token to disk for later program executions
				await fs.writeFile(TOKEN_PATH, JSON.stringify(token), async (err: any) => {
					if (err) return console.error(err);
					console.log('Token stored to', TOKEN_PATH);
				});
				await callback(oAuth2Client);
			});
		});
    }
    
	/**
	 * Authorize Gmail
	 *
	 * @static
	 * @returns {Promise<void>}
	 * @memberof Gmail
	 */
	public static async authorizeGmail(): Promise<void> {
		try {
			let gmail = new GmailHelper();
			let credentialFile: string = fs.readFileSync(`${ProjectPath.project}/credentials.json`, "utf-8");
			await gmail.authorize(credentialFile);
		} catch (err) {
			throw new errorwrapper.CustomError(this.authorizeGmail, err.message);
		}
    }
    
    /**
	 * Get Access token
	 *
	 * @static
	 * @returns {Promise<APIResponse>}
	 * @memberof Gmail
	 */
	public static async getAccessToken(): Promise<APIResponse> {
		try {
			let credentialFile: string = fs.readFileSync(`${ProjectPath.project}/credentials.json`, "utf-8");
			let tokenFile: string = fs.readFileSync(`${ProjectPath.project}/token.json`, "utf-8");
			let client_id: string = JSON.parse(credentialFile).installed.client_id;
			let client_secret: string = JSON.parse(credentialFile).installed.client_secret;
			let refresh_token: string = JSON.parse(tokenFile).refresh_token;


			let url = "https://accounts.google.com/o/oauth2/token";
			let options = new Options(url, Method.POST);
			console.log("options", options)
			options.addHeader("Content-Type", "application/json; charset=utf-8");
			options.addBody("client_id", client_id);
			options.addBody("client_secret", client_secret);
			options.addBody("refresh_token", refresh_token);
			options.addBody("grant_type", "refresh_token");

			return await APICore.request(options);
		} catch (err) {
			throw new errorwrapper.CustomError(this.getAccessToken, err.message);
		}
    }
    	/**
	 * Get active link by title email
	 *
	 * @param {string} title
	 * @returns
	 * @memberof Gmail
	 */
	public static async getLinkActiveByTitle(title: string) {
		try {
			let getAccessTokenResponse: APIResponse = await GmailHelper.getAccessToken();;
			let accessToken: string = JSON.parse(getAccessTokenResponse.body).access_token;
			let getEmailListResponse: APIResponse = await GmailHelper.getEmailList(accessToken);
			for (let message of JSON.parse(getEmailListResponse.body).messages) {

				let url = "https://www.googleapis.com/gmail/v1/users/me/messages/" + message.id + "?format=metadata&metadataHeaders=Subject&access_token=" + accessToken;
				let options = new Options(url, Method.GET);
				options.addHeader("Content-Type", "application/json; charset=utf-8");
				let getMessageResponse: APIResponse = await APICore.request(options);
				if (JSON.parse(getMessageResponse.body).payload.headers[0].value != undefined) {

					if (JSON.parse(getMessageResponse.body).payload.headers[0].name == "Subject" && JSON.parse(getMessageResponse.body).payload.headers[0].value == title) {
						let bodylink: string = await JSON.parse(getMessageResponse.body).snippet;	
						console.log("bodylink----", bodylink)		
						let activeLink = bodylink.substring(bodylink.indexOf("http"), bodylink.indexOf(" to"));
						// let link = (String)(bodylink).match(/(http?:\/\/[^\s]+)/g || /(https?:\/\/[^\s]+)/g)
						return activeLink;
					}
				}
			}
		} catch (err) {
			throw new errorwrapper.CustomError(this.getLinkActiveByTitle, err.message);
		}
    }
    
    /**
	 * Get email list
	 *
	 * @static
	 * @param {string} accessToken
	 * @returns {Promise<APIResponse>}
	 * @memberof Gmail
	 */
	public static async getEmailList(accessToken: string): Promise<APIResponse> {
		try {
			let url = "https://www.googleapis.com/gmail/v1/users/me/messages?access_token=" + accessToken;
			let options = new Options(url, Method.GET);
			options.addHeader("Content-Type", "application/json; charset=utf-8");
			return await APICore.request(options);
		} catch (err) {
			throw new errorwrapper.CustomError(this.getEmailList, err.message);
		}
    }
    
/**
	 * Get link in body content
	 * @param {any} str body content
	 * @returns url link
	 * @memberof Gmail
	 */
	public async getBodyLink(str): Promise<string> {
		try {
			let pos: string = await str.indexOf(TestRunInfo.RAILWAY_URL);
			let newString: string = await str.substr(pos, 175);
			return newString.split(`"`)[0];
		} catch (err) {
			throw new errorwrapper.CustomError(this.getBodyLink, err.message);
		}
	}
    
}