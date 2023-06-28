"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOptions;

var _lodash = require("lodash");

var _ColorPalette = _interopRequireDefault(require("../ColorPalette"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_OPTIONS = {
  timeInterval: "daily",
  mode: "diagonal",
  dateColumn: "date",
  stageColumn: "day_number",
  totalColumn: "total",
  valueColumn: "value",
  showTooltips: true,
  percentValues: true,
  timeColumnTitle: "Time",
  peopleColumnTitle: "Users",
  stageColumnTitle: "{{ @ }}",
  numberFormat: "0,0[.]00",
  percentFormat: "0.00%",
  noValuePlaceholder: "-",
  colors: {
    min: "#ffffff",
    max: _ColorPalette.default["Dark Blue"],
    steps: 7
  }
};

function getOptions(options) {
  return (0, _lodash.merge)({}, DEFAULT_OPTIONS, options);
}
//# sourceMappingURL=getOptions.js.map