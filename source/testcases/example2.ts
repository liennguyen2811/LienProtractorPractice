import { ElementFinder, browser, by, element } from 'protractor';
import BrowserWrapper from '../utilities/protractor-wappers/browser-wrapper';


describe('Protractor Demo App', function() {
    it('should add one and two', async function() {
      await BrowserWrapper.waitForAngularEnabled(false);
      await BrowserWrapper.get('http://18.136.107.136/Page/HomePage.cshtml');
    });
  });