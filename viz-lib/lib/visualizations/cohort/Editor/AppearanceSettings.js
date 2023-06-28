"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AppearanceSettings;

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

function AppearanceSettings(_ref) {
  var options = _ref.options,
      onOptionsChange = _ref.onOptionsChange;

  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(onOptionsChange, 200),
      _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
      debouncedOnOptionsChange = _useDebouncedCallback2[0];

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: "Time Column Title",
    defaultValue: options.timeColumnTitle,
    onChange: e => debouncedOnOptionsChange({
      timeColumnTitle: e.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: "People Column Title",
    defaultValue: options.peopleColumnTitle,
    onChange: e => debouncedOnOptionsChange({
      peopleColumnTitle: e.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Stage Column Title", /*#__PURE__*/_react.default.createElement(_editor.ContextHelp, {
      placement: "topRight",
      arrowPointAtCenter: true
    }, /*#__PURE__*/_react.default.createElement("div", null, "Use ", /*#__PURE__*/_react.default.createElement("code", null, "{{ @ }}"), " to insert a stage number"))),
    defaultValue: options.stageColumnTitle,
    onChange: e => debouncedOnOptionsChange({
      stageColumnTitle: e.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Number Values Format", /*#__PURE__*/_react.default.createElement(_editor.ContextHelp.NumberFormatSpecs, null)),
    defaultValue: options.numberFormat,
    onChange: e => debouncedOnOptionsChange({
      numberFormat: e.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Percent Values Format", /*#__PURE__*/_react.default.createElement(_editor.ContextHelp.NumberFormatSpecs, null)),
    defaultValue: options.percentFormat,
    onChange: e => debouncedOnOptionsChange({
      percentFormat: e.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: "No Value Placeholder",
    defaultValue: options.noValuePlaceholder,
    onChange: e => debouncedOnOptionsChange({
      noValuePlaceholder: e.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    defaultChecked: options.showTooltips,
    onChange: event => onOptionsChange({
      showTooltips: event.target.checked
    })
  }, "Show Tooltips")), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    defaultChecked: options.percentValues,
    onChange: event => onOptionsChange({
      percentValues: event.target.checked
    })
  }, "Normalize Values to Percentage")));
}

AppearanceSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=AppearanceSettings.js.map