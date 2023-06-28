"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ColorsSettings;

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("../../prop-types");

var _PieColorsSettings = _interopRequireDefault(require("./PieColorsSettings"));

var _HeatmapColorsSettings = _interopRequireDefault(require("./HeatmapColorsSettings"));

var _DefaultColorsSettings = _interopRequireDefault(require("./DefaultColorsSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var components = {
  pie: _PieColorsSettings.default,
  heatmap: _HeatmapColorsSettings.default
};

function ColorsSettings(_ref) {
  var options = _ref.options,
      props = _objectWithoutProperties(_ref, ["options"]);

  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  var Component = components[options.globalSeriesType] || _DefaultColorsSettings.default;
  return /*#__PURE__*/_react.default.createElement(Component, _extends({
    options: options
  }, props));
}

ColorsSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=ColorsSettings.js.map