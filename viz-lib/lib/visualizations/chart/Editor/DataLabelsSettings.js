"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DataLabelsSettings;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _useDebounce = require("use-debounce");

var _editor = require("../../../components/visualizations/editor");

var _propTypes = require("../../prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function DataLabelsSettings(_ref) {
  var options = _ref.options,
      onOptionsChange = _ref.onOptionsChange;
  var isShowDataLabelsAvailable = (0, _lodash.includes)(["line", "area", "column", "scatter", "pie", "heatmap"], options.globalSeriesType);

  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(onOptionsChange, 200),
      _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
      debouncedOnOptionsChange = _useDebouncedCallback2[0];

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, isShowDataLabelsAvailable &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Chart.DataLabels.ShowDataLabels",
    defaultChecked: options.showDataLabels,
    onChange: event => onOptionsChange({
      showDataLabels: event.target.checked
    })
  }, "Show Data Labels")), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Number Values Format", /*#__PURE__*/_react.default.createElement(_editor.ContextHelp.NumberFormatSpecs, null)),
    "data-test": "Chart.DataLabels.NumberFormat",
    defaultValue: options.numberFormat,
    onChange: e => debouncedOnOptionsChange({
      numberFormat: e.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Percent Values Format", /*#__PURE__*/_react.default.createElement(_editor.ContextHelp.NumberFormatSpecs, null)),
    "data-test": "Chart.DataLabels.PercentFormat",
    defaultValue: options.percentFormat,
    onChange: e => debouncedOnOptionsChange({
      percentFormat: e.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Date/Time Values Format", /*#__PURE__*/_react.default.createElement(_editor.ContextHelp.DateTimeFormatSpecs, null)),
    "data-test": "Chart.DataLabels.DateTimeFormat",
    defaultValue: options.dateTimeFormat,
    onChange: e => debouncedOnOptionsChange({
      dateTimeFormat: e.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Data Labels", /*#__PURE__*/_react.default.createElement(_editor.ContextHelp, {
      placement: "topRight",
      arrowPointAtCenter: true
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        paddingBottom: 5
      }
    }, "Use special names to access additional properties:"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("code", null, "{{ @@name }}"), " series name;"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("code", null, "{{ @@x }}"), " x-value;"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("code", null, "{{ @@y }}"), " y-value;"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("code", null, "{{ @@yPercent }}"), " relative y-value;"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("code", null, "{{ @@yError }}"), " y deviation;"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("code", null, "{{ @@size }}"), " bubble size;"), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        paddingTop: 5
      }
    }, "Also, all query result columns can be referenced", /*#__PURE__*/_react.default.createElement("br", null), "using", /*#__PURE__*/_react.default.createElement("code", {
      style: {
        whiteSpace: "nowrap"
      }
    }, "{{ column_name }}"), " syntax."))),
    "data-test": "Chart.DataLabels.TextFormat",
    placeholder: "(auto)",
    defaultValue: options.textFormat,
    onChange: e => debouncedOnOptionsChange({
      textFormat: e.target.value
    })
  })));
}

DataLabelsSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=DataLabelsSettings.js.map