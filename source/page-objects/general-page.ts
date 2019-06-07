import ElementWrapper from "../utilities/protractor-wappers/element-wrapper";
import { by } from "protractor";
import { errorwrapper } from "../utilities/protractor-wappers/error-wapper";
import LoginPage from "./login-page";
import { Logger, FunctionType } from "../utilities/general/logger";
import RegisterPage from "./register-page";
import ChangePassWordPage from "./change-password-page";
import TimeTablePage from "./time-table-page";
import BookTicketPage from "./book-ticket-page";
import TicketPricePage from "./ticket-price-page";
import MyTicketPage from "./myticket-page";
import BrowserWrapper from "../utilities/protractor-wappers/browser-wrapper";
import { By } from "selenium-webdriver";

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

    // Dynamic control
    protected cellTable(tablename: string,rowindex: number,columnname: string ): ElementWrapper {
		return new ElementWrapper(by.xpath(`"//table[@class='${tablename}']//tr['${rowindex}']/td[count(//th[.= '${columnname}']//preceding-sibling::th) + 1]`));
    }
    protected cellTableCheckPrice(tablename: string,rowindex: number,columnname: string ): ElementWrapper {
		return new ElementWrapper(by.xpath(`"//table[@class='${tablename}']//tr[{1}]/td[count(//th[.='${rowindex}']//preceding-sibling::th) + '${columnname}']`));
    }
    protected rowNumber(table: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//table[@class='${table}']//tr`));
    }
    protected collunmNumber(table: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//table[@class='${table}']//td`));
    }
    protected checkPrice(train: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//table[@class='NoBorder']//td[.='${train}']/following-sibling::td[.='Check Price']`));
    }
    protected bookTicket(seattype: string): ElementWrapper {
		return new ElementWrapper(by.xpath(`//table[@class='NoBorder']//td[.='${seattype}']/following-sibling::td[.='Book ticket']`));
	}
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
    /**
     * Go to LoginPage
     * @returns {Promise<LoginPage>}
     * @memberof GeneralPage
     */
    public async gotoLoginPage(): Promise<LoginPage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to Login Page`)
        this.tabLogin.click();
        return await LoginPage.getLoginPageInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.gotoLoginPage, err.message)
    }     
    }
    /**
     * Go to Register Page
     * @returns {Promise<RegisterPage>}
     * @memberof GeneralPage
     */
    public async gotoRegisterPage(): Promise<RegisterPage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to Register Page`)
        this.tabLogin.click();
        return await RegisterPage.getRegisterPageInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.gotoRegisterPage, err.message)
    }     
    }
     /**
     * Go to Change password Page
     * @returns {Promise<ChangePassWordPage>}
     * @memberof GeneralPage
     */
    public async gotoChangePassword(): Promise<ChangePassWordPage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to Change Password Page`)
        this.tabLogin.click();
        return await ChangePassWordPage.getChangePassWordInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.gotoChangePassword, err.message)
    }     
    }
    /**
     * Go to Time table Page
     * @returns {Promise<TimeTablePage>}
     * @memberof GeneralPage
     */
    public async gotoTabTimeTable(): Promise<TimeTablePage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to Time table page`)
        this.tabLogin.click();
        return await TimeTablePage.getTimeTablePageInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.gotoTabTimeTable, err.message)
    }     
    }
    /**
     * Go to book ticket Page
     * @returns {Promise<BookTicketPage>}
     * @memberof GeneralPage
     */
    public async gotoBookTicket(): Promise<BookTicketPage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to book ticket page`)
        this.tabLogin.click();
        return await BookTicketPage.getBookTickeInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.gotoBookTicket, err.message)
    }     
    }
    /**
     * Go to ticket price Page
     * @returns {Promise<TicketPricePage>}
     * @memberof GeneralPage
     */
    public async gotoTicketPricePage(): Promise<TicketPricePage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to ticket price page`)
        this.tabLogin.click();
        return await TicketPricePage.getTicketPricePageInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.gotoTicketPricePage, err.message)
    }     
    }
     /**
     * Go to my ticket Page
     * @returns {Promise<MyTicketPage>}
     * @memberof GeneralPage
     */
    public async gotoMyTicketPage(): Promise<MyTicketPage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to ticket page`)
        this.tabLogin.click();
        return await MyTicketPage.getMyTicketPageInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.gotoMyTicketPage, err.message)
    }     
    }
    public async getTableCellValue(tablename: string, rowindex : number, columnname: string)
    {
      try{
        return this.cellTable(tablename, rowindex, columnname).getText();
      } catch (err){
          throw new errorwrapper.CustomError(this.getTableCellValue,message)
      }                
    }
    public async getTableCellValueCheckPrice(tablename: string, rowindex : number, columnname: string)
    {
      try{
        return this.cellTableCheckPrice(tablename, rowindex, columnname).getText();
      } catch (err){
          throw new errorwrapper.CustomError(this.getTableCellValueCheckPrice,message)
      }                
    }
    public async getRowNumber(table: string)
    {
      try{
        const StringFormat = (str: string, ...args: string[]) =>
        str.replace(/{(\d+)}/g, (match, index) => args[index] || '')
        let xpath: string = StringFormat("//table[@class='{0}']//tr", table);
        return BrowserWrapper.getDriverInstance().FindElements(By.xpath(xpath)).count();

      } catch (err){
          throw new errorwrapper.CustomError(this.getRowNumber,message)
      }                
    }
    public async getcollunmNumber(table: string)
    {
      try{
        return this.rowNumber(table).getSize()
      } catch (err){
          throw new errorwrapper.CustomError(this.getcollunmNumber,message)
      }                
    }
    public async bookTicketFromTicketPrice(departstation: string,arrivestation: string,seattype: string): Promise<BookTicketPage>
     {
         try{
         let train : string = departstation + " to " + arrivestation;
         await this.checkPrice(train).click();
         await this.bookTicket(seattype).click();
         return await BookTicketPage.getBookTickeInstance()
         } catch(err){
             throw new errorwrapper.CustomError(this.bookTicketFromTicketPrice, err.message)
         }
     }
}