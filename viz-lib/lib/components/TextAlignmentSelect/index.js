"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TextAlignmentSelect;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _radio = _interopRequireDefault(require("antd/lib/radio"));

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

var _AlignLeftOutlined = _interopRequireDefault(require("@ant-design/icons/AlignLeftOutlined"));

var _AlignCenterOutlined = _interopRequireDefault(require("@ant-design/icons/AlignCenterOutlined"));

var _AlignRightOutlined = _interopRequireDefault(require("@ant-design/icons/AlignRightOutlined"));

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// @ts-expect-error ts-migrate(2700) FIXME: Rest types may only be created from object types.
function TextAlignmentSelect(_ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);

  return (
    /*#__PURE__*/
    // Antd RadioGroup does not use any custom attributes
    _react.default.createElement("div", (0, _lodash.pickBy)(props, (v, k) => (0, _lodash.startsWith)(k, "data-")), /*#__PURE__*/_react.default.createElement(_radio.default.Group, _extends({
      className: (0, _classnames.default)("text-alignment-select", className)
    }, props), /*#__PURE__*/_react.default.createElement(_tooltip.default, {
      title: "Align left",
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0
    }, /*#__PURE__*/_react.default.createElement(_radio.default.Button, {
      value: "left",
      "data-test": "TextAlignmentSelect.Left"
    }, /*#__PURE__*/_react.default.createElement(_AlignLeftOutlined.default, null))), /*#__PURE__*/_react.default.createElement(_tooltip.default, {
      title: "Align center",
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0
    }, /*#__PURE__*/_react.default.createElement(_radio.default.Button, {
      value: "center",
      "data-test": "TextAlignmentSelect.Center"
    }, /*#__PURE__*/_react.default.createElement(_AlignCenterOutlined.default, null))), /*#__PURE__*/_react.default.createElement(_tooltip.default, {
      title: "Align right",
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0
    }, /*#__PURE__*/_react.default.createElement(_radio.default.Button, {
      value: "right",
      "data-test": "TextAlignmentSelect.Right"
    }, /*#__PURE__*/_react.default.createElement(_AlignRightOutlined.default, null)))))
  );
}

TextAlignmentSelect.defaultProps = {
  className: null
};
//# sourceMappingURL=index.js.map