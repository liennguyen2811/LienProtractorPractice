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
describe('Protractor Demo Maximize', function () {
    it('should add one and two', function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield protractor_1.browser.waitForAngularEnabled(false);
            yield protractor_1.browser.get("https://chercher.tech/practice/frames-example-selenium-webdriver");
            yield protractor_1.browser.manage().window().maximize();
            let frame1 = protractor_1.element(protractor_1.by.id("frame1")).getWebElement();
            yield protractor_1.browser.sleep(6000);
            yield protractor_1.browser.switchTo().frame(frame1);
            let frame3 = protractor_1.element(protractor_1.by.xpath("//iframe[@id='frame3']")).getWebElement();
            yield protractor_1.browser.sleep(6000);
            protractor_1.browser.switchTo().frame(frame3);
            let checkbox = protractor_1.element(protractor_1.by.xpath("//input[@type='checkbox']"));
            yield checkbox.isSelected().then(function (checked) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (!checked) {
                        checkbox.click();
                        yield protractor_1.browser.sleep(6000);
                    }
                });
            });
        });
    });
});
//# sourceMappingURL=example5.js.map