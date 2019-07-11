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


  // Declare page object
  let homePage: HomePage = new HomePage()
  let loginPage: LoginPage

  beforeEach(async () => {
      await Logger.write(FunctionType.TESTCASE, `TC01- User can login into Raiway with valid username and password`);
      homePage = HomePage.getHomePageInstance();
  }, TestRunInfo.conditionTimeout);

  it('TC05- User is redirected to Home page after logging out', async () => {
            // 2. Login with valid Email and Password
            loginPage = await homePage.goToPage(PageName.LOGIN);
            await loginPage.login(TestRunInfo.USERNAME, TestRunInfo.PASSWORD);
            
            //3. Click on "Contact" tab
            loginPage.goToPage(PageName.CONTACT);

            //4. Click on "Log out" tab
            loginPage.goToPage(PageName.LOGOUT);

            // VP. Home page displays."Log out" tab is disappeared.  
            expect (await homePage.isLogOut()).toBe(true, "It does not log out");
    
  });

  afterEach(async () => {
      await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
      try {
          //logout 
         // homePage.goToPage(PageName.LOGOUT);
      }
      catch (err) { }
  }, TestRunInfo.conditionTimeout);
});