import { GmailHelper } from "@apis/email-api";
import { PageName } from "@data-objects/general/general";
import BookTicketPage from "@page-objects/book-ticket-page";
import { FunctionType, Logger } from "@utilities/general/logger";
import BrowserWrapper from "@utilities/protractor-wappers/browser-wrapper";
import Element from "@utilities/protractor-wappers/control-common-imp/element";
import Lable from "@utilities/protractor-wappers/control-common-imp/lable";
import Link from "@utilities/protractor-wappers/control-common-imp/link";
import { errorwrapper } from "@utilities/protractor-wappers/error-wapper";
import { by } from "protractor";
import LoginPage from "./login-page";
import RegisterPage from "./register-page";


export default class GeneralPage {

    private static _generalPage: GeneralPage;
    navigationItem1: Link = new Link(by.xpath("//div[@id= 'menu']//a[@href = '/Account/Login.cshtml']"));
    thankMessage: Lable = new Lable(by.xpath("//div[@id='content']//h1"));
    passwordChangeDone: Lable = new Lable(by.xpath("//form[@id='ChangePW']/fieldset/p[@class='message success']"));
    errorMsgChangePass: Lable = new Lable(by.xpath("//form[@id='ChangePW']/fieldset/p[@class='message error']"));
    bookTicketMessage: Lable = new Lable(by.xpath("//div[@id='content']//h1[text()='Ticket booked successfully!']"));
    welcomeMessage: Lable = new Lable(by.xpath("//div[@class= 'account']/strong"));
    errorNoneMessage: Lable = new Lable(by.xpath(".//*[@id='content']/p"));
    errorRegisterMessage: Lable = new Lable(by.xpath("//div[@id='content']/p[@class='message error']"));
    ticketPriceHeaderMessage: Lable = new Lable(by.xpath("//table[@class='MyTable MedTable']//tr[@class='TableSmallHeader']/th"));

    // Dynamic control
    protected navigationItem(tabName: string): Link {
        return new Link(by.xpath(`//a[contains(.,'${tabName}')]`));
    }
    protected cellTable(tablename: string, rowindex: number, columnname: string): Element {
        return new Element(by.xpath(`//table[@class='${tablename}']//tr[${rowindex}]/td[count(//th[.= '${columnname}']//preceding-sibling::th) + 1]`));
    }
    protected cellTableCheckPrice(tablename: string, rowindex: number, colunmindex: number, columnname: string): Element {
        return new Element(by.xpath(`//table[@class='${tablename}']//tr[${rowindex}]/td[count(//th[.='${columnname}']//preceding-sibling::th) + '${colunmindex}']`));
    }
    protected rowNumber(table: string): Element {
        return new Element(by.xpath(`//table[@class='${table}']//tr`));
    }
    protected collunmNumber(table: string): Element {
        return new Element(by.xpath(`//table[@class='${table}']//td`));
    }
    protected checkPrice(train: string): Element {
        return new Element(by.xpath(`//table[@class='NoBorder']//td[.='${train}']/following-sibling::td[.='Check Price']`));
    }
    protected bookTicket(seattype: string): Element {
        return new Element(by.xpath(`//table[@class='NoBorder']//td[.='${seattype}']/following-sibling::td[.='Book ticket']`));
    }
    /**
     *GetTextMessage
     *@returns{Promise<boolean>}
     *@memberof GeneralPage
     */
    public async getWelcomeMsg(): Promise<string> {
        try {
            return <string>await this.welcomeMessage.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getWelcomeMsg, err.message)
        }
    }
    /**
     *Get nonpassword input text
     *@returns{Promise<boolean>}
     *@memberof GeneralPage
     */
    public async getNonePasswordMsg(): Promise<string> {
        try {
            return await this.errorNoneMessage.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getNonePasswordMsg, err.message)
        }
    }
    /**
    *Get thank message text
    *@returns{Promise<boolean>}
    *@memberof GeneralPage
    */
    public async getThankMessage(): Promise<string> {
        try {
            return await this.thankMessage.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getThankMessage, err.message)
        }
    }
    /**
    *Get password change done text
    *@returns{Promise<boolean>}
    *@memberof GeneralPage
    */
    public async getPasswordChangeDoneMsg(): Promise<string> {
        try {
            return await this.passwordChangeDone.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getPasswordChangeDoneMsg, err.message)
        }
    }
    /**
    *Get Error register message text
    *@returns{Promise<boolean>}
    *@memberof GeneralPage
    */
    public async getErrorRegisterMessage(): Promise<string> {
        try {
            return await this.errorRegisterMessage.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getErrorRegisterMessage, err.message)
        }
    }
    /**
    *Get Error message change password text
    *@returns{Promise<boolean>}
    *@memberof GeneralPage
    */
    public async getErrorMessageChangePass(): Promise<string> {
        try {
            return await this.errorMsgChangePass.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getErrorMessageChangePass, err.message)
        }
    }
    /**
     *Get book ticket message text
     *@returns{Promise<boolean>}
     *@memberof GeneralPage
     */
    public async getBookTicketMessage(): Promise<string> {
        try {
            return await this.bookTicketMessage.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getBookTicketMessage, err.message)
        }
    }
    /**
     *Get ticket price message text
     *@returns{Promise<boolean>}
     *@memberof GeneralPage
     */
    public async geTicketPriceHeaderMsg(): Promise<string> {
        try {
            return await this.ticketPriceHeaderMessage.getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.geTicketPriceHeaderMsg, err.message)
        }
    }
    /**	
   * Check if login page is displayed or not
   * @returns {Promise<boolean>}
   * @memberof MaxCall
   */
    public async isLoginPageDisplayed(timeOut?: number): Promise<boolean> {
        try {
            return await this.navigationItem(PageName.LOGIN).isDisplayed(timeOut);
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLoginPageDisplayed, err.message);
        }
    }

    /**
     * Go to LoginPage
     * @returns {Promise<LoginPage>}
     * @memberof GeneralPage
     */
    public async goToPage(namePage: PageName): Promise<any> {
        try {
            await Logger.write(FunctionType.UI, `Going to ${namePage} Page`)
            await this.navigationItem(namePage).waitForPresenceOf();
            await this.navigationItem(namePage).click();
            if (namePage == PageName.LOGIN) {
                let loginPage = require(`../page-objects/login-page`).default;
                return await loginPage.getLoginPageInstance();
            } else if (namePage == PageName.LOGOUT) {
                let homePage = require(`../page-objects/home-page`).default;
                return await homePage.getHomePageInstance();
            } else if (namePage == PageName.REGISTER) {
                let registerPage = require(`../page-objects/register-page`).default;
                return await registerPage.getRegisterPageInstance();
            } else if (namePage == PageName.CHANGEPASSWORD) {
                let changePasswordPage = require(`../page-objects/change-password-page`).default;
                return await changePasswordPage.getChangePassWordPageInstance();
            }
            else if (namePage == PageName.BOOKTICKET) {
                let bookTicketPage = require(`../page-objects/book-ticket-page`).default;
                return await bookTicketPage.getBookTickeInstance();
            } else if (namePage == PageName.TIMETABLE) {
                let timeTablePage = require(`../page-objects/time-table-page`).default;
                return await timeTablePage.getTimeTablePageInstance();
            } else if (namePage == PageName.MYTICKET) {
                let myticketPage = require(`../page-objects/myticket-page`).default;
                return await myticketPage.getMyTicketPageInstance();
            }

        } catch (err) {
            throw new errorwrapper.CustomError(this.goToPage, err.message)
        }
    }

    public async getTableCellValue(tablename: string, rowindex: number, columnname: string): Promise<any> {
        try {
            return await this.cellTable(tablename, rowindex, columnname).getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTableCellValue, err.message)
        }
    }
    public async getTableCellValueCheckPrice(tablename: string, rowindex: number, colunmindex: number, columnname: string) {
        try {
            return this.cellTableCheckPrice(tablename, rowindex, colunmindex, columnname).getText();
        } catch (err) {
            throw new errorwrapper.CustomError(this.getTableCellValueCheckPrice, message)
        }
    }
    public async getRowNumber(table: string) {
        try {
            const StringFormat = (str: string, ...args: string[]) =>
                str.replace(/{(\d+)}/g, (match, index) => args[index] || '')
            let xpath: string = StringFormat("//table[@class='{0}']//tr", table);
            return BrowserWrapper.getDriverInstance().FindElements(by.xpath(xpath)).count();

        } catch (err) {
            throw new errorwrapper.CustomError(this.getRowNumber, message)
        }
    }
    
    public async bookTicketFromTicketPrice(departstation: string, arrivestation: string, seattype: string): Promise<BookTicketPage> {
        try {
            let train: string = departstation + " to " + arrivestation;
            await this.checkPrice(train).click();
            await this.bookTicket(seattype).click();
            let bookTicketPage = require(`../page-objects/book-ticket-page`).default;
            return await bookTicketPage.getBookTickeInstance()
        } catch (err) {
            throw new errorwrapper.CustomError(this.bookTicketFromTicketPrice, err.message)
        }
    }
    /**
   * Return true if logout, false if log in
   *@returns{Promise<boolean>}
   *@memberof GeneralPage
   */
    public async isLogOut(timeOut?: number): Promise<boolean> {
        try {
            return this.navigationItem(PageName.LOGOUT).isDisplayed();
        } catch (err) {
            throw new errorwrapper.CustomError(this.isLogOut, err.message)
        }
    }

    public async activateAccount (username: string) : Promise<RegisterPage>{
        try
        {
            await Logger.write(FunctionType.UI, `Going to active new account`)
            let findMsg: string = "Please confirm your account " + username;
            let activeLink: string= await GmailHelper.getLinkActiveByTitle(findMsg)
            await BrowserWrapper.get(activeLink);
            let registerPage = require(`../page-objects/register-page`).default;
            return await registerPage.getRegisterPageInstance();
    } catch(err){
        throw new errorwrapper.CustomError(this.activateAccount, err.message)
    }
    }
}