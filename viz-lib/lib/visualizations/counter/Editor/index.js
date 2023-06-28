"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createTabbedEditor = _interopRequireDefault(require("../../../components/visualizations/editor/createTabbedEditor"));

var _GeneralSettings = _interopRequireDefault(require("./GeneralSettings"));

var _FormatSettings = _interopRequireDefault(require("./FormatSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _createTabbedEditor.default)([{
  key: "General",
  title: "General",
  component: _GeneralSettings.default
}, {
  key: "Format",
  title: "Format",
  component: _FormatSettings.default
}]);

exports.default = _default;
//# sourceMappingURL=index.js.map