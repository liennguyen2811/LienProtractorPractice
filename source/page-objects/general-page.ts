import ElementWrapper from "../utilities/protractor-wappers/element-wrapper";
import { by } from "protractor";
import { errorwrapper } from "../utilities/protractor-wappers/error-wapper";

export default class GeneralPage {

    private static _generalPage: GeneralPage;
    constructor(){};

    protected tabLogin = new ElementWrapper(by.xpath("//div[@id= 'menu']//a[@href = '/Account/Login.cshtml']"));
	protected tabLogout = new ElementWrapper(by.xpath("//div[@id= 'menu']//a[@href = '/Account/Logout.cshtml']"));
	protected tabRegister = new ElementWrapper(by.xpath("//div[@id='menu']//a[@href='/Account/Register.cshtml']"));
	protected tabChangePassWord = new ElementWrapper(by.xpath("//div[@id='menu']//a[@href='/Account/ChangePassword.cshtml']"));
	protected tabBookTicket = new ElementWrapper(by.xpath("//a[@href='/Page/BookTicketPage.cshtml']"));
	protected tabTimeTable = new ElementWrapper(by.xpath("//a[@href='TrainTimeListPage.cshtml']"));
	protected tabTicketPrice = new ElementWrapper(by.xpath("//a[@href='/Page/TrainPriceListPage.cshtml']"));
	protected tabMyTicket = new ElementWrapper(by.xpath("//a[@href='/Page/ManageTicket.cshtml']"));
	
	protected lbWelcomeMessage = new ElementWrapper(by.xpath("//div[@class= 'account']/strong"));
	protected lbNonPassWordInput = new ElementWrapper(by.xpath(".//*[@id='content']/p"));
	protected lbThankMessage = new ElementWrapper(by.xpath("//div[@id='content']//h1"));
	protected lbPasswordchangedone = new ElementWrapper(by.xpath("//form[@id='ChangePW']/fieldset/p[@class='message success']"));
	protected lbErrorRegisterMessage = new ElementWrapper(by.xpath("//div[@id='content']/p[@class='message error']"));
	protected lbErrorMessageChangePass = new ElementWrapper(by.xpath("//form[@id='ChangePW']/fieldset/p[@class='message error']"));
	protected lblBookTicketMessage = new ElementWrapper(by.xpath("//div[@id='content']//h1[text()='Ticket booked successfully!']"));
	protected lbTicketPriceHeaderMessage = new ElementWrapper(by.xpath("//table[@class='MyTable MedTable']//tr[@class='TableSmallHeader']/th"));

    public static async getInstance(): Promise<GeneralPage>{
        this._generalPage = new GeneralPage();
        //await this._generalPage.waitForLoading try to find spiner to handle the line
        return this._generalPage;
    }
    /**
     *GetTextMessage
     *@returns{Promise<boolean>}
     *@memberof GeneralPage
     */
    public async getWelcomeMessaged(): Promise<string>
	{  try{
        return await this.lbWelcomeMessage.getText();
	}catch (err){
        throw new errorwrapper.CustomError(this.getWelcomeMessaged,err.message)
    }
    }
    /**
     *Get nonpassword input text
     *@returns{Promise<boolean>}
     *@memberof GeneralPage
     */
    public async getLbNonPassWordInput(): Promise<string>
	{  try{
        return await this.lbNonPassWordInput.getText();
	}catch (err){
        throw new errorwrapper.CustomError(this.getLbNonPassWordInput,err.message)
    }
    }
     /**
     *Get thank message text
     *@returns{Promise<boolean>}
     *@memberof GeneralPage
     */
    public async getLbThankMessage(): Promise<string>
	{  try{
        return await this.lbThankMessage.getText();
	}catch (err){
        throw new errorwrapper.CustomError(this.getLbThankMessage,err.message)
    }
    }
     /**
     *Get password change done text
     *@returns{Promise<boolean>}
     *@memberof GeneralPage
     */
    public async getLbPasswordchangedone(): Promise<string>
	{  try{
        return await this.lbPasswordchangedone.getText();
	}catch (err){
        throw new errorwrapper.CustomError(this.getLbPasswordchangedone,err.message)
    }
    }
     /**
     *Get Error register message text
     *@returns{Promise<boolean>}
     *@memberof GeneralPage
     */
    public async getLbErrorRegisterMessage(): Promise<string>
	{  try{
        return await this.lbErrorRegisterMessage.getText();
	}catch (err){
        throw new errorwrapper.CustomError(this.getLbErrorRegisterMessage,err.message)
    }
    }
     /**
     *Get Error message change password text
     *@returns{Promise<boolean>}
     *@memberof GeneralPage
     */
    public async getLbErrorMessageChangePass(): Promise<string>
	{  try{
        return await this.lbErrorMessageChangePass.getText();
	}catch (err){
        throw new errorwrapper.CustomError(this.getLbErrorMessageChangePass,err.message)
    }
    }
    /**
     *Get book ticket message text
     *@returns{Promise<boolean>}
     *@memberof GeneralPage
     */
    public async getLblBookTicketMessage(): Promise<string>
	{  try{
        return await this.lblBookTicketMessage.getText();
	}catch (err){
        throw new errorwrapper.CustomError(this.getLblBookTicketMessage,err.message)
    }
    }
    /**
     *Get ticket price message text
     *@returns{Promise<boolean>}
     *@memberof GeneralPage
     */
    public async getLbTicketPriceHeaderMessage(): Promise<string>
	{  try{
        return await this.lbTicketPriceHeaderMessage.getText();
	}catch (err){
        throw new errorwrapper.CustomError(this.getLbTicketPriceHeaderMessage,err.message)
    }
    }
    // public async LoginPage gotoLoginPage(): Promise<>
	// {
	// 	this.getTabLogin().click();
	// 	return new LoginPage();
	// }
}