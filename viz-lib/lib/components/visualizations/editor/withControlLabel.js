"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControlLabel = ControlLabel;
exports.default = withControlLabel;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var Grid = _interopRequireWildcard(require("antd/lib/grid"));

var _typography = _interopRequireDefault(require("antd/lib/typography"));

require("./control-label.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ControlLabel(_ref) {
  var layout = _ref.layout,
      label = _ref.label,
      labelProps = _ref.labelProps,
      disabled = _ref.disabled,
      children = _ref.children;

  if (layout === "vertical" && label) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "visualization-editor-control-label visualization-editor-control-label-vertical"
    }, /*#__PURE__*/_react.default.createElement("label", labelProps, /*#__PURE__*/_react.default.createElement(_typography.default.Text, {
      disabled: disabled
    }, label)), children);
  }

  if (layout === "horizontal" && label) {
    return /*#__PURE__*/_react.default.createElement(Grid.Row, {
      className: "visualization-editor-control-label visualization-editor-control-label-horizontal" // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element[]; className: string; ty... Remove this comment to see the full error message
      ,
      type: "flex",
      align: "middle",
      gutter: 15
    }, /*#__PURE__*/_react.default.createElement(Grid.Col, {
      span: 12
    }, /*#__PURE__*/_react.default.createElement("label", labelProps, /*#__PURE__*/_react.default.createElement(_typography.default.Text, {
      disabled: disabled
    }, label))), /*#__PURE__*/_react.default.createElement(Grid.Col, {
      span: 12
    }, children));
  }

  return children;
}

ControlLabel.defaultProps = {
  layout: "vertical",
  label: null,
  disabled: false,
  children: null
};

function withControlLabel(WrappedControl) {
  // eslint-disable-next-line react/prop-types
  function ControlWrapper(_ref2) {
    var className = _ref2.className,
        id = _ref2.id,
        layout = _ref2.layout,
        label = _ref2.label,
        labelProps = _ref2.labelProps,
        disabled = _ref2.disabled,
        props = _objectWithoutProperties(_ref2, ["className", "id", "layout", "label", "labelProps", "disabled"]);

    var fallbackId = (0, _react.useMemo)(() => "visualization-editor-control-".concat(Math.random().toString(36).substr(2, 10)), []);
    labelProps = _objectSpread({}, labelProps, {
      htmlFor: id || fallbackId
    });
    return /*#__PURE__*/_react.default.createElement(ControlLabel, {
      layout: layout,
      label: label,
      labelProps: labelProps,
      disabled: disabled
    }, /*#__PURE__*/_react.default.createElement(WrappedControl, _extends({
      className: (0, _classnames.default)("visualization-editor-input", className),
      id: labelProps.htmlFor,
      disabled: disabled
    }, props)));
  } // Copy static methods from `WrappedComponent`


  (0, _hoistNonReactStatics.default)(ControlWrapper, WrappedControl);
  return ControlWrapper;
}
//# sourceMappingURL=withControlLabel.js.map