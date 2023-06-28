"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ColumnsSettings;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _editor = require("../../../components/visualizations/editor");

var _propTypes = require("../../prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ColumnsSettings(_ref) {
  var options = _ref.options,
      data = _ref.data,
      onOptionsChange = _ref.onOptionsChange;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Date (Bucket)",
    "data-test": "Cohort.DateColumn",
    value: options.dateColumn,
    onChange: dateColumn => onOptionsChange({
      dateColumn
    })
  }, (0, _lodash.map)(data.columns, (_ref2) => {
    var name = _ref2.name;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      _react.default.createElement(_editor.Select.Option, {
        key: name,
        "data-test": "Cohort.DateColumn." + name
      }, name)
    );
  }))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Stage",
    "data-test": "Cohort.StageColumn",
    value: options.stageColumn,
    onChange: stageColumn => onOptionsChange({
      stageColumn
    })
  }, (0, _lodash.map)(data.columns, (_ref3) => {
    var name = _ref3.name;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      _react.default.createElement(_editor.Select.Option, {
        key: name,
        "data-test": "Cohort.StageColumn." + name
      }, name)
    );
  }))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Bucket Population Size",
    "data-test": "Cohort.TotalColumn",
    value: options.totalColumn,
    onChange: totalColumn => onOptionsChange({
      totalColumn
    })
  }, (0, _lodash.map)(data.columns, (_ref4) => {
    var name = _ref4.name;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      _react.default.createElement(_editor.Select.Option, {
        key: name,
        "data-test": "Cohort.TotalColumn." + name
      }, name)
    );
  }))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Stage Value",
    "data-test": "Cohort.ValueColumn",
    value: options.valueColumn,
    onChange: valueColumn => onOptionsChange({
      valueColumn
    })
  }, (0, _lodash.map)(data.columns, (_ref5) => {
    var name = _ref5.name;
    return (
      /*#__PURE__*/
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
      _react.default.createElement(_editor.Select.Option, {
        key: name,
        "data-test": "Cohort.ValueColumn." + name
      }, name)
    );
  }))));
}

ColumnsSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=ColumnsSettings.js.map