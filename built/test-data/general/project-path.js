"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const filePath = __importStar(require("path"));
const error_wapper_1 = require("@utilities/protractor-wappers/error-wapper");
class ProjectPath {
    static getPath(filename) {
        try {
            let splitString = "built\\test-data\\general".length;
            let projectPath = __dirname.slice(0, __dirname.length - splitString);
            if (filename == null) {
                return projectPath;
            }
            else {
                return filePath.join(projectPath, filename);
            }
        }
        catch (err) {
            throw new error_wapper_1.errorwrapper.CustomError(this.getPath, err.message);
        }
    }
}
ProjectPath.conf = ProjectPath.getPath("built\\conf").replace(/\\/g, "/");
ProjectPath.testCases = ProjectPath.getPath("built\\testcases").replace(/\\/g, "/");
ProjectPath.testData = ProjectPath.getPath("built\\test-data").replace(/\\/g, "/");
ProjectPath.pageObjects = ProjectPath.getPath("built\\page-objects").replace(/\\/g, "/");
ProjectPath.dataObjects = ProjectPath.getPath("built\\data-objects").replace(/\\/g, "/");
ProjectPath.utilities = ProjectPath.getPath("built\\utilities").replace(/\\/g, "/");
ProjectPath.test_helpers = ProjectPath.getPath("built\\test-helpers").replace(/\\/g, "/");
ProjectPath.project = ProjectPath.getPath().replace(/\\/g, "/");
exports.default = ProjectPath;
//# sourceMappingURL=project-path.js.map