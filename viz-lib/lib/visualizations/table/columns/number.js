"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initNumberColumn;

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

  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(onChange, 200),
      _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
      onChangeDebounced = _useDebouncedCallback2[0];

  return (
    /*#__PURE__*/
    // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
    _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
      label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Number format", /*#__PURE__*/_react.default.createElement(_editor.ContextHelp.NumberFormatSpecs, null)),
      "data-test": "Table.ColumnEditor.Number.Format",
      defaultValue: column.numberFormat,
      onChange: event => onChangeDebounced({
        numberFormat: event.target.value
      })
    }))
  );
}

function initNumberColumn(column) {
  var format = (0, _valueFormat.createNumberFormatter)(column.numberFormat);

  function prepareData(row) {
    return {
      text: format(row[column.name])
    };
  }

  function NumberColumn(_ref2) {
    var row = _ref2.row;

    // eslint-disable-line react/prop-types
    var _prepareData = prepareData(row),
        text = _prepareData.text;

    return text;
  }

  NumberColumn.prepareData = prepareData;
  return NumberColumn;
}

initNumberColumn.friendlyName = "Number";
initNumberColumn.Editor = Editor;
//# sourceMappingURL=number.js.map