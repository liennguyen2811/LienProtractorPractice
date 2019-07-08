
import { Logger, FunctionType } from '@utilities/general/logger';
import TestRunInfo from '@data-objects/general/test-run-info';
import TestBase from '@testcases/test-base';
import HomePageRefactor from '@page-objects/home-page';
import LoginPageRefactor from '@page-objects/login-page';
import HomePage from '@page-objects/home-page';

 /* Type: RailWay
 * Suite: Login
 * TC ID: TC01
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe('Login suite TC01', function () {

  TestBase.scheduleTestBase();
  let expectedMsg: string = "aaaWelcome liennguyenlogigear12@gmail.com";

  // Declare page object
  let homePage: HomePageRefactor = new HomePage()
  let loginPageRefactor: LoginPageRefactor

  beforeEach(async () => {
      await Logger.write(FunctionType.TESTCASE, `TC01- User can login into Raiway with valid username and password`);
      homePage = HomePageRefactor.getHomePageInstance();
  }, TestRunInfo.conditionTimeout);

  it('TC01- User can login into Raiway with valid username and password', async () => {
            // 2. Clickon "Login" tab
            // 3. Enter valid Email and Password
            // 4. Click on "Login" button
            loginPageRefactor = await homePage.goToLoginPage();
            console.log("Refactor")
            // VP. User is logged into Railway. Welcome user message is displayed.  
            await loginPageRefactor.login(TestRunInfo.USERNAME, TestRunInfo.PASSWORD);
           // expect (await homePageRefactor.getWelcomeMessage()).toBe(expectedMsg, "Failed by: Could not login")
    
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