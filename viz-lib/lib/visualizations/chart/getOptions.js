"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOptions;

var _lodash = require("lodash");

var _visualizationsSettings = require("../visualizationsSettings");

var DEFAULT_OPTIONS = {
  globalSeriesType: "column",
  sortX: true,
  legend: {
    enabled: true,
    placement: "auto",
    traceorder: "normal"
  },
  xAxis: {
    type: "-",
    labels: {
      enabled: true
    }
  },
  yAxis: [{
    type: "linear"
  }, {
    type: "linear",
    opposite: true
  }],
  alignYAxesAtZero: false,
  error_y: {
    type: "data",
    visible: true
  },
  series: {
    stacking: null,
    error_y: {
      type: "data",
      visible: true
    }
  },
  seriesOptions: {},
  valuesOptions: {},
  columnMapping: {},
  direction: {
    type: "counterclockwise"
  },
  sizemode: "diameter",
  coefficient: 1,
  // showDataLabels: false, // depends on chart type
  numberFormat: "0,0[.]00000",
  percentFormat: "0[.]00%",
  // dateTimeFormat: 'DD/MM/YYYY HH:mm', // will be set from visualizationsSettings
  textFormat: "",
  // default: combination of {{ @@yPercent }} ({{ @@y }} ± {{ @@yError }})
  missingValuesAsZero: true
};

function getOptions(options) {
  var result = (0, _lodash.merge)({}, DEFAULT_OPTIONS, {
    showDataLabels: options.globalSeriesType === "pie",
    dateTimeFormat: _visualizationsSettings.visualizationsSettings.dateTimeFormat
  }, options); // Backward compatibility

  if (["normal", "percent"].indexOf(result.series.stacking) >= 0) {
    result.series.percentValues = result.series.stacking === "percent";
    result.series.stacking = "stack";
  }

  return result;
}
//# sourceMappingURL=getOptions.js.map