"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Legend;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _ColorPicker = _interopRequireDefault(require("../../../components/ColorPicker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Legend(_ref) {
  var items = _ref.items,
      alignText = _ref.alignText;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "choropleth-visualization-legend"
  }, (0, _lodash.map)(items, (item, index) => /*#__PURE__*/_react.default.createElement("div", {
    key: "legend".concat(index),
    className: "legend-item"
  }, /*#__PURE__*/_react.default.createElement(_ColorPicker.default.Swatch, {
    color: item.color
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "legend-item-text text-".concat(alignText)
  }, item.text))));
}

Legend.defaultProps = {
  items: [],
  alignText: "left"
};
//# sourceMappingURL=Legend.js.map