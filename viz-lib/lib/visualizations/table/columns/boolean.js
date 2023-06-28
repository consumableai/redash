"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initBooleanColumn;

var _react = _interopRequireDefault(require("react"));

var _useDebounce = require("use-debounce");

var _editor = require("../../../components/visualizations/editor");

var _valueFormat = require("../../../lib/value-format");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Editor(_ref) {
  var column = _ref.column,
      onChange = _ref.onChange;

  function handleChange(index, value) {
    // @ts-expect-error ts-migrate(2488) FIXME: Type 'string[] | undefined' must have a '[Symbol.i... Remove this comment to see the full error message
    var booleanValues = [...column.booleanValues];
    booleanValues.splice(index, 1, value);
    onChange({
      booleanValues
    });
  }

  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(handleChange, 200),
      _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
      handleChangeDebounced = _useDebouncedCallback2[0];

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Value for ", /*#__PURE__*/_react.default.createElement("code", null, "false")),
    "data-test": "Table.ColumnEditor.Boolean.False" // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    ,
    defaultValue: column.booleanValues[0],
    onChange: event => handleChangeDebounced(0, event.target.value)
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Value for ", /*#__PURE__*/_react.default.createElement("code", null, "true")),
    "data-test": "Table.ColumnEditor.Boolean.True" // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    ,
    defaultValue: column.booleanValues[1],
    onChange: event => handleChangeDebounced(1, event.target.value)
  })));
}

function initBooleanColumn(column) {
  var format = (0, _valueFormat.createBooleanFormatter)(column.booleanValues);

  function prepareData(row) {
    return {
      text: format(row[column.name])
    };
  }

  function BooleanColumn(_ref2) {
    var row = _ref2.row;

    // eslint-disable-line react/prop-types
    var _prepareData = prepareData(row),
        text = _prepareData.text;

    return text;
  }

  BooleanColumn.prepareData = prepareData;
  return BooleanColumn;
}

initBooleanColumn.friendlyName = "Boolean";
initBooleanColumn.Editor = Editor;
//# sourceMappingURL=boolean.js.map