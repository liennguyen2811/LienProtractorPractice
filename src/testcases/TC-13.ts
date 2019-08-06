import { Logger, FunctionType } from '@utilities/general/logger';
import TestRunInfo from '@data-objects/general/test-run-info';
import TestBase from '@testcases/test-base';
import HomePage from '@page-objects/home-page';
import LoginPage from '@page-objects/login-page';
import { PageName, Station, SeatType } from '@data-objects/general/general';
import { Ticket } from '@data-objects/railway/ticket';
import BookTicketPage from '@page-objects/book-ticket-page';
import BrowserWrapper from '@utilities/protractor-wappers/browser-wrapper';
import TimeTablePage from '@page-objects/time-table-page';
import TicketPricePage from '@page-objects/ticket-price-page';

 /* Type: RailWay
 * Suite: Book Ticket
 * TC ID: TC13
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe('Book Ticket TC13', function () {

  TestBase.scheduleTestBase();
  // Declare veriable

  // Declare page object
  let homePage: HomePage = new HomePage()
  let loginPage: LoginPage
  let timeTablePage: TimeTablePage
  let ticketPricePage: TicketPricePage

  beforeEach(async () => {
      await Logger.write(FunctionType.TESTCASE, `TC13- "Ticket price" page displays with ticket details after clicking on "check price" link in "Train timetable"`);
      homePage = HomePage.getHomePageInstance();
  }, TestRunInfo.conditionTimeout);

  it('TC13- "Ticket price" page displays with ticket details after clicking on "check price" link in "Train timetable"', async () => {
            // 1. Navigate to QA Railway Website
            loginPage = await homePage.goToPage(PageName.LOGIN);
            
            // 2. Login with a valid account   
            await loginPage.login(TestRunInfo.USERNAME, TestRunInfo.PASSWORD);

            //3. Click on "Book ticket" tab
            timeTablePage = await homePage.goToPage(PageName.TIMETABLE);
            ticketPricePage = await timeTablePage.goToTabTimeTableRow(Station.DANANG, Station.SAIGON)
            await ticketPricePage.checkTicketPriceForDN_SGTrip();
        
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