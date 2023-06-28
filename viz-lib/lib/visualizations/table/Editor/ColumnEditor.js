"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ColumnEditor;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _useDebounce = require("use-debounce");

var Grid = _interopRequireWildcard(require("antd/lib/grid"));

var _editor = require("../../../components/visualizations/editor");

var _columns = _interopRequireDefault(require("../columns"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ColumnEditor(_ref) {
  var column = _ref.column,
      onChange = _ref.onChange;

  function handleChange(changes) {
    onChange(_objectSpread({}, column, {}, changes));
  }

  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(handleChange, 200),
      _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
      handleChangeDebounced = _useDebouncedCallback2[0]; // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message


  var AdditionalOptions = _columns.default[column.displayAs].Editor || null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "table-visualization-editor-column"
  }, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(Grid.Row, {
    gutter: 15,
    type: "flex",
    align: "middle"
  }, /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 16
  }, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    "data-test": "Table.Column.".concat(column.name, ".Title"),
    defaultValue: column.title,
    onChange: event => handleChangeDebounced({
      title: event.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(Grid.Col, {
    span: 8
  }, /*#__PURE__*/_react.default.createElement(_editor.TextAlignmentSelect, {
    "data-test": "Table.Column.".concat(column.name, ".TextAlignment"),
    defaultValue: column.alignContent,
    onChange: event => handleChange({
      alignContent: event.target.value
    })
  })))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Table.Column.".concat(column.name, ".UseForSearch") // @ts-expect-error ts-migrate(2339) FIXME: Property 'allowSearch' does not exist on type '{ n... Remove this comment to see the full error message
    ,
    defaultChecked: column.allowSearch,
    onChange: event => handleChange({
      allowSearch: event.target.checked
    })
  }, "Use for search")), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: "Description" // @ts-expect-error ts-migrate(2339) FIXME: Property 'description' does not exist on type '{ n... Remove this comment to see the full error message
    ,
    defaultValue: column.description,
    onChange: event => handleChangeDebounced({
      description: event.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    label: "Display as:",
    "data-test": "Table.Column.".concat(column.name, ".DisplayAs"),
    defaultValue: column.displayAs,
    onChange: displayAs => handleChange({
      displayAs
    })
  }, (0, _lodash.map)(_columns.default, (_ref2, key) => {
    var friendlyName = _ref2.friendlyName;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      _react.default.createElement(_editor.Select.Option, {
        key: key,
        "data-test": "Table.Column.".concat(column.name, ".DisplayAs.").concat(key)
      }, friendlyName)
    );
  }))), AdditionalOptions && /*#__PURE__*/_react.default.createElement(AdditionalOptions, {
    column: column,
    onChange: handleChange
  }));
}

ColumnEditor.defaultProps = {
  onChange: () => {}
};
//# sourceMappingURL=ColumnEditor.js.map