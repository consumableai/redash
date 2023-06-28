"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initTextColumn;

var _react = _interopRequireDefault(require("react"));

var _HtmlContent = _interopRequireDefault(require("../../../components/HtmlContent"));

var _editor = require("../../../components/visualizations/editor");

var _valueFormat = require("../../../lib/value-format");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Editor(_ref) {
  var column = _ref.column,
      _onChange = _ref.onChange;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Table.ColumnEditor.Text.AllowHTML",
    checked: column.allowHTML,
    onChange: event => _onChange({
      allowHTML: event.target.checked
    })
  }, "Allow HTML content")), column.allowHTML &&
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2745) FIXME: This JSX tag's 'children' prop expects type 'never... Remove this comment to see the full error message
  _react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Checkbox, {
    "data-test": "Table.ColumnEditor.Text.HighlightLinks",
    checked: column.highlightLinks,
    onChange: event => _onChange({
      highlightLinks: event.target.checked
    })
  }, "Highlight links")));
}

function initTextColumn(column) {
  var format = (0, _valueFormat.createTextFormatter)(column.allowHTML && column.highlightLinks);

  function prepareData(row) {
    return {
      text: format(row[column.name])
    };
  }

  function TextColumn(_ref2) {
    var row = _ref2.row;

    // eslint-disable-line react/prop-types
    var _prepareData = prepareData(row),
        text = _prepareData.text;

    return column.allowHTML ? /*#__PURE__*/_react.default.createElement(_HtmlContent.default, null, text) : text;
  }

  TextColumn.prepareData = prepareData;
  return TextColumn;
}

initTextColumn.friendlyName = "Text";
initTextColumn.Editor = Editor;
//# sourceMappingURL=text.js.map