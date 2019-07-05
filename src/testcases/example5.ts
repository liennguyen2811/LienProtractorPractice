import { ElementFinder,promise, browser, by, element, WebElement, Browser } from 'protractor';

describe('Protractor Demo Maximize', function() {
    it('should add one and two', async function() {
        await browser.waitForAngularEnabled(false);
        await browser.get("https://chercher.tech/practice/frames-example-selenium-webdriver");
        await browser.manage().window().maximize();
        let frame1:WebElement = element(by.id("frame1")).getWebElement();
        await browser.sleep(6000);
        console.log("Switch IFrame1 element");
        await browser.switchTo().frame(frame1);
		let frame3:WebElement = element(by.xpath("//iframe[@id='frame3']")).getWebElement();
        await browser.sleep(6000);
        console.log("Switch IFrame2 element");
		browser.switchTo().frame(frame3);

		let checkbox:WebElement  = element(by.xpath("//input[@type='checkbox']"));
		// if check box is not selected then click the checkbox
		await checkbox.isSelected().then(async function(checked){
			// if check box is not selected then click the checkbox
			if(! checked){
                console.log("Get checkbox")
                checkbox.click();
                await browser.sleep(6000);
			}
    });
  });
});