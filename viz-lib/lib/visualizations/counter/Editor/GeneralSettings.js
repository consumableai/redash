"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GeneralSettings;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _editor = require("../../../components/visualizations/editor");

var _propTypes = require("../../prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GeneralSettings(_ref) {
  var options = _ref.options,
      data = _ref.data,
      visualizationName = _ref.visualizationName,
      onOptionsChange = _ref.onOptionsChange;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: "Counter Label",
    "data-test": "Counter.General.Label",
    defaultValue: options.counterLabel,
    placeholder: visualizationName,
    onChange: e => onOptionsChange({
      counterLabel: e.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Counter Value Column Name",
    "data-test": "Counter.General.ValueColumn",
    defaultValue: options.counterColName,
    disabled: options.countRow,
    onChange: counterColName => onOptionsChange({
      counterColName
    })
  }, (0, _lodash.map)(data.columns, col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    key: col.name,
    "data-test": "Counter.General.ValueColumn." + col.name
  }, col.name)))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    layout: "horizontal",
    label: "Counter Value Row Number",
    "data-test": "Counter.General.ValueRowNumber",
    defaultValue: options.rowNumber,
    disabled: options.countRow,
    onChange: rowNumber => onOptionsChange({
      rowNumber
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Target Value Column Name",
    "data-test": "Counter.General.TargetValueColumn",
    defaultValue: options.targetColName,
    onChange: targetColName => onOptionsChange({
      targetColName
    })
  }, /*#__PURE__*/_react.default.createElement(_editor.Select.Option, {
    value: ""
  }, "No target value"), (0, _lodash.map)(data.columns, col =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    key: col.name,
    "data-test": "Counter.General.TargetValueColumn." + col.name
  }, col.name)))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    layout: "horizontal",
    label: "Target Value Row Number",
    "data-test": "Counter.General.TargetValueRowNumber",
    defaultValue: options.targetRowNumber,
    onChange: targetRowNumber => onOptionsChange({
      targetRowNumber
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Switch // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    "data-test": "Counter.General.CountRows" // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.countRow // @ts-expect-error ts-migrate(2322) FIXME: Type '(countRow: any) => any' is not assignable to... Remove this comment to see the full error message
    ,
    onChange: countRow => onOptionsChange({
      countRow
    })
  }, "Count Rows")));
}

GeneralSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=GeneralSettings.js.map