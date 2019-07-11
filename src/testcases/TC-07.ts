import { Logger, FunctionType } from '@utilities/general/logger';
import TestRunInfo from '@data-objects/general/test-run-info';
import TestBase from '@testcases/test-base';
import HomePage from '@page-objects/home-page';
import LoginPage from '@page-objects/login-page';
import { PageName } from '@data-objects/general/general';
import { Account } from '@data-objects/railway/account';
import RegisterPage from '@page-objects/register-page';


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
  let loginPage: LoginPage;
  let registerPage: RegisterPage;
  let account: Account = new Account();
  let expectedText : string= "Invalid username or password. Please try again.";


  beforeEach(async () => {
      await Logger.write(FunctionType.API, `TC01- User can login into Raiway with valid username and password`);
      homePage = HomePage.getHomePageInstance();
      loginPage = await homePage.goToPage(PageName.LOGIN);
      registerPage = await loginPage.goToPage(PageName.REGISTER);
      account.initAccount();
      await registerPage.RegisterAccount(account);

  }, TestRunInfo.conditionTimeout);

  it('TC06- User can create new account', async () => {
            // 1. Go to HomePage
            loginPage = await homePage.goToPage(PageName.LOGIN);

            //2. Login with above account
            await loginPage.login(account.Email, account.Password);

            //VP. User cant login and messaged "Invalid username or password. Please try again" appears
            expect (await loginPage.getErrormessage()).toBe(expectedText, "Error register message does not appear");
    
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