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
  column: "",
  frequenciesColumn: "",
  wordLengthLimit: {
    min: null,
    max: null
  },
  wordCountLimit: {
    min: null,
    max: null
  }
};
var _default = {
  type: "WORD_CLOUD",
  name: "Word Cloud",
  getOptions: options => (0, _lodash.merge)({}, DEFAULT_OPTIONS, options),
  Renderer: _Renderer.default,
  Editor: _Editor.default,
  defaultRows: 8
};
exports.default = _default;
//# sourceMappingURL=index.js.map