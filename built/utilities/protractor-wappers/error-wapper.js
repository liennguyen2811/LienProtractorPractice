"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorwrapper;
(function (errorwrapper) {
    class IError extends Error {
        constructor(opt_error) { super(); }
    }
    class WebDriverError extends IError {
        constructor(opt_error) { super(); }
        ;
    }
    class CustomError extends WebDriverError {
        constructor(functionName, errorMessage) {
            super(errorMessage);
            this.message = `CustomError - The ${errorMessage}.`;
        }
        static getFunctionName(funcName) {
            return funcName.name;
        }
    }
    errorwrapper.CustomError = CustomError;
    class ElementNotSelectTableError extends WebDriverError {
        constructor(by) {
            super();
            this.message = `ElementNotSelectTableError - The element ${by} could not be selected.`;
        }
        ;
    }
    errorwrapper.ElementNotSelectTableError = ElementNotSelectTableError;
    class ElementNotVisibleError extends WebDriverError {
        constructor(by) {
            super();
            this.message = `ElementNotVisibleError - The element ${by} is not visible.`;
        }
        ;
    }
    errorwrapper.ElementNotVisibleError = ElementNotVisibleError;
    class InvalidArgumentError extends WebDriverError {
        constructor() {
            super();
            this.message = `InvalidArgumentError - The arguments are either invalid or malformed.`;
        }
        ;
    }
    errorwrapper.InvalidArgumentError = InvalidArgumentError;
    class InvalidCookieDomainError extends WebDriverError {
        constructor() {
            super();
            this.message = `InvalidCookieDomainError - Error when setting a cookie under a different domain than the current page.`;
        }
        ;
    }
    errorwrapper.InvalidCookieDomainError = InvalidCookieDomainError;
    class InvalidElementCoordinatesError extends WebDriverError {
        constructor() {
            super();
            this.message = `InvalidElementCoordinatesError - The coordinates provided to an interactions operation are invalid.`;
        }
        ;
    }
    errorwrapper.InvalidElementCoordinatesError = InvalidElementCoordinatesError;
    class InvalidElementStateError extends WebDriverError {
        constructor(by) {
            super();
            this.message = `InvalidElementStateError - The element ${by} is in an invalid state.`;
        }
        ;
    }
    errorwrapper.InvalidElementStateError = InvalidElementStateError;
    class InvalidSelectorError extends WebDriverError {
        constructor() {
            super();
            this.message = `InvalidSelectorError - Argument was an invalid selector.`;
        }
        ;
    }
    errorwrapper.InvalidSelectorError = InvalidSelectorError;
    class NoSuchSessionError extends WebDriverError {
        constructor() {
            super();
            this.message = `NoSuchSessionError - Session did not exist.`;
        }
        ;
    }
    errorwrapper.NoSuchSessionError = NoSuchSessionError;
    class JavascriptError extends WebDriverError {
        constructor() {
            super();
            this.message = `JavascriptError - An error occurred while executing JavaScript.`;
        }
        ;
    }
    errorwrapper.JavascriptError = JavascriptError;
    class MoveTargetOutOfBoundsError extends WebDriverError {
        constructor() {
            super();
            this.message = `MoveTargetOutOfBoundsError - The target for mouse interaction is not in the browser’s viewport and cannot be brought into that viewport.`;
        }
        ;
    }
    errorwrapper.MoveTargetOutOfBoundsError = MoveTargetOutOfBoundsError;
    class NoSuchAlertError extends WebDriverError {
        constructor() {
            super();
            this.message = `NoSuchAlertError - No alert found `;
        }
        ;
    }
    errorwrapper.NoSuchAlertError = NoSuchAlertError;
    class NoSuchElementError extends WebDriverError {
        constructor(by) {
            super();
            this.message = `NoSuchElementError - The element ${by} could not be located on the page.`;
        }
        ;
    }
    errorwrapper.NoSuchElementError = NoSuchElementError;
    class NoSuchFrameError extends WebDriverError {
        constructor(by) {
            super();
            this.message = `NoSuchFrameError - The frame ${by} could not be found.`;
        }
        ;
    }
    errorwrapper.NoSuchFrameError = NoSuchFrameError;
    class NoSuchWindowError extends WebDriverError {
        constructor(by) {
            super();
            this.message = `NoSuchWindowError - The window ${by} could not be found.`;
        }
        ;
    }
    errorwrapper.NoSuchWindowError = NoSuchWindowError;
    class ScriptTimeoutError extends WebDriverError {
        constructor() {
            super();
            this.message = `ScriptTimeoutError - Script Timeout.`;
        }
        ;
    }
    errorwrapper.ScriptTimeoutError = ScriptTimeoutError;
    class SessionNotCreatedError extends WebDriverError {
        constructor() {
            super();
            this.message = `SessionNotCreatedError - A new session could not be created.`;
        }
        ;
    }
    errorwrapper.SessionNotCreatedError = SessionNotCreatedError;
    class StaleElementReferenceError extends WebDriverError {
        constructor(by) {
            super();
            this.message = `StaleElementReferenceError - The element ${by} is no longer attached to the DOM.`;
        }
        ;
    }
    errorwrapper.StaleElementReferenceError = StaleElementReferenceError;
    class TimeoutError extends WebDriverError {
        constructor() {
            super();
            this.message = `TimeoutError - Exceeded timeout.`;
        }
        ;
    }
    errorwrapper.TimeoutError = TimeoutError;
    class UnableToSetCookieError extends WebDriverError {
        constructor() {
            super();
            this.message = `UnableToSetCookieError - A request to set a cookie’s value could not be satisfied.`;
        }
        ;
    }
    errorwrapper.UnableToSetCookieError = UnableToSetCookieError;
    class UnableToCaptureScreenError extends WebDriverError {
        constructor() {
            super();
            this.message = `UnableToCaptureScreenError - A screen capture operation was not possible.`;
        }
        ;
    }
    errorwrapper.UnableToCaptureScreenError = UnableToCaptureScreenError;
    class UnexpectedAlertOpenError extends WebDriverError {
        constructor() {
            super();
            this.message = `UnexpectedAlertOpenError - Unable to open alert dialog.`;
        }
        ;
    }
    errorwrapper.UnexpectedAlertOpenError = UnexpectedAlertOpenError;
    class UnknownCommandError extends WebDriverError {
        constructor() {
            super();
            this.message = `UnknownCommandError - The command could not be executed because the remote end is not aware of it.`;
        }
        ;
    }
    errorwrapper.UnknownCommandError = UnknownCommandError;
    class UnknownMethodError extends WebDriverError {
        constructor() {
            super();
            this.message = `UnknownMethodError - The requested command matched a known URL but did not match an method for that URL.`;
        }
        ;
    }
    errorwrapper.UnknownMethodError = UnknownMethodError;
    class UnsupportedOperationError extends WebDriverError {
        constructor() {
            super();
            this.message = `UnsupportedOperationError - Reports an unsupport operation.`;
        }
        ;
    }
    errorwrapper.UnsupportedOperationError = UnsupportedOperationError;
})(errorwrapper = exports.errorwrapper || (exports.errorwrapper = {}));
//# sourceMappingURL=error-wapper.js.map