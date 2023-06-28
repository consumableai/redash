"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Editor;

var _react = _interopRequireDefault(require("react"));

var _editor = require("../../components/visualizations/editor");

var _propTypes = require("../prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Editor(_ref) {
  var options = _ref.options,
      onOptionsChange = _ref.onOptionsChange;

  var onXAxisLabelChanged = xAxisLabel => {
    var newOptions = _objectSpread({}, options, {
      xAxisLabel
    });

    onOptionsChange(newOptions);
  };

  var onYAxisLabelChanged = yAxisLabel => {
    var newOptions = _objectSpread({}, options, {
      yAxisLabel
    });

    onOptionsChange(newOptions);
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: "X Axis Label",
    "data-test": "BoxPlot.XAxisLabel",
    value: options.xAxisLabel,
    onChange: event => onXAxisLabelChanged(event.target.value)
  })), /*#__PURE__*/_react.default.createElement(_editor.Section, null, /*#__PURE__*/_react.default.createElement(_editor.Input, {
    label: "Y Axis Label",
    "data-test": "BoxPlot.YAxisLabel",
    value: options.yAxisLabel,
    onChange: event => onYAxisLabelChanged(event.target.value)
  })));
}

Editor.propTypes = _propTypes.EditorPropTypes;
//# sourceMappingURL=Editor.js.map