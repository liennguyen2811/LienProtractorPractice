
require('module-alias/register');

exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['../testcases/TC-04.js']
  }