"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ColumnsSettings;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _collapse = _interopRequireDefault(require("antd/lib/collapse"));

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

var _typography = _interopRequireDefault(require("antd/lib/typography"));

var _reactSortableHoc = require("react-sortable-hoc");

var _sortable = require("../../../components/sortable");

var _propTypes = require("../../prop-types");

var _EyeOutlined = _interopRequireDefault(require("@ant-design/icons/EyeOutlined"));

var _EyeInvisibleOutlined = _interopRequireDefault(require("@ant-design/icons/EyeInvisibleOutlined"));

var _ColumnEditor = _interopRequireDefault(require("./ColumnEditor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Text = _typography.default.Text;
var SortableItem = (0, _reactSortableHoc.sortableElement)(_collapse.default.Panel);

function ColumnsSettings(_ref) {
  var options = _ref.options,
      onOptionsChange = _ref.onOptionsChange;

  function handleColumnChange(newColumn, event) {
    if (event) {
      event.stopPropagation();
    }

    var columns = (0, _lodash.map)(options.columns, c => c.name === newColumn.name ? newColumn : c);
    onOptionsChange({
      columns
    });
  }

  function handleColumnsReorder(_ref2) {
    var oldIndex = _ref2.oldIndex,
        newIndex = _ref2.newIndex;
    var columns = [...options.columns];
    columns.splice(newIndex, 0, ...columns.splice(oldIndex, 1));
    onOptionsChange({
      columns
    });
  }

  return /*#__PURE__*/_react.default.createElement(_sortable.SortableContainer, {
    axis: "y",
    lockAxis: "y",
    useDragHandle: true,
    helperClass: "table-editor-columns-dragged-item",
    helperContainer: container => container.firstChild,
    onSortEnd: handleColumnsReorder,
    containerProps: {
      className: "table-visualization-editor-columns"
    }
  }, /*#__PURE__*/_react.default.createElement(_collapse.default, {
    bordered: false,
    defaultActiveKey: [],
    expandIconPosition: "right"
  }, (0, _lodash.map)(options.columns, (column, index) => /*#__PURE__*/_react.default.createElement(SortableItem, {
    key: column.name,
    index: index,
    header: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_sortable.DragHandle, null), /*#__PURE__*/_react.default.createElement("span", {
      "data-test": "Table.Column.".concat(column.name, ".Name")
    }, column.name, column.title !== "" && column.title !== column.name && /*#__PURE__*/_react.default.createElement(Text, {
      type: "secondary",
      style: {
        marginLeft: 5
      }
    }, /*#__PURE__*/_react.default.createElement("i", null, "(", column.title, ")")))),
    extra: /*#__PURE__*/_react.default.createElement(_tooltip.default, {
      title: "Toggle visibility",
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0
    }, column.visible ? /*#__PURE__*/_react.default.createElement(_EyeOutlined.default, {
      "data-test": "Table.Column.".concat(column.name, ".Visibility"),
      onClick: event => handleColumnChange(_objectSpread({}, column, {
        visible: !column.visible
      }), event)
    }) : /*#__PURE__*/_react.default.createElement(_EyeInvisibleOutlined.default, {
      "data-test": "Table.Column.".concat(column.name, ".Visibility"),
      onClick: event => handleColumnChange(_objectSpread({}, column, {
        visible: !column.visible
      }), event)
    }))
  }, /*#__PURE__*/_react.default.createElement(_ColumnEditor.default, {
    column: column,
    onChange: handleColumnChange
  })))));
}

ColumnsSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=ColumnsSettings.js.map