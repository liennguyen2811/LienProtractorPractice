
import { Logger, FunctionType } from '../utilities/general/logger';
import LoginPage from '../page-objects/login-page';
import HomePage from '../page-objects/home-page';
import TestRunInfo from '../data-objects/general/test-run-info';
import TestBase from './test-base';
/** 
 * Type: RailWay
 * Suite: Login
 * TC ID: TC03
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe('Login suite - TC02', function () {

  TestBase.scheduleTestBase();
  let expectedMsg: string = "There was a problem with your login and/or errors exist in your form.";

  // Declare page object
  let homePage: HomePage = new HomePage()
  let loginPage: LoginPage

  beforeEach(async () => {
      await Logger.write(FunctionType.TESTCASE, `TC03- Login page displays when un-logged User clicks on Book ticket tab`);
      homePage = HomePage.getHomePageInstance();
  }, TestRunInfo.conditionTimeout);

  it('Login page displays when un-logged User clicks on Book ticket tab', async () => {
            // 2. Clickon "Login" tab
            // 3. Enter valid Email and Password
            // 4. Click on "Login" button
            loginPage = await homePage.goToBookTicketUnloggedUser();

            // VP. User is logged into Railway. Welcome user message is displayed.  
            expect (await loginPage.isLoginPageDisplayed(TestRunInfo.shortTimeout)).toBe(true, "Login page does not display");
    
  });

  afterEach(async () => {
      await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
      try {
          // logout 
          
      }
      catch (err) { }
  }, TestRunInfo.conditionTimeout);
});