"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chooseTextColorForBackground;

var _lodash = require("lodash");

var _chromaJs = _interopRequireDefault(require("chroma-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function chooseTextColorForBackground(backgroundColor) {
  var textColors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ["#ffffff", "#333333"];

  try {
    backgroundColor = (0, _chromaJs.default)(backgroundColor);
    return (0, _lodash.maxBy)(textColors, color => _chromaJs.default.contrast(backgroundColor, color));
  } catch (e) {
    return null;
  }
}
//# sourceMappingURL=chooseTextColorForBackground.js.map