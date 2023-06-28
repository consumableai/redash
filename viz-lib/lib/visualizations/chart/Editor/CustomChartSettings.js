"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CustomChartSettings;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _editor = require("../../../components/visualizations/editor");

var _propTypes = require("../../prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultCustomCode = (0, _lodash.trimStart)("\n// Available variables are x, ys, element, and Plotly\n// Type console.log(x, ys); for more info about x and ys\n// To plot your graph call Plotly.plot(element, ...)\n// Plotly examples and docs: https://plot.ly/javascript/\n");

function CustomChartSettings(_ref) {
  var options = _ref.options,
      onOptionsChange = _ref.onOptionsChange;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.TextArea, {
    label: "Custom code",
    "data-test": "Chart.Custom.Code",
    rows: "10",
    defaultValue: (0, _lodash.isNil)(options.customCode) ? defaultCustomCode : options.customCode,
    onChange: event => onOptionsChange({
      customCode: event.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Switch // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    "data-test": "Chart.Custom.EnableConsoleLogs" // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.enableConsoleLogs // @ts-expect-error ts-migrate(2322) FIXME: Type '(enableConsoleLogs: any) => any' is not assi... Remove this comment to see the full error message
    ,
    onChange: enableConsoleLogs => onOptionsChange({
      enableConsoleLogs
    })
  }, "Show errors in the console")), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Switch // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    id: "chart-editor-auto-update-custom-chart" // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
    ,
    "data-test": "Chart.Custom.AutoUpdate" // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.autoRedraw // @ts-expect-error ts-migrate(2322) FIXME: Type '(autoRedraw: any) => any' is not assignable ... Remove this comment to see the full error message
    ,
    onChange: autoRedraw => onOptionsChange({
      autoRedraw
    })
  }, "Auto update graph")));
}

CustomChartSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=CustomChartSettings.js.map