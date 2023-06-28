"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanNumber = cleanNumber;
exports.getSeriesAxis = getSeriesAxis;
exports.normalizeValue = normalizeValue;

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _clean_number = _interopRequireDefault(require("plotly.js/src/lib/clean_number"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'plot... Remove this comment to see the full error message
function cleanNumber(value) {
  return (0, _lodash.isUndefined)(value) ? value : (0, _clean_number.default)(value);
}

function getSeriesAxis(series, options) {
  var seriesOptions = options.seriesOptions[series.name] || {
    type: options.globalSeriesType
  };

  if (seriesOptions.yAxis === 1 && (!options.series.stacking || seriesOptions.type === "line")) {
    return "y2";
  }

  return "y";
}

function normalizeValue(value, axisType) {
  var dateTimeFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "YYYY-MM-DD HH:mm:ss";

  if (axisType === "datetime" && _moment.default.utc(value).isValid()) {
    value = _moment.default.utc(value);
  }

  if (_moment.default.isMoment(value)) {
    return value.format(dateTimeFormat);
  }

  return value;
}
//# sourceMappingURL=utils.js.map