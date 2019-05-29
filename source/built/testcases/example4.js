"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
describe('Protractor Demo App', function () {
    var firstNumber = protractor_1.element(protractor_1.by.model('first'));
    var secondNumber = protractor_1.element(protractor_1.by.model('second'));
    var goButton = protractor_1.element(protractor_1.by.id('gobutton'));
    var latestResult = protractor_1.element(protractor_1.by.binding('latest'));
    beforeEach(function () {
        protractor_1.browser.get('http://juliemr.github.io/protractor-demo/');
    });
    it('should have a title', function () {
        //expect(browser.getTitle()).toEqual('Super Calculator');
    });
    it('should add one and two', function () {
        firstNumber.sendKeys(1);
        secondNumber.sendKeys(2);
        goButton.click();
        // expect(latestResult.getText()).toEqual('3');
    });
    it('should add four and six', function () {
        // Fill this in.
        //expect(latestResult.getText()).toEqual('10');
    });
    it('should read the value from an input', function () {
        firstNumber.sendKeys(1);
        //expect(firstNumber.getAttribute('value')).toEqual('1');
    });
});
