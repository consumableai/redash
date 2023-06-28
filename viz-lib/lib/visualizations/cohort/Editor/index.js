"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createTabbedEditor = _interopRequireDefault(require("../../../components/visualizations/editor/createTabbedEditor"));

var _ColumnsSettings = _interopRequireDefault(require("./ColumnsSettings"));

var _OptionsSettings = _interopRequireDefault(require("./OptionsSettings"));

var _ColorsSettings = _interopRequireDefault(require("./ColorsSettings"));

var _AppearanceSettings = _interopRequireDefault(require("./AppearanceSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _createTabbedEditor.default)([{
  key: "Columns",
  title: "Columns",
  component: _ColumnsSettings.default
}, {
  key: "Options",
  title: "Options",
  component: _OptionsSettings.default
}, {
  key: "Colors",
  title: "Colors",
  component: _ColorsSettings.default
}, {
  key: "Appearance",
  title: "Appearance",
  component: _AppearanceSettings.default
}]);

exports.default = _default;
//# sourceMappingURL=index.js.map