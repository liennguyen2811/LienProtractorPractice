"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
describe('angularjs homepage todo list', function () {
    it('should add a todo', function () {
        protractor_1.browser.get('https://angularjs.org');
        protractor_1.element(protractor_1.by.model('todoList.todoText')).sendKeys('write first protractor test');
        protractor_1.element(protractor_1.by.css('[value="add"]')).click();
        protractor_1.element.all(protractor_1.by.repeater('todo in')).then(function (todoList) {
            expect(todoList.length.toString()).toEqual('3');
            todoList[2].getText().then(function (text) {
                expect(text).toEqual('write first protractor test');
            });
        });
    });
});
//# sourceMappingURL=example1.js.map