"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _Renderer = _interopRequireDefault(require("./Renderer"));

var _Editor = _interopRequireDefault(require("./Editor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_OPTIONS = {
  controls: {
    enabled: false // `false` means "show controls" o_O

  },
  rendererOptions: {
    table: {
      colTotals: true,
      rowTotals: true
    }
  }
};
var _default = {
  type: "PIVOT",
  name: "Pivot Table",
  getOptions: options => (0, _lodash.merge)({}, DEFAULT_OPTIONS, options),
  Renderer: _Renderer.default,
  Editor: _Editor.default,
  defaultRows: 10,
  defaultColumns: 3,
  minColumns: 2
};
exports.default = _default;
//# sourceMappingURL=index.js.map