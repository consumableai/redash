"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatColumnValue = formatColumnValue;

var _moment = _interopRequireDefault(require("moment"));

var _visualizationsSettings = require("../visualizations/visualizationsSettings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatDateTime(value) {
  if (!value) {
    return "";
  }

  var parsed = (0, _moment.default)(value);

  if (!parsed.isValid()) {
    return "-";
  }

  return parsed.format(_visualizationsSettings.visualizationsSettings.dateTimeFormat);
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  var parsed = (0, _moment.default)(value);

  if (!parsed.isValid()) {
    return "-";
  }

  return parsed.format(_visualizationsSettings.visualizationsSettings.dateFormat);
}

function formatColumnValue(value) {
  var columnType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (_moment.default.isMoment(value)) {
    if (columnType === "date") {
      return formatDate(value);
    }

    return formatDateTime(value);
  }

  if (typeof value === "boolean") {
    return value.toString();
  }

  return value;
}
//# sourceMappingURL=utils.js.map