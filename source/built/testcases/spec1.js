"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
describe('Protractor Demo App', function () {
    it('should have a title', function () {
        protractor_1.browser.get('http://juliemr.github.io/protractor-demo/');
        // expect(browser.getTitle()).toEqual('Super Calculator');
    });
});
