"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Swatch;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

require("./swatch.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// @ts-expect-error ts-migrate(2700) FIXME: Rest types may only be created from object types.
function Swatch(_ref) {
  var className = _ref.className,
      color = _ref.color,
      title = _ref.title,
      size = _ref.size,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ["className", "color", "title", "size", "style"]);

  var result = /*#__PURE__*/_react.default.createElement("span", _extends({
    className: (0, _classnames.default)("color-swatch", className) // @ts-expect-error ts-migrate(2698) FIXME: Spread types may only be created from object types... Remove this comment to see the full error message
    ,
    style: _objectSpread({
      backgroundColor: color,
      width: size
    }, style)
  }, props));

  if ((0, _lodash.isString)(title) && title !== "") {
    return /*#__PURE__*/_react.default.createElement(_tooltip.default, {
      title: title,
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0
    }, result);
  }

  return result;
}

Swatch.defaultProps = {
  className: null,
  style: null,
  title: null,
  color: "transparent",
  size: 12
};
//# sourceMappingURL=Swatch.js.map