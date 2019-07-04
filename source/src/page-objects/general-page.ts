import ElementWrapper from "@utilities/protractor-wappers/element-wrapper";
import { by, element } from "protractor";
import { errorwrapper } from "@utilities/protractor-wappers/error-wapper";
import LoginPage from "@page-objects/login-page";
import { Logger, FunctionType } from "@utilities/general/logger";
import RegisterPage from "@page-objects/register-page";
import ChangePassWordPage from "@page-objects/change-password-page";
import TimeTablePage from "@page-objects/time-table-page";
import BookTicketPage from "@page-objects/book-ticket-page";
import TicketPricePage from "@page-objects/ticket-price-page";
import MyTicketPage from "@page-objects/myticket-page";
import BrowserWrapper from "@utilities/protractor-wappers/browser-wrapper";
import { By } from "selenium-webdriver";
import HomePage from "@page-objects/home-page";

export default class GeneralPage {

    private static _generalPage: GeneralPage ;
    //constructor(){};

    //protected tabLogin = new ElementWrapper(by.xpath("//div[@id= 'menu']//a[@href = '/Account/Login.cshtml']"));
    protected tabLogin = new ElementWrapper(by.xpath("//div[@id= 'menu']//a[@href = '/Account/Login.cshtml']"));
	protected tabLogout = new ElementWrapper(by.xpath("//div[@id= 'menu']//a[@href='/Account/Logout']"));
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
    // public static getGeneralPageInstance(): GeneralPage{
    //     this._generalPage = new GeneralPage();
    //     //await this._generalPage.waitForLoading try to find spiner to handle the line
    //     return this._generalPage;
    // }
    /**
     *GetTextMessage
     *@returns{Promise<boolean>}
     *@memberof GeneralPage
     */
    public async getWelcomeMessage(): Promise<string>
	{  try{
        return <string> await this.lbWelcomeMessage.getText();
	}catch (err){
        throw new errorwrapper.CustomError(this.getWelcomeMessage,err.message)
    }
    }
    /**
     *Get nonpassword input text
     *@returns{Promise<boolean>}
     *@memberof GeneralPage
     */
    public async getNonpasswordmessage(): Promise<string>
	{  try{
        return await this.lbNonPassWordInput.getText();
	}catch (err){
        throw new errorwrapper.CustomError(this.getNonpasswordmessage,err.message)
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
    public async logout(): Promise<LoginPage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to log out`)
        await this.tabLogout.click();
        let homePage  = require(`../page-objects/home-page`).default;
        return  await homePage.getHomePageInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.goToLoginPage, err.message)
    }     
    }
    /**
     * Go to LoginPage
     * @returns {Promise<LoginPage>}
     * @memberof GeneralPage
     */
    public async goToLoginPage(): Promise<LoginPage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to Login Page`)
        await this.tabLogin.click();
        let loginPage  = require(`../page-objects/login-page`).default;
        return  await loginPage.getLoginPageInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.goToLoginPage, err.message)
    }     
    }
    /**
     * Go to Register Page
     * @returns {Promise<RegisterPage>}
     * @memberof GeneralPage
     */
    public async goToRegisterPage(): Promise<RegisterPage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to Register Page`)
        await this.tabLogin.click();
        let registerPage = require(`../page-objects/register-page`).default;
        return await registerPage.getRegisterPageInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.goToRegisterPage, err.message)
    }     
    }
     /**
     * Go to Change password Page
     * @returns {Promise<ChangePassWordPage>}
     * @memberof GeneralPage
     */
    public async goToChangePassword(): Promise<ChangePassWordPage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to Change Password Page`)
        await this.tabLogin.click();
        let changePasswordPage = require(`../page-objects/change-password-page`).default;
        return await changePasswordPage.getChangePassWordInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.goToChangePassword, err.message)
    }     
    }
    /**
     * Go to Time table Page
     * @returns {Promise<TimeTablePage>}
     * @memberof GeneralPage
     */
    public async goToTabTimeTable(): Promise<TimeTablePage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to Time table page`)
        await this.tabLogin.click();
        let timeTablePage = require(`../page-objects/time-table-page`).default;
        return await timeTablePage.getTimeTablePageInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.goToTabTimeTable, err.message)
    }     
    }
    /**
     * Go to book ticket Page
     * @returns {Promise<BookTicketPage>}
     * @memberof GeneralPage
     */
    public async goToBookTicket(): Promise<BookTicketPage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to book ticket page`)
        await this.tabLogin.click();
        let bookTicketPage = require(`../page-objects/book-ticket-page`).default;
        return await bookTicketPage.getBookTickeInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.goToBookTicket, err.message)
    }     
    }
    /**
     * Go to ticket price Page
     * @returns {Promise<TicketPricePage>}
     * @memberof GeneralPage
     */
    public async goToTicketPricePage(): Promise<TicketPricePage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to ticket price page`)
        await this.tabLogin.click();
        let ticketPricePage = require(`../page-objects/ticket-price-page`).default;
        return await ticketPricePage.getTicketPricePageInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.goToTicketPricePage, err.message)
    }     
    }
     /**
     * Go to my ticket Page
     * @returns {Promise<MyTicketPage>}
     * @memberof GeneralPage
     */
    public async goToMyTicketPage(): Promise<MyTicketPage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to ticket page`)
        await this.tabLogin.click();
        let myTicketPage = require(`../page-objects/my-ticket-page`).default;
        return await myTicketPage.getMyTicketPageInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.goToMyTicketPage, err.message)
    }     
    }
     /**
     * Go to ticket page unlogger user Page
     * @returns {Promise<MyTicketPage>}
     * @memberof GeneralPage
     */
    public async goToBookTicketUnloggedUser(): Promise<LoginPage>
	{ try{
        await Logger.write(FunctionType.UI, `Going to book ticket page unlogger user`)
        await this.tabBookTicket.click();
        let loginPage = require(`../page-objects/login-page`).default;
        return await loginPage.getLoginPageInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.goToBookTicketUnloggedUser, err.message)
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
         let bookTicketPage = require(`../page-objects/book-ticket-page`).default;
         return await bookTicketPage.getBookTickeInstance()
         } catch(err){
             throw new errorwrapper.CustomError(this.bookTicketFromTicketPrice, err.message)
         }
     }

}