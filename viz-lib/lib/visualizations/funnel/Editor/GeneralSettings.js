"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GeneralSettings;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _useDebounce = require("use-debounce");

var _editor = require("../../../components/visualizations/editor");

var _propTypes = require("../../prop-types");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function GeneralSettings(_ref) {
  var options = _ref.options,
      data = _ref.data,
      onOptionsChange = _ref.onOptionsChange;
  var columnNames = (0, _react.useMemo)(() => (0, _lodash.map)(data.columns, c => c.name), [data]);

  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(onOptionsChange, 200),
      _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
      onOptionsChangeDebounced = _useDebouncedCallback2[0];

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Step Column",
    "data-test": "Funnel.StepColumn",
    placeholder: "Choose column...",
    defaultValue: options.stepCol.colName || undefined,
    onChange: colName => onOptionsChange({
      stepCol: {
        colName: colName || null
      }
    })
  }, (0, _lodash.map)(columnNames, col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    key: col,
    "data-test": "Funnel.StepColumn.".concat(col)
  }, col)))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: "Step Column Title",
    "data-test": "Funnel.StepColumnTitle",
    defaultValue: options.stepCol.displayAs,
    onChange: event => onOptionsChangeDebounced({
      stepCol: {
        displayAs: event.target.value
      }
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Value Column",
    "data-test": "Funnel.ValueColumn",
    placeholder: "Choose column...",
    defaultValue: options.valueCol.colName || undefined,
    onChange: colName => onOptionsChange({
      valueCol: {
        colName: colName || null
      }
    })
  }, (0, _lodash.map)(columnNames, col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    key: col,
    "data-test": "Funnel.ValueColumn.".concat(col)
  }, col)))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: "Value Column Title",
    "data-test": "Funnel.ValueColumnTitle",
    defaultValue: options.valueCol.displayAs,
    onChange: event => onOptionsChangeDebounced({
      valueCol: {
        displayAs: event.target.value
      }
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Funnel.CustomSort",
    checked: !options.autoSort,
    onChange: event => onOptionsChange({
      autoSort: !event.target.checked
    })
  }, "Custom Sorting")), !options.autoSort && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Sort Column",
    "data-test": "Funnel.SortColumn",
    allowClear: true,
    placeholder: "Choose column...",
    defaultValue: options.sortKeyCol.colName || undefined,
    onChange: colName => onOptionsChange({
      sortKeyCol: {
        colName: colName || null
      }
    })
  }, (0, _lodash.map)(columnNames, col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    key: col,
    "data-test": "Funnel.SortColumn.".concat(col)
  }, col)))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Sort Order",
    "data-test": "Funnel.SortDirection",
    disabled: !options.sortKeyCol.colName,
    defaultValue: options.sortKeyCol.reverse ? "desc" : "asc",
    onChange: order => onOptionsChange({
      sortKeyCol: {
        reverse: order === "desc"
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "asc",
    "data-test": "Funnel.SortDirection.Ascending"
  }, "ascending"), /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: "desc",
    "data-test": "Funnel.SortDirection.Descending"
  }, "descending")))));
}

GeneralSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=GeneralSettings.js.map