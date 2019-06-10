
import { Logger, FunctionType } from '../utilities/general/logger';
import LoginPage from '../page-objects/login-page';
import HomePage from '../page-objects/home-page';
import TestRunInfo from '../data-objects/general/test-run-info';
import TestBase from './test-base';
/** 
 * Type: RailWay
 * Suite: Login
 * TC ID: TC01
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe('Login suite - TC01', function () {

  TestBase.scheduleTestBase();
  let expectedMsg: string = "Welcome guest!";

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
            loginPage = await homePage.goToLoginPage();

            // VP. User is logged into Railway. Welcome user message is displayed.  
            await loginPage.Login("liennguyenlogigear12@gmail.com", "liennguyen1");
            expect (await homePage.getWelcomeMessage()).toBe(expectedMsg, "Could not login")
    
  });

  afterEach(async () => {
      await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
      try {
          // logout 
          
      }
      catch (err) { }
  }, TestRunInfo.conditionTimeout);
});