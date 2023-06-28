"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOptions;

var _lodash = require("lodash");

var _visualizationsSettings = require("../visualizationsSettings");

var _ColorPalette = _interopRequireDefault(require("./ColorPalette"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getDefaultMap() {
  return (0, _lodash.first)((0, _lodash.keys)(_visualizationsSettings.visualizationsSettings.choroplethAvailableMaps)) || null;
}

var DEFAULT_OPTIONS = {
  mapType: "countries",
  keyColumn: null,
  targetField: null,
  valueColumn: null,
  clusteringMode: "e",
  steps: 5,
  valueFormat: "0,0.00",
  noValuePlaceholder: "N/A",
  colors: {
    min: _ColorPalette.default["Light Blue"],
    max: _ColorPalette.default["Dark Blue"],
    background: _ColorPalette.default.White,
    borders: _ColorPalette.default.White,
    noValue: _ColorPalette.default["Light Gray"]
  },
  legend: {
    visible: true,
    position: "bottom-left",
    alignText: "right"
  },
  tooltip: {
    enabled: true,
    template: "<b>{{ @@name }}</b>: {{ @@value }}"
  },
  popup: {
    enabled: true,
    template: "Country: <b>{{ @@name_long }} ({{ @@iso_a2 }})</b>\n<br>\nValue: <b>{{ @@value }}</b>"
  }
};

function getOptions(options) {
  var result = (0, _lodash.merge)({}, DEFAULT_OPTIONS, options); // Both renderer and editor always provide new `bounds` array, so no need to clone it here.
  // Keeping original object also reduces amount of updates in components

  result.bounds = (0, _lodash.get)(options, "bounds"); // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message

  if ((0, _lodash.isNil)(_visualizationsSettings.visualizationsSettings.choroplethAvailableMaps[result.mapType])) {
    result.mapType = getDefaultMap();
  } // backward compatibility


  if (!(0, _lodash.isNil)(result.countryCodeColumn)) {
    result.keyColumn = result.countryCodeColumn;
  }

  delete result.countryCodeColumn;

  if (!(0, _lodash.isNil)(result.countryCodeType)) {
    result.targetField = result.countryCodeType;
  }

  delete result.countryCodeType;
  return result;
}
//# sourceMappingURL=getOptions.js.map