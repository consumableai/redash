"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ColorsSettings;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _editor = require("../../../components/visualizations/editor");

var _propTypes = require("../../prop-types");

var _ColorPalette = _interopRequireDefault(require("../../ColorPalette"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ColorPalette = _objectSpread({
  White: "#FFFFFF"
}, _ColorPalette.default);

var minSteps = 3;
var maxSteps = 20;

function validateSteps(value) {
  value = (0, _lodash.isFinite)(value) ? value : parseInt(value, 10);
  value = (0, _lodash.isFinite)(value) ? value : 0;
  return Math.max(minSteps, Math.min(value, maxSteps));
}

function ColorsSettings(_ref) {
  var options = _ref.options,
      onOptionsChange = _ref.onOptionsChange;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ColorPicker, {
    layout: "horizontal",
    label: "Min Color",
    presetColors: ColorPalette,
    interactive: true,
    color: options.colors.min,
    onChange: min => onOptionsChange({
      colors: {
        min
      }
    }) // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
    ,
    addonAfter: /*#__PURE__*/_react.default.createElement(_editor.ColorPicker.Label, {
      color: options.colors.min,
      presetColors: ColorPalette
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ColorPicker, {
    layout: "horizontal",
    label: "Max Color",
    presetColors: ColorPalette,
    interactive: true,
    color: options.colors.max,
    onChange: max => onOptionsChange({
      colors: {
        max
      }
    }) // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
    ,
    addonAfter: /*#__PURE__*/_react.default.createElement(_editor.ColorPicker.Label, {
      color: options.colors.max,
      presetColors: ColorPalette
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    layout: "horizontal",
    label: "Steps",
    min: minSteps,
    max: maxSteps,
    value: options.colors.steps,
    onChange: value => onOptionsChange({
      colors: {
        steps: validateSteps(value)
      }
    })
  })));
}

ColorsSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=ColorsSettings.js.map