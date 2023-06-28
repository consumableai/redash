"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initImageColumn;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _useDebounce = require("use-debounce");

var _editor = require("../../../components/visualizations/editor");

var _valueFormat = require("../../../lib/value-format");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
      onChange = _ref.onChange;

  var _useDebouncedCallback = (0, _useDebounce.useDebouncedCallback)(onChange, 200),
      _useDebouncedCallback2 = _slicedToArray(_useDebouncedCallback, 1),
      onChangeDebounced = _useDebouncedCallback2[0];

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: "URL template",
    "data-test": "Table.ColumnEditor.Image.UrlTemplate",
    defaultValue: column.imageUrlTemplate,
    onChange: event => onChangeDebounced({
      imageUrlTemplate: event.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ControlLabel // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message
  , {
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Size", /*#__PURE__*/_react.default.createElement(_editor.ContextHelp, {
      placement: "topLeft",
      arrowPointAtCenter: true
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        marginBottom: 5
      }
    }, "Any positive integer value that specifies size in pixels."), /*#__PURE__*/_react.default.createElement("div", null, "Leave empty to use default value.")))
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "image-dimension-selector"
  }, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    "data-test": "Table.ColumnEditor.Image.Width",
    placeholder: "Width",
    defaultValue: column.imageWidth,
    onChange: event => onChangeDebounced({
      imageWidth: event.target.value
    })
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "image-dimension-selector-spacer"
  }, "\xD7"), /*#__PURE__*/_react.default.createElement(_editor.Input, {
    "data-test": "Table.ColumnEditor.Image.Height",
    placeholder: "Height",
    defaultValue: column.imageHeight,
    onChange: event => onChangeDebounced({
      imageHeight: event.target.value
    })
  })))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: "Title template",
    "data-test": "Table.ColumnEditor.Image.TitleTemplate",
    defaultValue: column.imageTitleTemplate,
    onChange: event => onChangeDebounced({
      imageTitleTemplate: event.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.ContextHelp, {
    placement: "topLeft",
    arrowPointAtCenter: true // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'null | u... Remove this comment to see the full error message
    ,
    icon: /*#__PURE__*/_react.default.createElement("span", {
      style: {
        cursor: "default"
      }
    }, "Format specs ", _editor.ContextHelp.defaultIcon)
  }, /*#__PURE__*/_react.default.createElement("div", null, "All columns can be referenced using ", /*#__PURE__*/_react.default.createElement("code", null, "{{ column_name }}"), " syntax."), /*#__PURE__*/_react.default.createElement("div", null, "Use ", /*#__PURE__*/_react.default.createElement("code", null, "{{ @ }}"), " to reference current (this) column."), /*#__PURE__*/_react.default.createElement("div", null, "This syntax is applicable to URL, Title and Size options."))));
}

function initImageColumn(column) {
  function prepareData(row) {
    row = (0, _lodash.extend)({
      "@": row[column.name]
    }, row);
    var src = (0, _lodash.trim)((0, _valueFormat.formatSimpleTemplate)(column.imageUrlTemplate, row));

    if (src === "") {
      return {};
    }

    var width = parseInt((0, _valueFormat.formatSimpleTemplate)(column.imageWidth, row), 10);
    var height = parseInt((0, _valueFormat.formatSimpleTemplate)(column.imageHeight, row), 10);
    var title = (0, _lodash.trim)((0, _valueFormat.formatSimpleTemplate)(column.imageTitleTemplate, row));
    var result = {
      src
    };

    if (Number.isFinite(width) && width > 0) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'width' does not exist on type '{ src: st... Remove this comment to see the full error message
      result.width = width;
    }

    if (Number.isFinite(height) && height > 0) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'height' does not exist on type '{ src: s... Remove this comment to see the full error message
      result.height = height;
    }

    if (title !== "") {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'text' does not exist on type '{ src: str... Remove this comment to see the full error message
      result.text = title; // `text` is used for search
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type '{ src: st... Remove this comment to see the full error message

      result.title = title; // @ts-expect-error ts-migrate(2339) FIXME: Property 'alt' does not exist on type '{ src: stri... Remove this comment to see the full error message

      result.alt = title;
    }

    return result;
  }

  function ImageColumn(_ref2) {
    var row = _ref2.row;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'text' does not exist on type '{}'.
    // eslint-disable-line react/prop-types
    var _prepareData = prepareData(row),
        text = _prepareData.text,
        props = _objectWithoutProperties(_prepareData, ["text"]);

    return /*#__PURE__*/_react.default.createElement("img", _extends({
      alt: ""
    }, props));
  }

  ImageColumn.prepareData = prepareData;
  return ImageColumn;
}

initImageColumn.friendlyName = "Image";
initImageColumn.Editor = Editor;
//# sourceMappingURL=image.js.map