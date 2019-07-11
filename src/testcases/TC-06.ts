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
  let expectedText: string = "Thank you for registering your account";

  beforeEach(async () => {
      await Logger.write(FunctionType.API, `TC01- User can login into Raiway with valid username and password`);
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