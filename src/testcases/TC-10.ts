
import { Logger, FunctionType } from '@utilities/general/logger';
import TestRunInfo from '@data-objects/general/test-run-info';
import TestBase from '@testcases/test-base';
import LoginPage from '@page-objects/login-page';
import HomePage from '@page-objects/home-page';
import { PageName } from '@data-objects/general/general';
import ChangePassWordPage from '@page-objects/change-password-page';
import { Account } from '@data-objects/railway/account';
import RegisterPage from '@page-objects/register-page';

/** 
 * Type: RailWay
 * Suite: Manage Account
 * TC ID: TC08
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe('Manage Account suite - TC10', function () {

  TestBase.scheduleTestBase();
  let newPass: string = "a123:\"/{}!@$\\";
  let expectedMsg: string = "Password change failed. Please correct the errors and try again.";
  let account: Account = new Account();
  
  // Declare page object
  let homePage: HomePage = new HomePage()
  let loginPage: LoginPage
  let registerPage: RegisterPage;
  let changePasswordPage: ChangePassWordPage
  

  beforeEach(async () => {
      await Logger.write(FunctionType.TESTCASE, `TC10-  Errors display if password and confirm password don't match when resetting password"`);
      homePage = HomePage.getHomePageInstance();
      registerPage = await homePage.goToPage(PageName.REGISTER);

      // Precondition
      account.initAccount();
      await registerPage.RegisterAccount(account);
      await registerPage.activateAccount(account.Email);

  }, TestRunInfo.conditionTimeout);

  it('TC10 -  Errors display if password and confirm password do not match when resetting password"', async () => {
            // 1. Navigate to QA Railway Website
            loginPage = await homePage.goToPage(PageName.LOGIN);

            // 2. Login with valid account
            await loginPage.login(account.Email, account.Password);

            // 3. Click on "Change Password" tab
            changePasswordPage = await homePage.goToPage(PageName.CHANGEPASSWORD);

            //4. Enter valid value into all fields.
            //5. Click on "Change Password" button
            await changePasswordPage.changePassword(account.Password,newPass,account.Password);

            // VP. User is logged into Railway. Welcome user message is displayed. 
            expect (await changePasswordPage.getErrorMessageChangePass()).toBe(expectedMsg, "Could change pass")
    
  });

  afterEach(async () => {
      await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
      try {
          //logout 
          homePage.goToPage(PageName.LOGOUT)
      }
      catch (err) { }
  }, TestRunInfo.conditionTimeout);
});