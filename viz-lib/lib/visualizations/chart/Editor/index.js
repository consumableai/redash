"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _createTabbedEditor = _interopRequireDefault(require("../../../components/visualizations/editor/createTabbedEditor"));

var _GeneralSettings = _interopRequireDefault(require("./GeneralSettings"));

var _XAxisSettings = _interopRequireDefault(require("./XAxisSettings"));

var _YAxisSettings = _interopRequireDefault(require("./YAxisSettings"));

var _SeriesSettings = _interopRequireDefault(require("./SeriesSettings"));

var _ColorsSettings = _interopRequireDefault(require("./ColorsSettings"));

var _DataLabelsSettings = _interopRequireDefault(require("./DataLabelsSettings"));

var _CustomChartSettings = _interopRequireDefault(require("./CustomChartSettings"));

require("./editor.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable react/prop-types */
var isCustomChart = options => options.globalSeriesType === "custom";

var isPieChart = options => options.globalSeriesType === "pie";

var _default = (0, _createTabbedEditor.default)([{
  key: "General",
  title: "General",
  component: props => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_GeneralSettings.default, props), isCustomChart(props.options) && /*#__PURE__*/_react.default.createElement(_CustomChartSettings.default, props))
}, {
  key: "XAxis",
  title: (_ref) => {
    var swappedAxes = _ref.swappedAxes;
    return !swappedAxes ? "X Axis" : "Y Axis";
  },
  component: _XAxisSettings.default,
  isAvailable: options => !isCustomChart(options) && !isPieChart(options)
}, {
  key: "YAxis",
  title: (_ref2) => {
    var swappedAxes = _ref2.swappedAxes;
    return !swappedAxes ? "Y Axis" : "X Axis";
  },
  component: _YAxisSettings.default,
  isAvailable: options => !isCustomChart(options) && !isPieChart(options)
}, {
  key: "Series",
  title: "Series",
  component: _SeriesSettings.default,
  isAvailable: options => !isCustomChart(options)
}, {
  key: "Colors",
  title: "Colors",
  component: _ColorsSettings.default,
  isAvailable: options => !isCustomChart(options)
}, {
  key: "DataLabels",
  title: "Data Labels",
  component: _DataLabelsSettings.default,
  isAvailable: options => !isCustomChart(options)
}]);

exports.default = _default;
//# sourceMappingURL=index.js.map