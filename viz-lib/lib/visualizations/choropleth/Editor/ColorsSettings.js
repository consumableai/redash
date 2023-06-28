"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ColorsSettings;

var _react = _interopRequireDefault(require("react"));

var _useDebounce = require("use-debounce");

var _editor = require("../../../components/visualizations/editor");

var _propTypes = require("../../prop-types");

var _ColorPalette = _interopRequireDefault(require("../ColorPalette"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ColorsSettings(_ref) {
  var options = _ref.options,
      onOptionsChange = _ref.onOptionsChange;

  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(onOptionsChange, 200),
      _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
      onOptionsChangeDebounced = _useDebouncedCallback2[0];

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Clustering Mode",
    "data-test": "Choropleth.Editor.ClusteringMode",
    defaultValue: options.clusteringMode,
    onChange: clusteringMode => onOptionsChange({
      clusteringMode
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "q",
    "data-test": "Choropleth.Editor.ClusteringMode.q"
  }, "quantile"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "e",
    "data-test": "Choropleth.Editor.ClusteringMode.e"
  }, "equidistant"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "k",
    "data-test": "Choropleth.Editor.ClusteringMode.k"
  }, "k-means"))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    layout: "horizontal",
    label: "Steps",
    "data-test": "Choropleth.Editor.ColorSteps",
    min: 3,
    max: 11,
    defaultValue: options.steps,
    onChange: steps => onOptionsChangeDebounced({
      steps
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ColorPicker, {
    layout: "horizontal",
    label: "Min Color",
    interactive: true,
    presetColors: _ColorPalette.default,
    placement: "topRight",
    color: options.colors.min,
    triggerProps: {
      "data-test": "Choropleth.Editor.Colors.Min"
    },
    onChange: min => onOptionsChange({
      colors: {
        min
      }
    }) // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
    ,
    addonAfter: /*#__PURE__*/_react.default.createElement(_editor.ColorPicker.Label, {
      color: options.colors.min,
      presetColors: _ColorPalette.default
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ColorPicker, {
    layout: "horizontal",
    label: "Max Color",
    interactive: true,
    presetColors: _ColorPalette.default,
    placement: "topRight",
    color: options.colors.max,
    triggerProps: {
      "data-test": "Choropleth.Editor.Colors.Max"
    },
    onChange: max => onOptionsChange({
      colors: {
        max
      }
    }) // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
    ,
    addonAfter: /*#__PURE__*/_react.default.createElement(_editor.ColorPicker.Label, {
      color: options.colors.max,
      presetColors: _ColorPalette.default
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ColorPicker, {
    layout: "horizontal",
    label: "No Value Color",
    interactive: true,
    presetColors: _ColorPalette.default,
    placement: "topRight",
    color: options.colors.noValue,
    triggerProps: {
      "data-test": "Choropleth.Editor.Colors.NoValue"
    },
    onChange: noValue => onOptionsChange({
      colors: {
        noValue
      }
    }) // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
    ,
    addonAfter: /*#__PURE__*/_react.default.createElement(_editor.ColorPicker.Label, {
      color: options.colors.noValue,
      presetColors: _ColorPalette.default
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ColorPicker, {
    layout: "horizontal",
    label: "Background Color",
    interactive: true,
    presetColors: _ColorPalette.default,
    placement: "topRight",
    color: options.colors.background,
    triggerProps: {
      "data-test": "Choropleth.Editor.Colors.Background"
    },
    onChange: background => onOptionsChange({
      colors: {
        background
      }
    }) // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
    ,
    addonAfter: /*#__PURE__*/_react.default.createElement(_editor.ColorPicker.Label, {
      color: options.colors.background,
      presetColors: _ColorPalette.default
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ColorPicker, {
    layout: "horizontal",
    label: "Borders Color",
    interactive: true,
    presetColors: _ColorPalette.default,
    placement: "topRight",
    color: options.colors.borders,
    triggerProps: {
      "data-test": "Choropleth.Editor.Colors.Borders"
    },
    onChange: borders => onOptionsChange({
      colors: {
        borders
      }
    }) // @ts-expect-error ts-migrate(2339) FIXME: Property 'Label' does not exist on type '({ classN... Remove this comment to see the full error message
    ,
    addonAfter: /*#__PURE__*/_react.default.createElement(_editor.ColorPicker.Label, {
      color: options.colors.borders,
      presetColors: _ColorPalette.default
    })
  })));
}

ColorsSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=ColorsSettings.js.map