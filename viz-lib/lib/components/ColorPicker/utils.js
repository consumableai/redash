"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateColor = validateColor;
exports.getColorName = getColorName;

var _lodash = require("lodash");

var _tinycolor = _interopRequireDefault(require("tinycolor2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateColor(value) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  value = (0, _tinycolor.default)(value);
  return value.isValid() ? "#" + value.toHex().toUpperCase() : fallback;
}

function getColorName(color, presetColors) {
  if ((0, _lodash.isArray)(presetColors)) {
    return color;
  }

  return (0, _lodash.findKey)(presetColors, v => validateColor(v) === color) || color;
}
//# sourceMappingURL=utils.js.map