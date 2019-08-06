import { Logger, FunctionType } from '@utilities/general/logger';
import TestRunInfo from '@data-objects/general/test-run-info';
import TestBase from '@testcases/test-base';
import HomePage from '@page-objects/home-page';
import LoginPage from '@page-objects/login-page';
import { PageName, Station, SeatType } from '@data-objects/general/general';
import { Ticket } from '@data-objects/railway/ticket';
import BookTicketPage from '@page-objects/book-ticket-page';


 /* Type: RailWay
 * Suite: Book Ticket
 * TC ID: TC01
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe('Book Ticket TC12', function () {

  TestBase.scheduleTestBase();
  // Declare veriable
  let ticket: Ticket = new Ticket();
  let expectedMsg = "Ticket booked successfully!";

  // Declare page object
  let homePage: HomePage = new HomePage()
  let loginPage: LoginPage
  let bookTickePage: BookTicketPage

  beforeEach(async () => {
      await Logger.write(FunctionType.TESTCASE, `TC12- User can book many tickets at a time`);
      homePage = HomePage.getHomePageInstance();
  }, TestRunInfo.conditionTimeout);

  it('TC12- User can book many tickets at a time', async () => {
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
            ticket.initTicket(Station.NHATRANG, Station.SAIGON, SeatType.SOFTBEDWITHAIR, 5);
            await bookTickePage.getBookTicket(ticket);
            expect (await bookTickePage.getBookTicketMessage()).toBe(expectedMsg, "Could not get book many ticket")

         

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