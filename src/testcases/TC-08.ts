
import { Logger, FunctionType } from '@utilities/general/logger';
import TestRunInfo from '@data-objects/general/test-run-info';
import TestBase from '@testcases/test-base';
import LoginPage from '@page-objects/login-page';
import HomePage from '@page-objects/home-page';
import { PageName } from '@data-objects/general/general';
import ChangePassWordPage from '@page-objects/change-password-page';

/** 
 * Type: RailWay
 * Suite: Manage account
 * TC ID: TC08
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe('Manage account - TC08', function () {

  TestBase.scheduleTestBase();
  let newPass: string = "newPassword1";
  let expectedMsg: string = "Your password has been updated!";

  // Declare page object
  let homePage: HomePage = new HomePage()
  let loginPage: LoginPage
  let changePasswordPage: ChangePassWordPage
  

  beforeEach(async () => {
      await Logger.write(FunctionType.TESTCASE, `TC08- User can change password`);
      homePage = HomePage.getHomePageInstance();
  }, TestRunInfo.conditionTimeout);

  it('TC08- User can change password', async () => {
            // 1. 1. Navigate to QA Railway Website
            loginPage = await homePage.goToPage(PageName.LOGIN);

            // 2. Login with valid account
            await loginPage.login(TestRunInfo.USERNAME, TestRunInfo.PASSWORD);

            // 3. Click on "Change Password" tab
            changePasswordPage = await homePage.goToPage(PageName.CHANGEPASSWORD);

            //4. Enter valid value into all fields.
            //5. Click on "Change Password" button
            await changePasswordPage.changePassword(TestRunInfo.PASSWORD,newPass,newPass);

            // VP. User is logged into Railway. Welcome user message is displayed. 
            expect (await changePasswordPage.getPasswordChangeDoneMsg()).toBe(expectedMsg, "Could not change password")
    
  });

  afterEach(async () => {
      await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
      try {
          // logout 
          //homePage.logout();
          changePasswordPage = await homePage.goToPage(PageName.CHANGEPASSWORD);
          await changePasswordPage.changePassword(newPass,TestRunInfo.PASSWORD,TestRunInfo.PASSWORD);
      }
      catch (err) { }
  }, TestRunInfo.conditionTimeout);
});