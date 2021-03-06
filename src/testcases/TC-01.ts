import { Logger, FunctionType } from '@utilities/general/logger';
import TestRunInfo from '@data-objects/general/test-run-info';
import TestBase from '@testcases/test-base';
import HomePage from '@page-objects/home-page';
import LoginPage from '@page-objects/login-page';
import { PageName } from '@data-objects/general/general';

 /* Type: RailWay
 * Suite: Login
 * TC ID: TC01
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe('Login suite TC01', function () {

  TestBase.scheduleTestBase();
  let expectedMsg: string = "Welcome " + TestRunInfo.USERNAME;

  // Declare page object
  let homePage: HomePage = new HomePage()
  let loginPage: LoginPage

  beforeEach(async () => {
      await Logger.write(FunctionType.TESTCASE, `TC01- User can login into Raiway with valid username and password`);
      homePage = HomePage.getHomePageInstance();
  }, TestRunInfo.conditionTimeout);

  it('TC01- User can login into Raiway with valid username and password', async () => {
            // 2. Clickon "Login" tab
            // 3. Enter valid Email and Password
            // 4. Click on "Login" button
            loginPage = await homePage.goToPage(PageName.LOGIN);
            
            // VP. User is logged into Railway. Welcome user message is displayed.  
            await loginPage.login(TestRunInfo.USERNAME, TestRunInfo.PASSWORD);
            expect (await homePage.getWelcomeMsg()).toBe(expectedMsg, "Failed by: Could not login")
    
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