"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOptions;

var _lodash = require("lodash");

var DEFAULT_OPTIONS = {
  stepCol: {
    colName: null,
    displayAs: "Steps"
  },
  valueCol: {
    colName: null,
    displayAs: "Value"
  },
  autoSort: true,
  sortKeyCol: {
    colName: null,
    reverse: false
  },
  itemsLimit: 100,
  percentValuesRange: {
    min: 0.01,
    max: 1000.0
  },
  numberFormat: "0,0[.]00",
  percentFormat: "0[.]00%"
};

function getOptions(options, _ref) {
  var columns = _ref.columns;
  options = (0, _lodash.merge)({}, DEFAULT_OPTIONS, options); // Validate

  var availableColumns = (0, _lodash.map)(columns, c => c.name);

  if (!(0, _lodash.includes)(availableColumns, options.stepCol.colName)) {
    options.stepCol.colName = null;
  }

  if (!(0, _lodash.includes)(availableColumns, options.valueCol.colName)) {
    options.valueCol.colName = null;
  }

  if (!(0, _lodash.includes)(availableColumns, options.sortKeyCol.colName)) {
    options.sortKeyCol.colName = null;
  }

  if (!(0, _lodash.isFinite)(options.itemsLimit)) {
    options.itemsLimit = DEFAULT_OPTIONS.itemsLimit;
  }

  if (options.itemsLimit < 2) {
    options.itemsLimit = 2;
  }

  if (options.autoSort) {
    options.sortKeyCol.colName = options.valueCol.colName;
    options.sortKeyCol.reverse = true;
  }

  return options;
}
//# sourceMappingURL=getOptions.js.map