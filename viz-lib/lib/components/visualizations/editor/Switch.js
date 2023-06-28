"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Switch;

var _react = _interopRequireWildcard(require("react"));

var _switch = _interopRequireDefault(require("antd/lib/switch"));

var _typography = _interopRequireDefault(require("antd/lib/typography"));

require("./Switch.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// @ts-expect-error ts-migrate(2700) FIXME: Rest types may only be created from object types.
function Switch(_ref) {
  var id = _ref.id,
      children = _ref.children,
      disabled = _ref.disabled,
      props = _objectWithoutProperties(_ref, ["id", "children", "disabled"]);

  var fallbackId = (0, _react.useMemo)(() => "visualization-editor-control-".concat(Math.random().toString(36).substr(2, 10)), []);
  id = id || fallbackId;

  if (children) {
    return /*#__PURE__*/_react.default.createElement("label", {
      htmlFor: id,
      className: "switch-with-label"
    }, /*#__PURE__*/_react.default.createElement(_switch.default, _extends({
      id: id,
      disabled: disabled
    }, props)), /*#__PURE__*/_react.default.createElement(_typography.default.Text, {
      className: "switch-text",
      disabled: disabled
    }, children));
  }

  return /*#__PURE__*/_react.default.createElement(_switch.default, props);
}

Switch.defaultProps = {
  id: null,
  disabled: false,
  children: null
};
//# sourceMappingURL=Switch.js.map