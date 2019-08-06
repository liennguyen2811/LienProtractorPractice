import { Logger, FunctionType } from '@utilities/general/logger';
import TestRunInfo from '@data-objects/general/test-run-info';
import TestBase from '@testcases/test-base';
import HomePage from '@page-objects/home-page';
import LoginPage from '@page-objects/login-page';
import { PageName, Station, SeatType } from '@data-objects/general/general';
import BrowserWrapper from '@utilities/protractor-wappers/browser-wrapper';
import TimeTablePage from '@page-objects/time-table-page';
import TicketPricePage from '@page-objects/ticket-price-page';
import BookTicketPage from '@page-objects/book-ticket-page';
import { Ticket } from '@data-objects/railway/ticket';

 /* Type: RailWay
 * Suite: Book Ticket
 * TC ID: TC14
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe('Book Ticket TC14', function () {

  TestBase.scheduleTestBase();
  let ticket: Ticket = new Ticket();
  // Declare veriable

  // Declare page object
  let homePage: HomePage = new HomePage()
  let loginPage: LoginPage
  let bookTickePage: BookTicketPage

  beforeEach(async () => {
      await Logger.write(FunctionType.TESTCASE, `TC14- "User can open "Book ticket" page by click on "Book ticket" link in "Ticket price""`);
      homePage = HomePage.getHomePageInstance();
  }, TestRunInfo.conditionTimeout);

  it('TC14- "User can open "Book ticket" page by click on "Book ticket" link in "Ticket price', async () => {
            // 1. Navigate to QA Railway Website
            loginPage = await homePage.goToPage(PageName.LOGIN);
            
            // 2. Login with a valid account   
            await loginPage.login(TestRunInfo.USERNAME, TestRunInfo.PASSWORD);

            //3. Click on "Book ticket" tab
            bookTickePage = await homePage.goToPage(PageName.BOOKTICKET);

            //4. Select a "Depart date" from the list
            //5. Select "Sài Gòn" for "Depart from" and "Nha Trang" for "Arrive at".
            //6. Select "Soft bed with air conditioner" for "Seat type"
            //7. Select "1" for "Ticket amount"
            //8. Click on "Book ticket" button
            ticket.initTicket(Station.NHATRANG, Station.PHANTHIET, SeatType.SOFTBEDWITHAIR, 5);
            await bookTickePage.getBookTicket(ticket);
            expect (await bookTickePage.checkBookTicketInfoDisplay(ticket)).toBe(true, "Could not book many ticket")

  });

  afterEach(async () => {
      await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
      try {
          //logout 
          homePage.goToPage(PageName.LOGOUT);
      }
      catch (err) { }
  }, TestRunInfo.conditionTimeout);
});