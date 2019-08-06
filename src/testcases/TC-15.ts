import { Logger, FunctionType } from '@utilities/general/logger';
import TestRunInfo from '@data-objects/general/test-run-info';
import TestBase from '@testcases/test-base';
import HomePage from '@page-objects/home-page';
import LoginPage from '@page-objects/login-page';
import { PageName, Station, SeatType } from '@data-objects/general/general';
import BookTicketPage from '@page-objects/book-ticket-page';
import { Ticket } from '@data-objects/railway/ticket';
import MyTicketPage from '@page-objects/myticket-page';
 /* Type: RailWay
 * Suite: Mangage ticket
 * TC ID: TC01
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe('Mangage ticket TC15', function () {

  TestBase.scheduleTestBase();
  let ticket: Ticket = new Ticket();
  let expectedMsg = "Sorry, can't find any results that match your filters.\r\nPlease change the filters and try again.";
  // Declare veriable

  // Declare page object
  let homePage: HomePage = new HomePage()
  let loginPage: LoginPage
  let bookTickePage: BookTicketPage
  let myTickePage: MyTicketPage

  beforeEach(async () => {
      await Logger.write(FunctionType.TESTCASE, `TC15- User can cancel a ticket`);
      homePage = HomePage.getHomePageInstance();
  }, TestRunInfo.conditionTimeout);

  it('TC15- User can cancel a ticket', async () => {
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
            ticket.initTicket(Station.NHATRANG, Station.PHANTHIET, SeatType.SOFTBEDWITHAIR,1);
            await bookTickePage.getBookTicket(ticket);

            myTickePage = await bookTickePage.goToPage(PageName.MYTICKET);
            await myTickePage.cancelTicket();
            
           // await myTickePage.filterTicket(Station.NHATRANG, Station.PHANTHIET,"","");

           //expect (await myTickePage.GetNoResultMessage()).toBe(expectedMsg, "Could not get book many ticket");

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