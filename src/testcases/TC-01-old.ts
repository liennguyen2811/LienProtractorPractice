
import { Logger, FunctionType } from '@utilities/general/logger';
import HomePage from '@page-objects/home-page-old';
import TestRunInfo from '@data-objects/general/test-run-info';
import TestBase from '@testcases/test-base';
import HomePageOld from '@page-objects/home-page-old';
import LoginPageOld from '@page-objects/login-page-old';

/** 
 * Type: RailWay
 * Suite: Login
 * TC ID: TC01
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe('Login suite TC01', function () {

  TestBase.scheduleTestBase();
  let expectedMsg: string = "aaaWelcome liennguyenlogigear12@gmail.com";

  // Declare page object
  let homePageOld: HomePageOld = new HomePageOld()
  let loginPageOld: LoginPageOld

  beforeEach(async () => {
      await Logger.write(FunctionType.TESTCASE, `TC01- User can login into Raiway with valid username and password`);
      homePageOld = HomePage.getHomePageInstance();
  }, TestRunInfo.conditionTimeout);

  it('TC01- User can login into Raiway with valid username and password', async () => {
            // 2. Clickon "Login" tab
            // 3. Enter valid Email and Password
            // 4. Click on "Login" button
            loginPageOld = await homePageOld.goToLoginPage();

            // VP. User is logged into Railway. Welcome user message is displayed.  
            await loginPageOld.login(TestRunInfo.USERNAME, TestRunInfo.PASSWORD);
            expect (await homePageOld.getWelcomeMessage()).toBe(expectedMsg, "Failed by: Could not login")
    
  });

  afterEach(async () => {
      await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
      try {
          // logout 
          homePageOld.logout();
      }
      catch (err) { }
  }, TestRunInfo.conditionTimeout);
});