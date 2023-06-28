"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createTabbedEditor = _interopRequireDefault(require("../../../components/visualizations/editor/createTabbedEditor"));

var _ColumnsSettings = _interopRequireDefault(require("./ColumnsSettings"));

var _GridSettings = _interopRequireDefault(require("./GridSettings"));

require("./editor.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _createTabbedEditor.default)([{
  key: "Columns",
  title: "Columns",
  component: _ColumnsSettings.default
}, {
  key: "Grid",
  title: "Grid",
  component: _GridSettings.default
}]);

exports.default = _default;
//# sourceMappingURL=index.js.map