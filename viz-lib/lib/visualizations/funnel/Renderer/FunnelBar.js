"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FunnelBar;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./funnel-bar.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FunnelBar(_ref) {
  var color = _ref.color,
      value = _ref.value,
      align = _ref.align,
      className = _ref.className,
      children = _ref.children;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)("funnel-bar", "funnel-bar-".concat(align), className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "funnel-bar-value",
    style: {
      backgroundColor: color,
      width: value + "%"
    }
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "funnel-bar-label"
  }, children));
}

FunnelBar.defaultProps = {
  color: "#dadada",
  value: 0.0,
  align: "left",
  className: null,
  children: null
};
//# sourceMappingURL=FunnelBar.js.map