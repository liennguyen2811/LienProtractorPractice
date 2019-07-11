
import { Logger, FunctionType } from '@utilities/general/logger';
import TestRunInfo from '@data-objects/general/test-run-info';
import TestBase from '@testcases/test-base';
import LoginPage from '@page-objects/login-page';
import HomePage from '@page-objects/home-page';
import { PageName } from '@data-objects/general/general';
import ChangePassWordPage from '@page-objects/change-password-page';

/** 
 * Type: RailWay
 * Suite: Login
 * TC ID: TC08
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe('ChangePassword suite - TC10', function () {

  TestBase.scheduleTestBase();
  let newPass: string = "a123:\"/{}!@$\\";
  let expectedMsg: string = "Password change failed. Please correct the errors and try again.";

  // Declare page object
  let homePage: HomePage = new HomePage()
  let loginPage: LoginPage
  let changePasswordPage: ChangePassWordPage
  

  beforeEach(async () => {
      await Logger.write(FunctionType.TESTCASE, `TC10- User can't create account with "Confirm password" is not the same with "Password"`);
      homePage = HomePage.getHomePageInstance();
  }, TestRunInfo.conditionTimeout);

  it('TC10- User can not create account with "Confirm password" is not the same with "Password"', async () => {
            // 1. 1. Navigate to QA Railway Website
            loginPage = await homePage.goToPage(PageName.LOGIN);

            // 2. Login with valid account
            await loginPage.login(TestRunInfo.USERNAME, TestRunInfo.PASSWORD);

            // 3. Click on "Change Password" tab
            changePasswordPage = await homePage.goToPage(PageName.CHANGEPASSWORD);

            //4. Enter valid value into all fields.
            //5. Click on "Change Password" button
            await changePasswordPage.changePassword(TestRunInfo.PASSWORD,newPass,TestRunInfo.PASSWORD);
            //await changePasswordPage.changePassword("liennguyen","liennguyen1","liennguyen1";)

            // VP. User is logged into Railway. Welcome user message is displayed. 
            expect (await changePasswordPage.getErrorMessageChangePass()).toBe(expectedMsg, "Could change pass")
    
  });

  afterEach(async () => {
      await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
      try {
          //logout 
          homePage.logout();
      }
      catch (err) { }
  }, TestRunInfo.conditionTimeout);
});