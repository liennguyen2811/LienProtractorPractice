
import { Logger, FunctionType } from '@utilities/general/logger';
import HomePageOld from '@page-objects/home-page-old';
import TestRunInfo from '@data-objects/general/test-run-info';
import TestBase from '@testcases/test-base';
import LoginPageOld from '@page-objects/login-page-old';
/** 
 * Type: RailWay
 * Suite: Login
 * TC ID: TC02
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe('Login suite - TC02', function () {

  TestBase.scheduleTestBase();
  let expectedMsg: string = "There was a problem with your login and/or errors exist in your form.";

  // Declare page object
  let homePage: HomePageOld = new HomePageOld()
  let loginPage: LoginPageOld

  beforeEach(async () => {
      await Logger.write(FunctionType.TESTCASE, `TC02- User can't login with blank Username textbox`);
      homePage = HomePageOld.getHomePageInstance();
  }, TestRunInfo.conditionTimeout);

  it('TC02- User can not login with blank Username textbox', async () => {
            // 2. Clickon "Login" tab
            // 3. Enter valid Email and Password
            // 4. Click on "Login" button
            loginPage = await homePage.goToLoginPage();

            // VP. User is logged into Railway. Welcome user message is displayed.  
            await loginPage.login("", TestRunInfo.PASSWORD);
            expect (await homePage.getNonpasswordmessage()).toBe(expectedMsg, "Could not login")
    
  });

  afterEach(async () => {
      await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
      try {
          // logout 
          //homePage.logout();
      }
      catch (err) { }
  }, TestRunInfo.conditionTimeout);
});