"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HeatmapColorsSettings;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _editor = require("../../../components/visualizations/editor");

var _propTypes = require("../../prop-types");

var _ColorPalette = _interopRequireDefault(require("../../ColorPalette"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorSchemes = ["Blackbody", "Bluered", "Blues", "Earth", "Electric", "Greens", "Greys", "Hot", "Jet", "Picnic", "Portland", "Rainbow", "RdBu", "Reds", "Viridis", "YlGnBu", "YlOrRd", "Custom..."];

function HeatmapColorsSettings(_ref) {
  var options = _ref.options,
      onOptionsChange = _ref.onOptionsChange;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Color Scheme",
    "data-test": "Chart.Colors.Heatmap.ColorScheme",
    placeholder: "Choose Color Scheme...",
    allowClear: true,
    value: options.colorScheme || undefined,
    onChange: value => onOptionsChange({
      colorScheme: value || null
    })
  }, (0, _lodash.map)(ColorSchemes, scheme =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    key: scheme,
    value: scheme,
    "data-test": "Chart.Colors.Heatmap.ColorScheme.".concat(scheme)
  }, scheme)))), options.colorScheme === "Custom..." && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ColorPicker, {
    layout: "horizontal",
    label: "Min Color:",
    "data-test": "Chart.Colors.Heatmap.MinColor",
    interactive: true,
    placement: "topLeft",
    presetColors: _ColorPalette.default,
    color: options.heatMinColor,
    onChange: heatMinColor => onOptionsChange({
      heatMinColor
    }) // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
    ,
    addonAfter: /*#__PURE__*/_react.default.createElement(_editor.ColorPicker.Label, {
      color: options.heatMinColor,
      presetColors: _ColorPalette.default
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ColorPicker, {
    layout: "horizontal",
    label: "Max Color:",
    "data-test": "Chart.Colors.Heatmap.MaxColor",
    interactive: true,
    placement: "topRight",
    presetColors: _ColorPalette.default,
    color: options.heatMaxColor,
    onChange: heatMaxColor => onOptionsChange({
      heatMaxColor
    }) // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
    ,
    addonAfter: /*#__PURE__*/_react.default.createElement(_editor.ColorPicker.Label, {
      color: options.heatMaxColor,
      presetColors: _ColorPalette.default
    })
  }))));
}

HeatmapColorsSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=HeatmapColorsSettings.js.map