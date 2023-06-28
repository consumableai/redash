"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initLinkColumn;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _useDebounce = require("use-debounce");

var _editor = require("../../../components/visualizations/editor");

var _valueFormat = require("../../../lib/value-format");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Editor(_ref) {
  var column = _ref.column,
      _onChange = _ref.onChange;

  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(_onChange, 200),
      _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
      onChangeDebounced = _useDebouncedCallback2[0];

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: "URL template",
    "data-test": "Table.ColumnEditor.Link.UrlTemplate",
    defaultValue: column.linkUrlTemplate,
    onChange: event => onChangeDebounced({
      linkUrlTemplate: event.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: "Text template",
    "data-test": "Table.ColumnEditor.Link.TextTemplate",
    defaultValue: column.linkTextTemplate,
    onChange: event => onChangeDebounced({
      linkTextTemplate: event.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: "Title template",
    "data-test": "Table.ColumnEditor.Link.TitleTemplate",
    defaultValue: column.linkTitleTemplate,
    onChange: event => onChangeDebounced({
      linkTitleTemplate: event.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Table.ColumnEditor.Link.OpenInNewTab",
    checked: column.linkOpenInNewTab,
    onChange: event => _onChange({
      linkOpenInNewTab: event.target.checked
    })
  }, "Open in new tab")), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ContextHelp, {
    placement: "topLeft",
    arrowPointAtCenter: true // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message
    ,
    icon: /*#__PURE__*/_react.default.createElement("span", {
      style: {
        cursor: "default"
      }
    }, "Format specs ", _editor.ContextHelp.defaultIcon)
  }, /*#__PURE__*/_react.default.createElement("div", null, "All columns can be referenced using ", /*#__PURE__*/_react.default.createElement("code", null, "{{ column_name }}"), " syntax."), /*#__PURE__*/_react.default.createElement("div", null, "Use ", /*#__PURE__*/_react.default.createElement("code", null, "{{ @ }}"), " to reference current (this) column."), /*#__PURE__*/_react.default.createElement("div", null, "This syntax is applicable to URL, Text and Title options."))));
}

function initLinkColumn(column) {
  function prepareData(row) {
    row = (0, _lodash.extend)({
      "@": row[column.name]
    }, row);
    var href = (0, _lodash.trim)((0, _valueFormat.formatSimpleTemplate)(column.linkUrlTemplate, row));

    if (href === "") {
      return {};
    }

    var title = (0, _lodash.trim)((0, _valueFormat.formatSimpleTemplate)(column.linkTitleTemplate, row));
    var text = (0, _lodash.trim)((0, _valueFormat.formatSimpleTemplate)(column.linkTextTemplate, row));
    var result = {
      href,
      text: text !== "" ? text : href
    };

    if (title !== "") {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ href: s... Remove this comment to see the full error message
      result.title = title;
    }

    if (column.linkOpenInNewTab) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'target' does not exist on type '{ href: ... Remove this comment to see the full error message
      result.target = "_blank";
    }

    return result;
  }

  function LinkColumn(_ref2) {
    var row = _ref2.row;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'text' does not exist on type '{}'.
    // eslint-disable-line react/prop-types
    var _prepareData = prepareData(row),
        text = _prepareData.text,
        props = _objectWithoutProperties(_prepareData, ["text"]);

    return /*#__PURE__*/_react.default.createElement("a", props, text);
  }

  LinkColumn.prepareData = prepareData;
  return LinkColumn;
}

initLinkColumn.friendlyName = "Link";
initLinkColumn.Editor = Editor;
//# sourceMappingURL=link.js.map