"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
describe('Protractor Demo App', function () {
    it('should add one and two', function () {
        return __awaiter(this, void 0, void 0, function* () {
            protractor_1.browser.get('http://juliemr.github.io/protractor-demo/');
            protractor_1.element(protractor_1.by.model('first')).sendKeys(1);
            protractor_1.element(protractor_1.by.model('second')).sendKeys(2);
            protractor_1.element(protractor_1.by.id('gobutton')).click();
            expect(yield protractor_1.element(protractor_1.by.binding('latest')).getText()).
                toEqual("5"); // This is wrong!
        });
    });
});
