"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ColumnMappingSelect;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _editor = require("../../../components/visualizations/editor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MappingTypes = {
  x: {
    label: "X Column"
  },
  y: {
    label: "Y Columns",
    multiple: true
  },
  series: {
    label: "Group by"
  },
  yError: {
    label: "Errors column"
  },
  size: {
    label: "Bubble Size Column"
  },
  zVal: {
    label: "Color Column"
  }
};

var SwappedMappingTypes = _objectSpread({}, MappingTypes, {
  x: {
    label: "Y Column"
  },
  y: {
    label: "X Columns",
    multiple: true
  }
});

function ColumnMappingSelect(_ref) {
  var value = _ref.value,
      availableColumns = _ref.availableColumns,
      type = _ref.type,
      _onChange = _ref.onChange,
      areAxesSwapped = _ref.areAxesSwapped;
  var options = (0, _lodash.sortBy)((0, _lodash.filter)((0, _lodash.uniq)((0, _lodash.flatten)([availableColumns, value])), v => (0, _lodash.isString)(v) && v !== "")); // this swaps the ui, as the data will be swapped on render

  var _ref2 = !areAxesSwapped ? MappingTypes[type] : SwappedMappingTypes[type],
      label = _ref2.label,
      multiple = _ref2.multiple;

  return (
    /*#__PURE__*/
    // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
    _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
      label: label,
      "data-test": "Chart.ColumnMapping.".concat(type),
      mode: multiple ? "multiple" : "default",
      allowClear: true,
      showSearch: true,
      placeholder: multiple ? "Choose columns..." : "Choose column...",
      value: value || undefined // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
      ,
      onChange: column => _onChange(column || null, type)
    }, (0, _lodash.map)(options, c =>
    /*#__PURE__*/
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
    _react.default.createElement(_editor.Select.Option, {
      key: c,
      value: c,
      "data-test": "Chart.ColumnMapping.".concat(type, ".").concat(c)
    }, c))))
  );
}

ColumnMappingSelect.defaultProps = {
  value: null,
  availableColumns: [],
  type: null,
  onChange: () => {}
};
ColumnMappingSelect.MappingTypes = MappingTypes;
//# sourceMappingURL=ColumnMappingSelect.js.map