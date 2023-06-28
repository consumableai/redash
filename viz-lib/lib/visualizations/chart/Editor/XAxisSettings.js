"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = XAxisSettings;

var _react = _interopRequireDefault(require("react"));

var _editor = require("../../../components/visualizations/editor");

var _propTypes = require("../../prop-types");

var _AxisSettings = _interopRequireDefault(require("./AxisSettings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function XAxisSettings(_ref) {
  var options = _ref.options,
      onOptionsChange = _ref.onOptionsChange;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_AxisSettings.default, {
    id: "XAxis",
    features: {
      autoDetectType: true
    },
    options: options.xAxis // @ts-expect-error ts-migrate(2322) FIXME: Type '(xAxis: any) => any' is not assignable to ty... Remove this comment to see the full error message
    ,
    onChange: xAxis => onOptionsChange({
      xAxis
    })
  }), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Switch // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    "data-test": "Chart.XAxis.Sort" // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.sortX // @ts-expect-error ts-migrate(2322) FIXME: Type '(sortX: any) => any' is not assignable to ty... Remove this comment to see the full error message
    ,
    onChange: sortX => onOptionsChange({
      sortX
    })
  }, "Sort Values")), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Switch // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    "data-test": "Chart.XAxis.Reverse" // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.reverseX // @ts-expect-error ts-migrate(2322) FIXME: Type '(reverseX: any) => any' is not assignable to... Remove this comment to see the full error message
    ,
    onChange: reverseX => onOptionsChange({
      reverseX
    })
  }, "Reverse Order")), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Switch // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
  , {
    "data-test": "Chart.XAxis.ShowLabels" // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
    ,
    defaultChecked: options.xAxis.labels.enabled // @ts-expect-error ts-migrate(2322) FIXME: Type '(enabled: any) => any' is not assignable to ... Remove this comment to see the full error message
    ,
    onChange: enabled => onOptionsChange({
      xAxis: {
        labels: {
          enabled
        }
      }
    })
  }, "Show Labels")));
}

XAxisSettings.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=XAxisSettings.js.map