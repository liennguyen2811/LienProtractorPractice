
import TestRunInfo from '@data-objects/general/test-run-info';
import TestBase from '@testcases/test-base';
import HomePage from '@page-objects/home-page';
import LoginPage from '@page-objects/login-page';
/** 
 * Type: RailWay
 * Suite: Login
 * TC ID: TC03
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe('Login suite - TC04', function () {

  TestBase.scheduleTestBase();
  let expectedMsg: string = "You have used 4 out of 5 login attempts. After all 5 have been used, you will be unable to login for 15 minutes";


  // Declare page object
  let homePage: HomePage = new HomePage()
  let loginPage: LoginPage

  beforeEach(async () => {
      // await Logger.write(FunctionType.TESTCASE, `TC04- User can login into Raiway with valid username and password`);
      homePage = HomePage.getHomePageInstance();
  }, TestRunInfo.conditionTimeout);

  it('Login page displays when un-logged User clicks on Book ticket tab', async () => {
            // 2. Clickon "Login" tab
            // 3. Enter valid Email and Password
            // 4. Click on "Login" button
            loginPage = await homePage.goToLoginPage();

            // VP. User is logged into Railway. Welcome user message is displayed.  
            expect (await loginPage.checkNonPassWordWithValidInfo(TestRunInfo.USERNAME,TestRunInfo.PASSWORD)).toBe(expectedMsg, "Failed by: The warning message does not display after wrong loging 4 times in Railway website");
        
  });

  afterEach(async () => {
      // await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
      try {
          
        homePage.logout();
          
      }
      catch (err) { }
  }, TestRunInfo.conditionTimeout);
});