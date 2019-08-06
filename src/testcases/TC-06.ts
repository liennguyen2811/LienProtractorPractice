import { Logger, FunctionType } from '@utilities/general/logger';
import TestRunInfo from '@data-objects/general/test-run-info';
import TestBase from '@testcases/test-base';
import HomePage from '@page-objects/home-page';
import LoginPage from '@page-objects/login-page';
import { PageName } from '@data-objects/general/general';
import { Account } from '@data-objects/railway/account';
import RegisterPage from '@page-objects/register-page';

 /* Type: RailWay
 * Suite: Manage account
 * TC ID: TC01
 * Tested browser: Chrome
 * Tested OS: Windows 10
 */

describe('Manage account TC06', function () {

  TestBase.scheduleTestBase();


  // Declare page object
  let homePage: HomePage = new HomePage()
  let loginPage: LoginPage;
  let registerPage: RegisterPage;
  let account: Account = new Account();
  let expectedText: string = "Thank you for registering your account";
  let expectedMsg: string = "Welcome ";

  beforeEach(async () => {
      await Logger.write(FunctionType.API, `TC06-User can create new account`);
      homePage = HomePage.getHomePageInstance();
  }, TestRunInfo.conditionTimeout);

  it('TC06- User can create new account', async () => {
            // 1. Go to Home Page
            loginPage = await homePage.goToPage(PageName.LOGIN);

            //2. Click on "Regiester" tab
            registerPage = await loginPage.goToPage(PageName.REGISTER);

            //3.Enter valid information into all fields
            account.initAccount();
            await registerPage.RegisterAccount(account);

            // VP. Home page displays."Log out" tab is disappeared.  
            expect (await registerPage.getThankMessage()).toBe(expectedText, "Thank message does not appear");

            //VP User can log in with new account
            await registerPage.activateAccount(account.Email);
            await homePage.goToPage(PageName.LOGIN);
            await loginPage.login(account.Email, account.Password);
            expect (await homePage.getWelcomeMsg()).toBe(expectedMsg + account.Email, "Failed by: Could not login")

    
  });

  afterEach(async () => {
      await Logger.write(FunctionType.NONE, `Final - Cleaning Up\n`);
      try {
         // logout 
         homePage.goToPage(PageName.LOGOUT);
      }
      catch (err) { }
  }, TestRunInfo.conditionTimeout);
});