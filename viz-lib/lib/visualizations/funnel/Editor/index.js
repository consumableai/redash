"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createTabbedEditor = _interopRequireDefault(require("../../../components/visualizations/editor/createTabbedEditor"));

var _GeneralSettings = _interopRequireDefault(require("./GeneralSettings"));

var _AppearanceSettings = _interopRequireDefault(require("./AppearanceSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _createTabbedEditor.default)([{
  key: "General",
  title: "General",
  component: _GeneralSettings.default
}, {
  key: "Appearance",
  title: "Appearance",
  component: _AppearanceSettings.default
}]);

exports.default = _default;
//# sourceMappingURL=index.js.map