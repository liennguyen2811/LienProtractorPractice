
import { Logger, FunctionType } from '@utilities/general/logger';
import TestRunInfo from '@data-objects/general/test-run-info';
import TestBase from '@testcases/test-base';
import HomePage from '@page-objects/home-page';
import LoginPage from '@page-objects/login-page';
import { PageName } from '@data-objects/general/general';
import BookTicketPage from '@page-objects/book-ticket-page';


/** 
 * Type: RailWay
 * Suite: Login
 * TC ID: TC03
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe('Login suite - TC03', function () {

  TestBase.scheduleTestBase();

  // Declare page object
  let homePage: HomePage = new HomePage();
  let loginPage: LoginPage;
  let bookTickPage: BookTicketPage

  beforeEach(async () => {
      await Logger.write(FunctionType.TESTCASE, `TC03- Login page displays when un-logged User clicks on Book ticket tab`);
      homePage = HomePage.getHomePageInstance();
  }, TestRunInfo.conditionTimeout);

  it('TC03- Login page displays when un-logged User clicks on Book ticket tab', async () => {
            // 2. Clickon "Login" tab
            // 3. Enter valid Email and Password
            // 4. Click on "Login" button
            bookTickPage = await homePage.goToPage(PageName.BOOKTICKET)

            // VP. User is logged into Railway. Welcome user message is displayed.  
            expect (await bookTickPage.isLoginPageDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Login page does not display");
    
  });

  afterEach(async () => {
      await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
      try {
          // logout 
          //homePage.goToPage(PageName.LOGOUT)
      }
      catch (err) { }
  }, TestRunInfo.conditionTimeout);
});