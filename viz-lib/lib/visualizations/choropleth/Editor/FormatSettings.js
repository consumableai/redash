"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GeneralSettings;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _useDebounce = require("use-debounce");

var Grid = _interopRequireWildcard(require("antd/lib/grid"));

var _editor = require("../../../components/visualizations/editor");

var _propTypes = require("../../prop-types");

var _useLoadGeoJson3 = _interopRequireDefault(require("../hooks/useLoadGeoJson"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function TemplateFormatHint(_ref) {
  var geoJsonProperties = _ref.geoJsonProperties;
  return (
    /*#__PURE__*/
    // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    _react.default.createElement(_editor.ContextHelp, {
      placement: "topLeft",
      arrowPointAtCenter: true
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        paddingBottom: 5
      }
    }, /*#__PURE__*/_react.default.createElement("div", null, "All query result columns can be referenced using ", /*#__PURE__*/_react.default.createElement("code", null, "{{ column_name }}"), " syntax."), /*#__PURE__*/_react.default.createElement("div", null, "Use ", /*#__PURE__*/_react.default.createElement("code", null, "{{ @@value }}"), " to access formatted value.")), geoJsonProperties.length > 0 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "p-b-5"
    }, "GeoJSON properties could be accessed by these names:"), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        maxHeight: 300,
        overflow: "auto"
      }
    }, (0, _lodash.map)(geoJsonProperties, property => /*#__PURE__*/_react.default.createElement("div", {
      key: property
    }, /*#__PURE__*/_react.default.createElement("code", null, "{{ @@".concat(property, "}}")))))))
  );
}

TemplateFormatHint.defaultProps = {
  geoJsonProperties: []
};

function GeneralSettings(_ref2) {
  var options = _ref2.options,
      onOptionsChange = _ref2.onOptionsChange;

  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(onOptionsChange, 200),
      _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
      onOptionsChangeDebounced = _useDebouncedCallback2[0];

  var _useLoadGeoJson = (0, _useLoadGeoJson3.default)(options.mapType),
      _useLoadGeoJson2 = _slicedToArray(_useLoadGeoJson, 1),
      geoJson = _useLoadGeoJson2[0];

  var geoJsonFields = (0, _react.useMemo)(() => (0, _utils.getGeoJsonFields)(geoJson), [geoJson]);

  var templateFormatHint = /*#__PURE__*/_react.default.createElement(TemplateFormatHint, {
    geoJsonProperties: geoJsonFields
  });

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "choropleth-visualization-editor-format-settings"
  }, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(Grid.Row, {
    gutter: 15
  }, /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Value Format", /*#__PURE__*/_react.default.createElement(_editor.ContextHelp.NumberFormatSpecs, null)),
    "data-test": "Choropleth.Editor.ValueFormat",
    defaultValue: options.valueFormat,
    onChange: event => onOptionsChangeDebounced({
      valueFormat: event.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: "Value Placeholder",
    "data-test": "Choropleth.Editor.ValuePlaceholder",
    defaultValue: options.noValuePlaceholder,
    onChange: event => onOptionsChangeDebounced({
      noValuePlaceholder: event.target.value
    })
  })))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Choropleth.Editor.LegendVisibility",
    checked: options.legend.visible,
    onChange: event => onOptionsChange({
      legend: {
        visible: event.target.checked
      }
    })
  }, "Show Legend")), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(Grid.Row, {
    gutter: 15
  }, /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Legend Position",
    "data-test": "Choropleth.Editor.LegendPosition",
    disabled: !options.legend.visible,
    defaultValue: options.legend.position,
    onChange: position => onOptionsChange({
      legend: {
        position
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "top-left",
    "data-test": "Choropleth.Editor.LegendPosition.TopLeft"
  }, "top / left"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "top-right",
    "data-test": "Choropleth.Editor.LegendPosition.TopRight"
  }, "top / right"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "bottom-left",
    "data-test": "Choropleth.Editor.LegendPosition.BottomLeft"
  }, "bottom / left"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "bottom-right",
    "data-test": "Choropleth.Editor.LegendPosition.BottomRight"
  }, "bottom / right"))), /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 12
  }, /*#__PURE__*/_react.default.createElement(_editor.TextAlignmentSelect, {
    "data-test": "Choropleth.Editor.LegendTextAlignment",
    label: "Legend Text Alignment",
    disabled: !options.legend.visible,
    defaultValue: options.legend.alignText,
    onChange: event => onOptionsChange({
      legend: {
        alignText: event.target.value
      }
    })
  })))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Choropleth.Editor.TooltipEnabled",
    checked: options.tooltip.enabled,
    onChange: event => onOptionsChange({
      tooltip: {
        enabled: event.target.checked
      }
    })
  }, "Show Tooltip")), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Tooltip Template ", templateFormatHint),
    "data-test": "Choropleth.Editor.TooltipTemplate",
    disabled: !options.tooltip.enabled,
    defaultValue: options.tooltip.template,
    onChange: event => onOptionsChangeDebounced({
      tooltip: {
        template: event.target.value
      }
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Choropleth.Editor.PopupEnabled",
    checked: options.popup.enabled,
    onChange: event => onOptionsChange({
      popup: {
        enabled: event.target.checked
      }
    })
  }, "Show Popup")), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.TextArea, {
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Popup Template ", templateFormatHint),
    "data-test": "Choropleth.Editor.PopupTemplate",
    disabled: !options.popup.enabled,
    rows: 4,
    defaultValue: options.popup.template,
    onChange: event => onOptionsChangeDebounced({
      popup: {
        template: event.target.value
      }
    })
  })));
}

GeneralSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=FormatSettings.js.map