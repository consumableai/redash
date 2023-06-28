"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OptionsSettings;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _editor = require("../../../components/visualizations/editor");

var _propTypes = require("../../prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CohortTimeIntervals = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly"
};
var CohortModes = {
  diagonal: "Fill gaps with zeros",
  simple: "Show data as is"
};

function OptionsSettings(_ref) {
  var options = _ref.options,
      onOptionsChange = _ref.onOptionsChange;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Time Interval",
    "data-test": "Cohort.TimeInterval",
    value: options.timeInterval,
    onChange: timeInterval => onOptionsChange({
      timeInterval
    })
  }, (0, _lodash.map)(CohortTimeIntervals, (name, value) =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    key: value,
    "data-test": "Cohort.TimeInterval." + value
  }, name)))), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Select, {
    layout: "horizontal",
    label: "Mode",
    "data-test": "Cohort.Mode",
    value: options.mode,
    onChange: mode => onOptionsChange({
      mode
    })
  }, (0, _lodash.map)(CohortModes, (name, value) =>
  /*#__PURE__*/
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'Option' does not exist on type '({ class... Remove this comment to see the full error message
  _react.default.createElement(_editor.Select.Option, {
    key: value,
    "data-test": "Cohort.Mode." + value
  }, name)))));
}

OptionsSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=OptionsSettings.js.map