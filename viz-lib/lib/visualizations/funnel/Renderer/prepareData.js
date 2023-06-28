"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareData;

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _visualizationsSettings = require("../../visualizationsSettings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stepValueToString(value) {
  if (_moment.default.isMoment(value)) {
    var format = _visualizationsSettings.visualizationsSettings.dateTimeFormat || "DD/MM/YYYY HH:mm";
    return value.format(format);
  }

  return (0, _lodash.toString)(value);
}

function prepareData(rows, options) {
  if (rows.length === 0 || !options.stepCol.colName || !options.valueCol.colName) {
    return [];
  }

  rows = [...rows];

  if (options.sortKeyCol.colName) {
    rows = (0, _lodash.sortBy)(rows, options.sortKeyCol.colName);
  }

  if (options.sortKeyCol.reverse) {
    rows = rows.reverse();
  }

  var data = (0, _lodash.map)(rows, row => ({
    step: stepValueToString(row[options.stepCol.colName]),
    value: parseFloat(row[options.valueCol.colName]) || 0.0
  })); // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.

  var maxVal = (0, _lodash.maxBy)(data, d => d.value).value;
  data.forEach((d, i) => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'pctMax' does not exist on type '{ step: ... Remove this comment to see the full error message
    d.pctMax = d.value / maxVal * 100.0; // @ts-expect-error ts-migrate(2339) FIXME: Property 'pctPrevious' does not exist on type '{ s... Remove this comment to see the full error message

    d.pctPrevious = i === 0 || d.value === data[i - 1].value ? 100.0 : d.value / data[i - 1].value * 100.0;
  });
  return data.slice(0, options.itemsLimit);
}
//# sourceMappingURL=prepareData.js.map