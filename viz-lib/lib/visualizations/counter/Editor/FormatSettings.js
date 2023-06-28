"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormatSettings;

var _react = _interopRequireDefault(require("react"));

var _editor = require("../../../components/visualizations/editor");

var _propTypes = require("../../prop-types");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormatSettings(_ref) {
  var options = _ref.options,
      data = _ref.data,
      onOptionsChange = _ref.onOptionsChange;
  var inputsEnabled = (0, _utils.isValueNumber)(data.rows, options);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.InputNumber, {
    layout: "horizontal",
    label: "Formatting Decimal Place",
    "data-test": "Counter.Formatting.DecimalPlace",
    defaultValue: options.stringDecimal,
    disabled: !inputsEnabled,
    onChange: stringDecimal => onOptionsChange({
      stringDecimal
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: "Formatting Decimal Character",
    "data-test": "Counter.Formatting.DecimalCharacter",
    defaultValue: options.stringDecChar,
    disabled: !inputsEnabled,
    onChange: e => onOptionsChange({
      stringDecChar: e.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: "Formatting Thousands Separator",
    "data-test": "Counter.Formatting.ThousandsSeparator",
    defaultValue: options.stringThouSep,
    disabled: !inputsEnabled,
    onChange: e => onOptionsChange({
      stringThouSep: e.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: "Formatting String Prefix",
    "data-test": "Counter.Formatting.StringPrefix",
    defaultValue: options.stringPrefix,
    disabled: !inputsEnabled,
    onChange: e => onOptionsChange({
      stringPrefix: e.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    layout: "horizontal",
    label: "Formatting String Suffix",
    "data-test": "Counter.Formatting.StringSuffix",
    defaultValue: options.stringSuffix,
    disabled: !inputsEnabled,
    onChange: e => onOptionsChange({
      stringSuffix: e.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Switch // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    "data-test": "Counter.Formatting.FormatTargetValue" // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.formatTargetValue // @ts-expect-error ts-migrate(2322) FIXME: Type '(formatTargetValue: any) => any' is not assi... Remove this comment to see the full error message
    ,
    onChange: formatTargetValue => onOptionsChange({
      formatTargetValue
    })
  }, "Format Target Value")));
}

FormatSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=FormatSettings.js.map